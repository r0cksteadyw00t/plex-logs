// ==UserScript==
// @name         JasonOS Foundry Connectorless ChatGPT Bridge
// @namespace    https://github.com/r0cksteadyw00t/plex-logs
// @version      2026.06.05.connectorless.
20260605_162924
// @description  Sends JasonOS Foundry directive blocks from ChatGPT to local directive inbox so ChatGPT GitHub connector approvals are not required.
// @author       JasonOS Foundry
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      127.0.0.1
// @connect      localhost
// @updateURL    
https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/JasonOS_Foundry_Connectorless_ChatGPT_Bridge.user.js
// @downloadURL  
https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/JasonOS_Foundry_Connectorless_ChatGPT_Bridge.user.js
// ==/UserScript==

(function () {
  'use strict';
  var INBOX_URL = 'http://127.0.0.1:8798/chat-directive';
  var SEEN_KEY = 'jasonos_foundry_connectorless_seen_ids';
  var PANEL_ID = 'jasonos-connectorless-panel';
  function readSeen(){ try { return JSON.parse(localStorage.getItem(SEEN_KEY) || '{}'); } catch(e){ return {}; } }
  function writeSeen(o){ try { localStorage.setItem(SEEN_KEY, JSON.stringify(o)); } catch(e){} }
  function postDirective(text, id){
    GM_xmlhttpRequest({
      method: 'POST',
      url: INBOX_URL + '?cachebust=' + Date.now(),
      data: text,
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
      onload: function(res){ updatePanel('Connectorless directive delivered locally: ' + id + '\\nHTTP ' + res.status, true); },
      onerror: function(){ updatePanel('Connectorless directive failed to deliver locally: ' + id, false); },
      ontimeout: function(){ updatePanel('Connectorless directive timed out: ' + id, false); }
    });
  }
  function updatePanel(text, ok){
    var p = document.getElementById(PANEL_ID);
    if (!p) {
      p = document.createElement('div');
      p.id = PANEL_ID;
      p.style.cssText = 'position:fixed;right:14px;bottom:14px;width:390px;z-index:2147483647;font-family:Arial,sans-serif;font-size:12px;background:rgba(20,20,20,.96);color:#7cff8a;border:1px solid rgba(255,255,255,.25);border-radius:10px;padding:10px;white-space:pre-wrap;box-shadow:0 6px 28px rgba(0,0,0,.38)';
      document.documentElement.appendChild(p);
    }
    p.style.color = ok ? '#7cff8a' : '#ff8d8d';
    p.textContent = 'JasonOS Foundry Connectorless Bridge\\n' + text;
  }
  function extractBlocks(){
    var text = document.body ? document.body.innerText : '';
    var re = /JASONOS_FOUNDRY_LOCAL_DIRECTIVE_START\\s*([\\s\\S]*?)\\s*JASONOS_FOUNDRY_LOCAL_DIRECTIVE_END/g;
    var m;
    var seen = readSeen();
    while ((m = re.exec(text)) !== null) {
      var payload = (m[1] || '').trim();
      if (!payload) { continue; }
      var id = '';
      try { id = JSON.parse(payload).id || ''; } catch(e) { id = 'parse_failed_' + Date.now(); }
      if (!id) { id = 'directive_' + Date.now(); }
      if (seen[id]) { continue; }
      seen[id] = new Date().toISOString();
      writeSeen(seen);
      postDirective(payload, id);
    }
  }
  function boot(){ updatePanel('Watching ChatGPT for local directive blocks. GitHub connector writes are not required.', true); extractBlocks(); setInterval(extractBlocks, 3000); }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', boot); } else { boot(); }
})();