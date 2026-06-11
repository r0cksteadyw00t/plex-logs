// JasonOS Prime Path 2 protected pilot migration runner.
// Additive-only runner for a 3-5 title traditional-path pilot.

const fs = require("fs");
const path = require("path");
const http = require("http");

const ROOT = "D:/PlexTools";
const PUBLIC = path.join(ROOT, "public/latest/scarflix_v2");
const STATE = path.join(ROOT, "state/jasonos_prime");
const SCARFLIX_STATE = path.join(ROOT, "state/scarflix_v2");
const REPO_ROOT = "C:/Users/jason/OneDrive/Documents/Plex Project";

const REQUEST_JSON = path.join(STATE, "path2_pilot_migration_request.json");
const STATUS_JSON = path.join(PUBLIC, "path2_pilot_migration_status.json");
const STATUS_MD = path.join(PUBLIC, "path2_pilot_migration_status.md");
const HISTORY_JSONL = path.join(STATE, "incidents/INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610_path2_pilot_history.jsonl");
const WEBDAV_MAP = path.join(SCARFLIX_STATE, "webdav_map.json");
const STAGE_A_STATUS = path.join(PUBLIC, "path2_stage_a_backup_and_protection.json");
const BASELINE_STATUS = path.join(PUBLIC, "section5_uncapped_index_snapshot_status.json");
const SENTINEL_STATUS = path.join(PUBLIC, "jasonos_prime_sentinel_status.json");
const ORCHESTRATOR_STATUS = path.join(PUBLIC, "jasonos_prime_orchestrator_status.json");
const GROK_HANDOFF = path.join(PUBLIC, "GROK_HANDOFF_FOR_GROK.md");
const CODEX_STATUS = path.join(PUBLIC, "CODEX_STATUS_FOR_GROK.md");
const PROJECT_PLAN = path.join(REPO_ROOT, "PROJECT_PLAN.md");

const INCIDENT_ID = "INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610";
const RAW_HANDOFF_URL = "https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/GROK_HANDOFF_FOR_GROK.md";
const MAX_TARGETS = 5;
const MIN_TARGETS = 1;
const WEBDAV_HEAD_TIMEOUT_MS = 5000;

function nowIso() {
  return new Date().toISOString();
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (_) {
    return fallback === undefined ? null : fallback;
  }
}

function readText(file, fallback) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch (_) {
    return fallback || "";
  }
}

function writeJson(file, value) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, JSON.stringify(value, null, 2), "utf8");
}

function writeText(file, value) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, value, "utf8");
}

function appendJsonl(file, value) {
  ensureDir(path.dirname(file));
  fs.appendFileSync(file, JSON.stringify(value) + "\n", "utf8");
}

function updateRequest(status, detail) {
  const request = readJson(REQUEST_JSON, null);
  if (!request) return;
  request.status = status;
  request.updated_utc = nowIso();
  request.detail = detail || {};
  writeJson(REQUEST_JSON, request);
}

function safeName(name) {
  return String(name || "")
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function hashFromPath(value) {
  const match = String(value || "").match(/ScarFLIX_part-[0-9a-f]+/i);
  return match ? match[0].toLowerCase() : "";
}

function normalizeHash(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/^scarflix_part-/i.test(text)) return text.toLowerCase();
  if (/^[0-9a-f]{16,}$/i.test(text)) return ("scarflix_part-" + text).toLowerCase();
  return hashFromPath(text);
}

function statLight(file) {
  try {
    const stat = fs.lstatSync(file);
    return {
      exists: true,
      is_symbolic_link: stat.isSymbolicLink(),
      is_directory: stat.isDirectory(),
      is_file: stat.isFile(),
      size: stat.size,
      mtime_utc: stat.mtime.toISOString()
    };
  } catch (error) {
    return {
      exists: false,
      error: String(error && error.message ? error.message : error)
    };
  }
}

function webdavHead(webdavPath) {
  return new Promise((resolve) => {
    const started = Date.now();
    const req = http.request({
      method: "HEAD",
      hostname: "127.0.0.1",
      port: 18789,
      path: webdavPath,
      timeout: WEBDAV_HEAD_TIMEOUT_MS
    }, (res) => {
      res.resume();
      res.on("end", () => resolve({
        ok: res.statusCode >= 200 && res.statusCode < 300,
        status_code: res.statusCode,
        duration_ms: Date.now() - started
      }));
    });
    req.on("timeout", () => {
      req.destroy(new Error("timeout"));
    });
    req.on("error", (error) => resolve({
      ok: false,
      error: String(error && error.message ? error.message : error),
      duration_ms: Date.now() - started
    }));
    req.end();
  });
}

