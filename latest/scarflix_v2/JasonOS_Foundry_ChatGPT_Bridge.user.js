// ==UserScript==
// @name         JasonOS Foundry ChatGPT Bridge
// @namespace    https://github.com/r0cksteadyw00t/plex-logs
// @version      2026.06.05.
20260605_134945
// @description  Polls the local JasonOS Foundry bridge and surfaces status/canary inside ChatGPT. Safe read-only UI bridge.
// @author       JasonOS Foundry
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      127.0.0.1
// @connect      localhost
// @updateURL    
https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/JasonOS_Foundry_ChatGPT_Bridge.user.js
// @downloadURL  
https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/JasonOS_Foundry_ChatGPT_Bridge.user.js
// ==/UserScript==

(function () {
    'use strict';

    var BRIDGE_POLL_URL = 'http://127.0.0.1:8796/poll';
    var BRIDGE_QUEUE_URL = 'http://127.0.0.1:8796/queue';
    var BRIDGE_CANARY_URL = 'http://127.0.0.1:8796/canary';
    var LOCAL_CANARY = '
FOUNDRY_TAMPERMONKEY_CANARY tampermonkey-canary-20260605_134945
';
    var POLL_MS = 5000;
    var lastStatusText = '';
    var lastInjectedMessage = '';
    var enabledKey = 'jasonos_foundry_bridge_enabled';

    function safeString(value) {
        if (value === null || value === undefined) { return ''; }
        try { return String(value); } catch (e) { return ''; }
    }

    function isEnabled() {
        var v = window.localStorage.getItem(enabledKey);
        if (v === null || v === undefined || v === '') { return true; }
        return v === 'true';
    }

    function setEnabled(value) {
        window.localStorage.setItem(enabledKey, value ? 'true' : 'false');
    }

    function requestJson(url, ok, fail) {
        try {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url + '?cachebust=' + Date.now(),
                timeout: 8000,
                onload: function (res) {
                    try {
                        if (!res || res.status < 200 || res.status >= 300) {
                            if (fail) { fail('HTTP ' + (res ? res.status : 'unknown')); }
                            return;
                        }
                        var text = safeString(res.responseText).trim();
                        var obj = {};
                        if (text.length > 0) { obj = JSON.parse(text); }
                        ok(obj, text);
                    } catch (e) {
                        if (fail) { fail('Parse error: ' + e.message); }
                    }
                },
                onerror: function () { if (fail) { fail('Network error'); } },
                ontimeout: function () { if (fail) { fail('Timeout'); } }
            });
        } catch (e) {
            if (fail) { fail('Request failed: ' + e.message); }
        }
    }

    function ensurePanel() {
        var panel = document.getElementById('jasonos-foundry-panel');
        if (panel) { return panel; }

        if (typeof GM_addStyle === 'function') {
            GM_addStyle(
                '#jasonos-foundry-panel { position: fixed; right: 14px; bottom: 14px; width: 360px; z-index: 2147483647; font-family: Arial, sans-serif; font-size: 12px; background: rgba(20,20,20,0.94); color: #f5f5f5; border: 1px solid rgba(255,255,255,0.24); border-radius: 10px; box-shadow: 0 6px 28px rgba(0,0,0,0.38); overflow: hidden; }' +
                '#jasonos-foundry-panel-header { padding: 8px 10px; font-weight: bold; background: rgba(0,0,0,0.35); display: flex; justify-content: space-between; align-items: center; }' +
                '#jasonos-foundry-panel-body { padding: 8px 10px; white-space: pre-wrap; line-height: 1.35; max-height: 220px; overflow: auto; }' +
                '#jasonos-foundry-panel button { font-size: 11px; margin-left: 5px; cursor: pointer; }' +
                '.jasonos-ok { color: #7cff8a; } .jasonos-warn { color: #ffd36e; } .jasonos-bad { color: #ff8d8d; }'
            );
        }

        panel = document.createElement('div');
        panel.id = 'jasonos-foundry-panel';
        var header = document.createElement('div');
        header.id = 'jasonos-foundry-panel-header';
        var title = document.createElement('span');
        title.textContent = 'JasonOS Foundry Bridge';
        var buttons = document.createElement('span');
        var toggle = document.createElement('button');
        toggle.id = 'jasonos-toggle';
        toggle.textContent = isEnabled() ? 'On' : 'Off';
        toggle.onclick = function () {
            setEnabled(!isEnabled());
            toggle.textContent = isEnabled() ? 'On' : 'Off';
            updatePanel('Bridge toggled: ' + (isEnabled() ? 'On' : 'Off'), isEnabled() ? 'ok' : 'warn');
        };
        var ping = document.createElement('button');
        ping.textContent = 'Ping';
        ping.onclick = function () { pollNow(true); };
        buttons.appendChild(toggle);
        buttons.appendChild(ping);
        header.appendChild(title);
        header.appendChild(buttons);
        var body = document.createElement('div');
        body.id = 'jasonos-foundry-panel-body';
        body.textContent = 'Starting bridge check...' + '\\n' + LOCAL_CANARY;
        panel.appendChild(header);
        panel.appendChild(body);
        document.documentElement.appendChild(panel);
        return panel;
    }

    function updatePanel(message, level) {
        var panel = ensurePanel();
        var body = document.getElementById('jasonos-foundry-panel-body');
        if (!body) { return; }
        var cls = 'jasonos-warn';
        if (level === 'ok') { cls = 'jasonos-ok'; }
        if (level === 'bad') { cls = 'jasonos-bad'; }
        body.className = cls;
        body.textContent = message;
    }

    function findComposerTextArea() {
        var selectors = [
            'textarea[data-testid="prompt-textarea"]',
            'div[contenteditable="true"][data-testid="prompt-textarea"]',
            'textarea',
            'div[contenteditable="true"]'
        ];
        for (var i = 0; i < selectors.length; i++) {
            var el = document.querySelector(selectors[i]);
            if (el) { return el; }
        }
        return null;
    }

    function insertComposerText(text) {
        var el = findComposerTextArea();
        if (!el) { return false; }
        try {
            el.focus();
            if (el.tagName && el.tagName.toLowerCase() === 'textarea') {
                el.value = text;
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
            } else {
                el.textContent = text;
                el.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    function maybeSurfaceToComposer(obj) {
        if (!obj) { return; }
        var prompt = safeString(obj.chatgpt_prompt);
        if (!prompt) { prompt = safeString(obj.expected_visible_text); }
        if (!prompt) { prompt = safeString(obj.canary); }
        if (!prompt) { return; }
        if (prompt === lastInjectedMessage) { return; }
        lastInjectedMessage = prompt;
        var ok = insertComposerText(prompt);
        if (ok) {
            updatePanel('Bridge OK. Inserted canary into composer:' + '\\n' + prompt, 'ok');
        } else {
            updatePanel('Bridge OK, but ChatGPT composer was not found. Canary:' + '\\n' + prompt, 'warn');
        }
    }

    function summarizeStatus(obj, raw) {
        var lines = [];
        lines.push('Status: CONNECTED');
        lines.push('Local canary: ' + LOCAL_CANARY);
        if (obj) {
            if (obj.status) { lines.push('Bridge status: ' + safeString(obj.status)); }
            if (obj.bridge) { lines.push('Bridge: ' + safeString(obj.bridge)); }
            if (obj.generated_at) { lines.push('Generated: ' + safeString(obj.generated_at)); }
            if (obj.expected_visible_text) { lines.push('Expected: ' + safeString(obj.expected_visible_text)); }
            if (obj.chatgpt_prompt) { lines.push('Prompt: ' + safeString(obj.chatgpt_prompt)); }
            if (obj.has_assistant_code !== undefined) { lines.push('Assistant code queued: ' + safeString(obj.has_assistant_code)); }
        }
        return lines.join('\\n');
    }

    function pollNow(forceSurface) {
        ensurePanel();
        if (!isEnabled()) {
            updatePanel('Bridge paused.' + '\\n' + LOCAL_CANARY, 'warn');
            return;
        }
        requestJson(BRIDGE_POLL_URL, function (obj, raw) {
            var text = summarizeStatus(obj, raw);
            if (text !== lastStatusText) {
                lastStatusText = text;
                updatePanel(text, 'ok');
            }
            if (forceSurface || safeString(obj.expected_visible_text).indexOf('FOUNDRY_BROWSER_CANARY') >= 0) {
                maybeSurfaceToComposer(obj);
            }
        }, function (err) {
            updatePanel('Bridge not reachable at ' + BRIDGE_POLL_URL + '\\n' + err + '\\n' + LOCAL_CANARY, 'bad');
        });
    }

    function boot() {
        ensurePanel();
        updatePanel('JasonOS Foundry userscript loaded.' + '\\n' + LOCAL_CANARY, 'warn');
        pollNow(false);
        window.setInterval(function () { pollNow(false); }, POLL_MS);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();