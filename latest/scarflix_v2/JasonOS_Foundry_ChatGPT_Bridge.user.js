// ==UserScript==
// @name         JasonOS Foundry ChatGPT Bridge
// @namespace    https://github.com/r0cksteadyw00t/plex-logs
// @version      2026.06.05.runtime.
20260605_135825
// @description  Runtime-proof ChatGPT bridge for JasonOS Foundry. Polls local bridge and sends browser heartbeat proof.
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
    var POLL_URL = 'http://127.0.0.1:8796/poll';
    var PROOF_URL = 'http://127.0.0.1:8796/tm-proof';
    var RUNTIME_CANARY = '
FOUNDRY_TAMPERMONKEY_RUNTIME_PROOF tm-runtime-proof-20260605_135825
';
    var POLL_MS = 5000;
    var lastText = '';
    var proofSentCount = 0;

    function s(v) { if (v === null || v === undefined) { return ''; } try { return String(v); } catch (e) { return ''; } }
    function enc(v) { try { return encodeURIComponent(s(v)); } catch (e) { return ''; } }

    function requestJson(url, ok, fail) {
        try {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url + (url.indexOf('?') >= 0 ? '&' : '?') + 'cachebust=' + Date.now(),
                timeout: 8000,
                onload: function (res) {
                    try {
                        if (!res || res.status < 200 || res.status >= 300) { if (fail) { fail('HTTP ' + (res ? res.status : 'unknown')); } return; }
                        var text = s(res.responseText).trim();
                        var obj = {};
                        if (text.length > 0) { obj = JSON.parse(text); }
                        ok(obj, text);
                    } catch (e) { if (fail) { fail('Parse error: ' + e.message); } }
                },
                onerror: function () { if (fail) { fail('Network error'); } },
                ontimeout: function () { if (fail) { fail('Timeout'); } }
            });
        } catch (e) { if (fail) { fail('Request failed: ' + e.message); } }
    }

    function ensurePanel() {
        var panel = document.getElementById('jasonos-foundry-panel');
        if (panel) { return panel; }
        if (typeof GM_addStyle === 'function') {
            GM_addStyle('#jasonos-foundry-panel{position:fixed;right:14px;bottom:14px;width:380px;z-index:2147483647;font-family:Arial,sans-serif;font-size:12px;background:rgba(20,20,20,.95);color:#f5f5f5;border:1px solid rgba(255,255,255,.24);border-radius:10px;box-shadow:0 6px 28px rgba(0,0,0,.38);overflow:hidden}#jasonos-foundry-panel-header{padding:8px 10px;font-weight:bold;background:rgba(0,0,0,.35);display:flex;justify-content:space-between;align-items:center}#jasonos-foundry-panel-body{padding:8px 10px;white-space:pre-wrap;line-height:1.35;max-height:240px;overflow:auto}.jasonos-ok{color:#7cff8a}.jasonos-warn{color:#ffd36e}.jasonos-bad{color:#ff8d8d}');
        }
        panel = document.createElement('div');
        panel.id = 'jasonos-foundry-panel';
        var header = document.createElement('div');
        header.id = 'jasonos-foundry-panel-header';
        header.textContent = 'JasonOS Foundry Bridge';
        var body = document.createElement('div');
        body.id = 'jasonos-foundry-panel-body';
        body.textContent = 'Runtime bridge loading...' + '\\n' + RUNTIME_CANARY;
        panel.appendChild(header);
        panel.appendChild(body);
        document.documentElement.appendChild(panel);
        return panel;
    }

    function updatePanel(text, level) {
        ensurePanel();
        var body = document.getElementById('jasonos-foundry-panel-body');
        if (!body) { return; }
        body.className = level === 'ok' ? 'jasonos-ok' : (level === 'bad' ? 'jasonos-bad' : 'jasonos-warn');
        body.textContent = text;
    }

    function sendProof(reason) {
        var url = PROOF_URL + '?source=tampermonkey&reason=' + enc(reason) + '&url=' + enc(window.location.href) + '&canary=' + enc(RUNTIME_CANARY);
        requestJson(url, function (obj) {
            proofSentCount += 1;
        }, function () {});
    }

    function poll() {
        sendProof('poll');
        requestJson(POLL_URL, function (obj) {
            var lines = [];
            lines.push('Status: BROWSER RUNTIME VERIFIED');
            lines.push('Proof sent count: ' + proofSentCount);
            lines.push('Runtime canary: ' + RUNTIME_CANARY);
            if (obj && obj.status) { lines.push('Bridge status: ' + s(obj.status)); }
            if (obj && obj.generated_at) { lines.push('Bridge generated: ' + s(obj.generated_at)); }
            if (obj && obj.runtime_proof && obj.runtime_proof.runtime_seen) { lines.push('Bridge saw runtime proof: true'); }
            var text = lines.join('\\n');
            if (text !== lastText) { lastText = text; updatePanel(text, 'ok'); }
        }, function (err) {
            updatePanel('Tampermonkey loaded, but local bridge poll failed.' + '\\n' + err + '\\n' + RUNTIME_CANARY, 'bad');
        });
    }

    function boot() {
        ensurePanel();
        updatePanel('Tampermonkey userscript loaded. Sending runtime proof...' + '\\n' + RUNTIME_CANARY, 'warn');
        sendProof('boot');
        setTimeout(poll, 1000);
        window.setInterval(poll, POLL_MS);
    }

    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', boot); } else { boot(); }
})();