function currentSafety() {
  const sentinel = readJson(SENTINEL_STATUS, {});
  const orchestrator = readJson(ORCHESTRATOR_STATUS, {});
  const launchHealth = orchestrator.launch_health || {};
  return {
    sentinel,
    orchestrator,
    pause_publication_active: orchestrator.pause && orchestrator.pause.pause_publication === true,
    sentinel_allowed: sentinel.status !== "ALERT" && sentinel.alert_level !== "HIGH",
    launch_allowed: launchHealth.degraded_required !== true && Number(launchHealth.timeout_rate || 0) <= 0.15 && Number(launchHealth.avg_spawn_latency_ms || 0) <= 800,
    launch_health: launchHealth
  };
}

function failStatus(status, reason, extra) {
  const safety = currentSafety();
  const out = Object.assign({
    component: "path2_pilot_migration_runner",
    schema_version: "jasonos.path2_pilot_migration.v1",
    status,
    updated_utc: nowIso(),
    incident_id: INCIDENT_ID,
    reason,
    pause_publication_active: safety.pause_publication_active,
    no_publication_started: true,
    no_expansion_started: true,
    no_cleanup_performed: true,
    no_deletion_performed: true,
    safety
  }, extra || {});
  writeArtifacts(out);
  return out;
}

function chooseTargets(request, baseline) {
  const present = baseline && baseline.comparison && Array.isArray(baseline.comparison.present)
    ? baseline.comparison.present
    : [];
  const requested = Array.isArray(request.target_hashes)
    ? request.target_hashes.map(normalizeHash).filter(Boolean)
    : [];
  if (requested.length > 0) {
    return requested.map((hash) => {
      const row = present.find((item) => normalizeHash(item.hash) === hash || normalizeHash(item.file) === hash);
      return row ? Object.assign({}, row, { hash }) : { hash };
    });
  }
  return present
    .filter((item) => {
      const file = String(item.file || "");
      return item && item.plex_present === true && item.webdav_map_entry_present === true && (file.indexOf("\\06 Discover Movies\\") >= 0 || file.indexOf("/06 Discover Movies/") >= 0);
    })
    .slice(0, Math.min(MAX_TARGETS, Number(request.target_count || 3)));
}

function findMapEntry(map, targetHash) {
  const entries = Array.isArray(map.entries) ? map.entries : [];
  for (let i = 0; i < entries.length; i += 1) {
    const entry = entries[i] || {};
    const localHash = normalizeHash(entry.local_path || entry.local_dir || entry.webdav_path || entry.rclone_path);
    if (localHash === targetHash) return { index: i, entry };
  }
  return null;
}

function aliasEntryExists(map, aliasPath) {
  const normalized = String(aliasPath || "").toLowerCase();
  return (Array.isArray(map.entries) ? map.entries : []).some((entry) => String(entry.local_path || "").toLowerCase() === normalized);
}

function backupFile(source, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(source, dest);
}

function atomicWriteJson(file, value) {
  const tmp = file + ".tmp." + process.pid + "." + Date.now();
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2), "utf8");
  fs.renameSync(tmp, file);
}

function rollback(createdAliases, mapBackup, rollbackReasons) {
  const actions = [];
  for (let i = createdAliases.length - 1; i >= 0; i -= 1) {
    const item = createdAliases[i];
    try {
      const stat = fs.lstatSync(item.alias_local_path);
      if (!stat.isSymbolicLink()) {
        actions.push({ path: item.alias_local_path, action: "skip_not_symlink" });
        continue;
      }
      fs.unlinkSync(item.alias_local_path);
      actions.push({ path: item.alias_local_path, action: "removed_alias_symlink" });
    } catch (error) {
      actions.push({ path: item.alias_local_path, action: "remove_alias_failed_or_missing", error: String(error && error.message ? error.message : error) });
    }
  }
  try {
    if (mapBackup && fs.existsSync(mapBackup)) {
      fs.copyFileSync(mapBackup, WEBDAV_MAP);
      actions.push({ path: WEBDAV_MAP, action: "restored_webdav_map_backup" });
    }
  } catch (error) {
    actions.push({ path: WEBDAV_MAP, action: "restore_webdav_map_failed", error: String(error && error.message ? error.message : error) });
  }
  return { rollback_reasons: rollbackReasons, actions };
}

function prependUnique(file, marker, block) {
  const old = readText(file, "");
  let cleaned = old;
  const idx = old.indexOf(marker);
  if (idx >= 0) {
    let next = old.indexOf("\n## ", idx + marker.length);
    if (next < 0) next = old.indexOf("\n# ", idx + marker.length);
    cleaned = next >= 0 ? old.slice(0, idx).trimEnd() + "\r\n\r\n" + old.slice(next).trimStart() : "";
  }
  writeText(file, block.trimEnd() + "\r\n\r\n" + cleaned.trimStart());
}

function writeArtifacts(status) {
  writeJson(STATUS_JSON, status);
  updateRequest(status.status, {
    status_json: STATUS_JSON,
    status_md: STATUS_MD,
    backup_root: status.backup_root || "",
    decision: status.decision || status.reason || ""
  });
  const pilot = status.pilot || {};
  const baseline = status.baseline || {};
  const md = [
    "# Path 2 Protected Pilot Migration",
    "",
    "- Updated UTC: " + status.updated_utc,
    "- Status: `" + status.status + "`",
    "- Incident: `" + INCIDENT_ID + "`",
    "- Baseline: " + (baseline.present_count || "-") + "/" + (baseline.expected_count || "-") + " visible, missing=" + (baseline.missing_count || "-"),
    "- Pilot attempted: " + (pilot.attempted === true),
    "- Target count: " + (pilot.target_count || 0),
    "- Created aliases: " + ((pilot.created_aliases || []).length),
    "- Rolled back: " + (status.rollback && status.rollback.performed === true),
    "",
    "## Decision",
    "",
    status.decision || status.reason || "",
    "",
    "## Raw Handoff URL",
    "",
    RAW_HANDOFF_URL,
    ""
  ].join("\r\n");
  writeText(STATUS_MD, md);

  const top = [
    "## PATH 2 PROTECTED PILOT MIGRATION STATUS",
    "",
    "**Updated UTC:** " + status.updated_utc,
    "**Status:** " + status.status,
    "**Raw handoff URL:** " + RAW_HANDOFF_URL,
    "",
    "### Summary",
    "- Dedicated runner: `JasonOS_Prime_Path2PilotMigrationRunner.js`",
    "- Baseline: " + (baseline.present_count || "-") + "/" + (baseline.expected_count || "-") + " visible, " + (baseline.missing_count || "-") + " missing.",
    "- Pilot attempted: " + (pilot.attempted === true),
    "- Created aliases: " + ((pilot.created_aliases || []).length),
    "- Rollback performed: " + (status.rollback && status.rollback.performed === true),
    "",
    "### Decision",
    status.decision || status.reason || ""
  ].join("\r\n");
  prependUnique(GROK_HANDOFF, "## PATH 2 PROTECTED PILOT MIGRATION STATUS", top);
  prependUnique(CODEX_STATUS, "## PATH 2 PROTECTED PILOT MIGRATION STATUS", top);
  prependUnique(PROJECT_PLAN, "## PATH 2 PROTECTED PILOT MIGRATION STATUS", top);
}

async function main() {
  const started = nowIso();
  const request = readJson(REQUEST_JSON, {});
  updateRequest("running", { started_utc: started });
  const safety = currentSafety();
  if (!safety.pause_publication_active) {
    return failStatus("HELD_PUBLICATION_NOT_PAUSED", "PAUSE_PUBLICATION is not active; pilot mutation is not allowed.", { request });
  }
  if (!safety.sentinel_allowed) {
    return failStatus("HELD_SENTINEL_ALERT", "Sentinel is ALERT/HIGH; pilot mutation is not allowed.", { request });
  }
  if (!safety.launch_allowed) {
    return failStatus("HELD_LAUNCH_HEALTH_DEGRADED", "Launch health is degraded; pilot mutation is not allowed.", { request });
  }

  const stageA = readJson(STAGE_A_STATUS, {});
  const baseline = readJson(BASELINE_STATUS, {});
  const comparison = baseline.comparison || {};
  const baselineSummary = {
    status: baseline.status || "",
    updated_utc: baseline.updated_utc || "",
    expected_count: comparison.expected_count || 0,
    present_count: comparison.present_count || 0,
    missing_count: comparison.missing_count || 0,
    present_percent: comparison.present_percent || 0,
    minimum_required_present_count: Number(request.minimum_present_count || 74)
  };
  if (baselineSummary.status !== "PASS_UNCAPPED_BASELINE_CAPTURED") {
    return failStatus("HELD_BASELINE_NOT_PASS", "Current uncapped baseline is not PASS.", { request, baseline: baselineSummary });
  }
  if (baselineSummary.present_count < baselineSummary.minimum_required_present_count) {
    return failStatus("HELD_BASELINE_REGRESSED", "Current baseline is below the required stable threshold.", { request, baseline: baselineSummary });
  }

  const targets = chooseTargets(request, baseline);
  if (targets.length < MIN_TARGETS || targets.length > MAX_TARGETS) {
    return failStatus("HELD_INVALID_TARGET_COUNT", "Target count must be between 1 and 5.", { request, baseline: baselineSummary, target_count: targets.length });
  }

  const targetHashes = targets.map((item) => normalizeHash(item.hash || item.file));
  const visibleHashes = new Set((comparison.present || []).map((item) => normalizeHash(item.hash || item.file)));
  const notVisible = targetHashes.filter((hash) => !visibleHashes.has(hash));
  if (notVisible.length > 0) {
    return failStatus("HELD_TARGET_NOT_VISIBLE", "One or more requested targets are not visible in the locked baseline.", { request, baseline: baselineSummary, not_visible_hashes: notVisible });
  }

  const webdavMap = readJson(WEBDAV_MAP, null);
  if (!webdavMap || !Array.isArray(webdavMap.entries)) {
    return failStatus("HELD_WEBDAV_MAP_INVALID", "webdav_map.json is missing or does not contain an entries array.", { request, baseline: baselineSummary });
  }

  const backupRoot = path.join(ROOT, "Backups", "path2_pilot_" + started.replace(/[:.]/g, ""));
  const mapBackup = path.join(backupRoot, "webdav_map.json.bak");
  const requestBackup = path.join(backupRoot, "path2_pilot_migration_request.json.bak");
  const stageABackupRoot = stageA.backup_root || "D:/PlexTools/Backups/path2_stage_a_20260610T235616Z";
  ensureDir(backupRoot);
  backupFile(WEBDAV_MAP, mapBackup);
  if (fs.existsSync(REQUEST_JSON)) backupFile(REQUEST_JSON, requestBackup);

  const createdAliases = [];
  const verification = [];
  const rollbackReasons = [];
  try {
    for (const target of targets) {
      const hash = normalizeHash(target.hash || target.file);
      const found = findMapEntry(webdavMap, hash);
      if (!found) throw new Error("Missing webdav_map entry for " + hash);
      const entry = found.entry;
      const legacyLocalPath = entry.local_path || target.file;
      const legacyLocalDir = entry.local_dir || path.dirname(legacyLocalPath);
      const movieDir = path.dirname(legacyLocalDir);
      const title = safeName(entry.title || target.title || path.basename(movieDir));
      if (!title || !/\(\d{4}\)$/.test(title)) throw new Error("Unsafe or non-traditional title for " + hash + ": " + title);
      const aliasLocalPath = path.join(movieDir, title + ".mkv");
      const relativeTarget = path.relative(movieDir, legacyLocalPath);

      const existing = statLight(aliasLocalPath);
      if (existing.exists) throw new Error("Alias already exists, refusing overwrite: " + aliasLocalPath);
      if (aliasEntryExists(webdavMap, aliasLocalPath)) throw new Error("Alias map entry already exists, refusing duplicate: " + aliasLocalPath);

      fs.symlinkSync(relativeTarget, aliasLocalPath, "file");
      const aliasStat = statLight(aliasLocalPath);
      if (!aliasStat.exists || !aliasStat.is_symbolic_link) throw new Error("Alias symlink verification failed: " + aliasLocalPath);

      const aliasEntry = Object.assign({}, entry, {
        path2_alias: true,
        path2_status: "pilot_alias_created",
        path2_created_utc: nowIso(),
        path2_pilot_backup_root: backupRoot,
        path2_alias_of_hash: hash,
        legacy_hash: hash,
        legacy_local_path: legacyLocalPath,
        legacy_local_dir: legacyLocalDir,
        local_path: aliasLocalPath,
        local_dir: movieDir,
        link_kind: "path2_traditional_file_symlink",
        rollback_local_path: aliasLocalPath,
        original_entry_index: found.index
      });
      webdavMap.entries.push(aliasEntry);
      if (!webdavMap.path2_pilot) webdavMap.path2_pilot = [];
      webdavMap.path2_pilot.push({
        created_utc: aliasEntry.path2_created_utc,
        hash,
        alias_local_path: aliasLocalPath,
        legacy_local_path: legacyLocalPath,
        backup_root: backupRoot
      });
      createdAliases.push({
        hash,
        title,
        alias_local_path: aliasLocalPath,
        legacy_local_path: legacyLocalPath,
        relative_target: relativeTarget,
        alias_stat: aliasStat
      });
    }

    atomicWriteJson(WEBDAV_MAP, webdavMap);

    for (const item of createdAliases) {
      const entry = findMapEntry(webdavMap, item.hash);
      const webdavPath = entry && entry.entry ? entry.entry.webdav_path : "";
      const head = webdavPath ? await webdavHead(webdavPath) : { ok: false, error: "missing_webdav_path" };
      verification.push({
        hash: item.hash,
        title: item.title,
        alias_local_path: item.alias_local_path,
        alias_lstat: statLight(item.alias_local_path),
        legacy_lstat: statLight(item.legacy_local_path),
        webdav_head: head
      });
      if (!head.ok) rollbackReasons.push("WebDAV HEAD failed for " + item.hash);
    }

    if (rollbackReasons.length > 0) {
      const rollbackResult = rollback(createdAliases, mapBackup, rollbackReasons);
      const status = {
        component: "path2_pilot_migration_runner",
        schema_version: "jasonos.path2_pilot_migration.v1",
        status: "ROLLED_BACK_PILOT_VERIFICATION_FAILED",
        started_utc: started,
        updated_utc: nowIso(),
        incident_id: INCIDENT_ID,
        request,
        baseline: baselineSummary,
        stage_a_backup_root: stageABackupRoot,
        backup_root: backupRoot,
        pilot: { attempted: true, target_count: targets.length, target_hashes: targetHashes, created_aliases: createdAliases },
        verification,
        rollback: { performed: true, result: rollbackResult },
        decision: "Pilot runner created aliases but verification failed; rollback was performed.",
        pause_publication_active: true,
        no_publication_started: true,
        no_expansion_started: true,
        no_cleanup_performed: true,
        no_deletion_performed: true,
        safety
      };
      writeArtifacts(status);
      appendJsonl(HISTORY_JSONL, status);
      process.exitCode = 2;
      return status;
    }

    const status = {
      component: "path2_pilot_migration_runner",
      schema_version: "jasonos.path2_pilot_migration.v1",
      status: "PASS_PROTECTED_ADDITIVE_PILOT_COMPLETE",
      started_utc: started,
      updated_utc: nowIso(),
      incident_id: INCIDENT_ID,
      request,
      baseline: baselineSummary,
      stage_a_backup_root: stageABackupRoot,
      backup_root: backupRoot,
      map_backup: mapBackup,
      pilot: { attempted: true, target_count: targets.length, target_hashes: targetHashes, created_aliases: createdAliases },
      verification,
      rollback: { performed: false, rollback_source: mapBackup, alias_paths: createdAliases.map((item) => item.alias_local_path) },
      decision: "Protected additive pilot completed. Legacy ScarFLIX_part-* paths were preserved; alias symlinks and additive map entries were created for the pilot only.",
      pause_publication_active: true,
      no_publication_started: true,
      no_expansion_started: true,
      no_cleanup_performed: true,
      no_deletion_performed: true,
      safety
    };
    writeArtifacts(status);
    appendJsonl(HISTORY_JSONL, status);
    return status;
  } catch (error) {
    const reason = String(error && error.message ? error.message : error);
    const rollbackResult = rollback(createdAliases, mapBackup, [reason]);
    const status = {
      component: "path2_pilot_migration_runner",
      schema_version: "jasonos.path2_pilot_migration.v1",
      status: "ROLLED_BACK_PILOT_ERROR",
      started_utc: started,
      updated_utc: nowIso(),
      incident_id: INCIDENT_ID,
      request,
      baseline: baselineSummary,
      stage_a_backup_root: stageABackupRoot,
      backup_root: backupRoot,
      pilot: { attempted: true, target_count: targets.length, target_hashes: targetHashes, created_aliases: createdAliases },
      verification,
      rollback: { performed: true, result: rollbackResult },
      error: reason,
      decision: "Pilot failed before completion; rollback was performed.",
      pause_publication_active: true,
      no_publication_started: true,
      no_expansion_started: true,
      safety
    };
    writeArtifacts(status);
    appendJsonl(HISTORY_JSONL, status);
    process.exitCode = 2;
    return status;
  }
}

main().catch((error) => {
  const out = failStatus("FAIL_UNHANDLED_EXCEPTION", String(error && error.message ? error.message : error), {});
  appendJsonl(HISTORY_JSONL, out);
  process.exitCode = 2;
});
