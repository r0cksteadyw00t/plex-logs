const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = "D:/PlexTools";
const PUBLIC = path.join(ROOT, "public/latest/scarflix_v2");
const STATE = path.join(ROOT, "state/jasonos_prime");
const DB_PATH = path.join(STATE, "jasonos.db");
const WEBDAV_MAP = path.join(ROOT, "state/scarflix_v2/webdav_map.json");
const DEFAULT_CAMPAIGN_ROOT = path.join(ROOT, "JasonOS_Campaigns/path2_final_push_autonomous");
const CAMPAIGN_ROOT = process.argv[2] || process.env.JASONOS_CAMPAIGN_ROOT || DEFAULT_CAMPAIGN_ROOT;
const LOG_PATH = path.join(CAMPAIGN_ROOT, "campaign_log.ndjson");
const STATE_PATH = path.join(CAMPAIGN_ROOT, "campaign_state.json");
const SUMMARY_PATH = path.join(CAMPAIGN_ROOT, "campaign_summary.md");
const HANDOFF_PATH = path.join(CAMPAIGN_ROOT, "final_handoff.md");
const HELD_WAVES_PATH = path.join(CAMPAIGN_ROOT, "held_waves.json");
const MUTATION_MANIFEST_PATH = path.join(CAMPAIGN_ROOT, "mutation_manifest.json");
const ROLLBACK_MANIFEST_PATH = path.join(CAMPAIGN_ROOT, "rollback_manifest.json");
const REQUEST_PATH = path.join(STATE, "path2_pilot_migration_request.json");

const RUN_HOURS = Number(process.env.JASONOS_CAMPAIGN_HOURS || 24);
const INTERVAL_MS = Number(process.env.JASONOS_CAMPAIGN_INTERVAL_MS || 7 * 60 * 1000);
const MAX_WAVE_SIZE = Number(process.env.JASONOS_CAMPAIGN_MAX_WAVE || 10);
const MIN_VISIBLE = Number(process.env.JASONOS_CAMPAIGN_MIN_VISIBLE || 88);
const JOB_TIMEOUT_MS = Number(process.env.JASONOS_CAMPAIGN_JOB_TIMEOUT_MS || 20 * 60 * 1000);
const INITIAL_EXCLUDE = new Set([
  "scarflix_part-d8b22fb3f498688e",
  "scarflix_part-c08b683f68e4e49e",
  "scarflix_part-2eaab8df357724dc",
  "scarflix_part-8aa2235ef7c1e0f6"
]);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function nowIso() {
  return new Date().toISOString();
}

function id(prefix) {
  return prefix + "_" + crypto.randomBytes(8).toString("hex");
}

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (_) {
    return fallback;
  }
}

function writeJson(filePath, obj) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), "utf8");
}

function appendLog(event, data) {
  ensureDir(path.dirname(LOG_PATH));
  fs.appendFileSync(LOG_PATH, JSON.stringify({ utc: nowIso(), event, data: data || {} }) + "\n", "utf8");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function loadSqlite() {
  try {
    return { kind: "node:sqlite", DatabaseSync: require("node:sqlite").DatabaseSync };
  } catch (_) {
    return { kind: "better-sqlite3", DatabaseSync: require("better-sqlite3") };
  }
}

function withDb(fn) {
  const driver = loadSqlite();
  const db = new driver.DatabaseSync(DB_PATH);
  try {
    return fn(db, driver.kind);
  } finally {
    try { db.close(); } catch (_) {}
  }
}

function bindParams(params) {
  const out = {};
  Object.keys(params || {}).forEach((key) => {
    out[key.startsWith("@") ? key : "@" + key] = params[key];
  });
  return out;
}

function dbRun(db, sql, params) {
  return db.prepare(sql).run(bindParams(params || {}));
}

function dbGet(db, sql, params) {
  return db.prepare(sql).get(bindParams(params || {}));
}

function queueJob(type, priority, payload) {
  return withDb((db) => {
    const jobId = id("job");
    const updated = nowIso();
    dbRun(
      db,
      "INSERT INTO jobs(id,type,queue,status,priority,payload_json,not_before_utc,created_utc,updated_utc) VALUES(@id,@type,'control','queued',@priority,@payload_json,NULL,@created_utc,@updated_utc)",
      {
        id: jobId,
        type,
        priority,
        payload_json: JSON.stringify(payload || {}),
        created_utc: updated,
        updated_utc: updated
      }
    );
    appendLog("queue_job", { job_id: jobId, type, priority });
    return jobId;
  });
}

function getJob(jobId) {
  return withDb((db) => dbGet(db, "SELECT id,type,status,updated_utc,last_error FROM jobs WHERE id=@id", { id: jobId }));
}

function publicJson(name, fallback) {
  return readJson(path.join(PUBLIC, name), fallback);
}

function currentSafety() {
  const sentinel = publicJson("jasonos_prime_sentinel_status.json", {});
  const orchestrator = publicJson("jasonos_prime_orchestrator_status.json", {});
  const snapshot = publicJson("section5_uncapped_index_snapshot_status.json", {});
  const launch = orchestrator.launch_health || {};
  return {
    updated_utc: nowIso(),
    sentinel,
    orchestrator,
    snapshot,
    gates: {
      sentinel_clear: sentinel.status !== "ALERT" && sentinel.alert_level !== "HIGH",
      pause_publication_active: !!(orchestrator.pause && orchestrator.pause.pause_publication === true),
      launch_non_degraded: launch.degraded_required !== true && Number(launch.timeout_rate || 0) <= 0.15,
      baseline_stable: snapshot.status === "PASS_UNCAPPED_BASELINE_CAPTURED" &&
        Number(snapshot.comparison && snapshot.comparison.present_count || 0) >= MIN_VISIBLE
    }
  };
}

function visibleHashSet(snapshot) {
  const present = snapshot && snapshot.comparison && Array.isArray(snapshot.comparison.present)
    ? snapshot.comparison.present
    : [];
  return new Set(present.map((row) => row.hash).filter(Boolean));
}

function aliasHashSet() {
  const map = readJson(WEBDAV_MAP, []);
  const rows = Array.isArray(map) ? map : (Array.isArray(map.entries) ? map.entries : Object.values(map || {}));
  return new Set(rows.filter((row) => row && row.path2_alias).map((row) => row.path2_alias_of_hash || row.legacy_hash).filter(Boolean));
}

function chooseMovieTargets(snapshot, limit) {
  const present = snapshot && snapshot.comparison && Array.isArray(snapshot.comparison.present)
    ? snapshot.comparison.present
    : [];
  const aliased = aliasHashSet();
  const state = readJson(STATE_PATH, {});
  const blocked = new Set((state.blocked_hashes || []).map((row) => row.hash || row).filter(Boolean));
  const chosen = [];
  const seen = new Set();
  for (const row of present) {
    if (!row || !row.hash || seen.has(row.hash)) continue;
    if (aliased.has(row.hash) || INITIAL_EXCLUDE.has(row.hash)) continue;
    if (blocked.has(row.hash)) continue;
    if (!(row.path_pattern && row.path_pattern.under_hybrid_movies_live)) continue;
    chosen.push({
      hash: row.hash,
      title: row.title || row.hash,
      file: row.file || "",
      parent_folder: row.path_pattern.parent_folder || ""
    });
    seen.add(row.hash);
    if (chosen.length >= limit) break;
  }
  return chosen;
}

function markWaveBlocked(result) {
  const state = readJson(STATE_PATH, {});
  const existing = Array.isArray(state.blocked_hashes) ? state.blocked_hashes : [];
  const byHash = new Map(existing.map((row) => [row.hash || row, typeof row === "string" ? { hash: row } : row]));
  const runnerStatus = result && result.runnerStatus ? result.runnerStatus : {};
  const rollbackReasons = runnerStatus.rollback && runnerStatus.rollback.result && Array.isArray(runnerStatus.rollback.result.rollback_reasons)
    ? runnerStatus.rollback.result.rollback_reasons
    : [];
  const reasonText = rollbackReasons.join(" | ") || String(result && result.status || "wave_not_pass");
  const parsed = new Set();
  reasonText.replace(/scarflix_part-[a-f0-9]+/gi, (match) => {
    parsed.add(match);
    return match;
  });
  const requestHashes = runnerStatus.request && Array.isArray(runnerStatus.request.target_hashes)
    ? runnerStatus.request.target_hashes
    : [];
  const hashes = parsed.size > 0 ? Array.from(parsed) : requestHashes;
  hashes.forEach((hash) => {
    byHash.set(hash, {
      hash,
      blocked_utc: nowIso(),
      reason: reasonText,
      wave_id: result && result.wave_id ? result.wave_id : "",
      status: "HELD_AFTER_WAVE_FAILURE"
    });
  });
  state.blocked_hashes = Array.from(byHash.values());
  state.status = "RUNNING_WITH_HELD_WAVE_FAILURE";
  state.last_wave_result = result;
  state.next_action = "Continue campaign with failed preflight hashes held out of future waves.";
  writeJson(STATE_PATH, state);
  appendLog("wave_failure_held_for_later", { held_hashes: hashes, reason: reasonText });
  return hashes;
}

function backupFile(source, backupRoot, label) {
  if (!fs.existsSync(source)) return "";
  ensureDir(backupRoot);
  const target = path.join(backupRoot, label || path.basename(source));
  fs.copyFileSync(source, target);
  return target;
}

function updateState(patch) {
  const current = readJson(STATE_PATH, {});
  const next = Object.assign({}, current, patch || {}, { updated_utc: nowIso() });
  writeJson(STATE_PATH, next);
  return next;
}

function updateDocs() {
  const state = readJson(STATE_PATH, {});
  const held = readJson(HELD_WAVES_PATH, { held_waves: [] });
  const safety = currentSafety();
  const comp = safety.snapshot.comparison || {};
  const text = [
    "# JasonOS Prime 24h Path 2 Final Push Campaign",
    "",
    `**Updated UTC:** ${nowIso()}`,
    `**Campaign root:** ${CAMPAIGN_ROOT}`,
    `**Status:** ${state.status || "UNKNOWN"}`,
    `**Sentinel:** ${safety.sentinel.status || "UNKNOWN"}/${safety.sentinel.alert_level || "UNKNOWN"}`,
    `**PAUSE_PUBLICATION:** ${safety.gates.pause_publication_active}`,
    `**Current baseline:** ${comp.present_count || "?"}/${comp.expected_count || "?"} visible, ${comp.missing_count || "?"} missing`,
    `**Completed waves:** ${(state.completed_waves || []).length}`,
    `**Held waves:** ${(held.held_waves || []).length}`,
    "",
    "## Guardrails",
    "- PAUSE_PUBLICATION must remain active.",
    "- No deletion, cleanup, publication, or legacy resolver expansion.",
    "- Path 2 waves are additive only and use the protected migration runner.",
    "- Roll back immediately if post-wave visible hashes regress.",
    "",
    "## Next Action",
    state.next_action || "Continue gated campaign loop.",
    ""
  ].join("\r\n");
  fs.writeFileSync(SUMMARY_PATH, text, "utf8");
  fs.writeFileSync(HANDOFF_PATH, text, "utf8");
}

async function waitForJob(jobId, timeoutMs) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const job = getJob(jobId);
    if (job && ["done", "failed", "blocked", "cancelled"].includes(job.status)) return job;
    await sleep(5000);
  }
  return { id: jobId, status: "timeout", last_error: "Timed out waiting for job." };
}

async function captureSnapshot(reason) {
  const before = publicJson("section5_uncapped_index_snapshot_status.json", {});
  const jobId = queueJob("section5_uncapped_index_snapshot", 23, {
    source: "jasonos_prime_24h_campaign_runner",
    reason,
    requested_utc: nowIso(),
    read_only: true
  });
  const job = await waitForJob(jobId, JOB_TIMEOUT_MS);
  const after = publicJson("section5_uncapped_index_snapshot_status.json", {});
  appendLog("snapshot_result", {
    reason,
    job,
    before_updated_utc: before.updated_utc,
    after_updated_utc: after.updated_utc,
    comparison: after.comparison
  });
  return after;
}

function rollbackFromRunnerStatus(reason) {
  const status = publicJson("path2_pilot_migration_status.json", {});
  const rollback = status.rollback || {};
  const source = rollback.rollback_source;
  const aliasPaths = Array.isArray(rollback.alias_paths) ? rollback.alias_paths : [];
  const result = { reason, source, alias_paths: aliasPaths, restored_map: false, removed_alias_paths: [] };
  if (source && fs.existsSync(source)) {
    fs.copyFileSync(source, WEBDAV_MAP);
    result.restored_map = true;
  }
  aliasPaths.forEach((aliasPath) => {
    try {
      if (fs.existsSync(aliasPath)) {
        fs.unlinkSync(aliasPath);
        result.removed_alias_paths.push(aliasPath);
      }
    } catch (error) {
      result.remove_error = String(error && error.message ? error.message : error);
    }
  });
  const manifest = readJson(ROLLBACK_MANIFEST_PATH, { rollbacks: [] });
  manifest.rollbacks = manifest.rollbacks || [];
  manifest.rollbacks.push(Object.assign({ utc: nowIso() }, result));
  writeJson(ROLLBACK_MANIFEST_PATH, manifest);
  appendLog("rollback_performed", result);
  return result;
}

async function executeWave(targets) {
  const preSnapshot = publicJson("section5_uncapped_index_snapshot_status.json", {});
  const preVisible = Array.from(visibleHashSet(preSnapshot));
  const waveId = `wave_${nowIso().replace(/[-:.]/g, "")}`;
  const backupRoot = path.join(CAMPAIGN_ROOT, "backups", waveId);
  const requestBackup = backupFile(REQUEST_PATH, backupRoot, "path2_pilot_migration_request.previous.json.bak");
  const mapBackup = backupFile(WEBDAV_MAP, backupRoot, "webdav_map.before_wave.json.bak");
  writeJson(path.join(backupRoot, "pre_snapshot.json"), preSnapshot);
  const request = {
    status: "queued",
    source: "jasonos_prime_24h_campaign_runner",
    campaign_root: CAMPAIGN_ROOT,
    wave_id: waveId,
    mode: "protected_additive_pilot",
    additive_only: true,
    target_count: targets.length,
    target_hashes: targets.map((row) => row.hash),
    target_titles: targets.map((row) => row.title),
    require_pause_publication: true,
    require_sentinel_clear: true,
    max_targets: MAX_WAVE_SIZE,
    activation_backup_root: backupRoot,
    request_backup: requestBackup,
    map_backup: mapBackup,
    requested_utc: nowIso()
  };
  writeJson(REQUEST_PATH, request);
  const mutation = readJson(MUTATION_MANIFEST_PATH, { mutations: [] });
  mutation.mutations = mutation.mutations || [];
  mutation.mutations.push({ utc: nowIso(), wave_id: waveId, target_count: targets.length, targets, backupRoot });
  writeJson(MUTATION_MANIFEST_PATH, mutation);
  appendLog("wave_request_written", { waveId, targets });
  const jobId = queueJob("path2_pilot_migration", 21, {
    source: "jasonos_prime_24h_campaign_runner",
    reason: "execute_path2_wave",
    requested_utc: nowIso(),
    wave_id: waveId,
    target_hashes: request.target_hashes,
    backup_root: backupRoot
  });
  const job = await waitForJob(jobId, JOB_TIMEOUT_MS);
  const runnerStatus = publicJson("path2_pilot_migration_status.json", {});
  if (job.status !== "done" || runnerStatus.status !== "PASS_PROTECTED_ADDITIVE_PILOT_COMPLETE") {
    const rollback = rollbackFromRunnerStatus("runner_failed_or_job_not_done");
    return { wave_id: waveId, status: "ROLLBACK_AFTER_RUNNER_FAILURE", job, runnerStatus, rollback };
  }
  const postSnapshot = await captureSnapshot(`post_${waveId}`);
  const postVisible = visibleHashSet(postSnapshot);
  const lost = preVisible.filter((hash) => !postVisible.has(hash));
  if (lost.length > 0) {
    const rollback = rollbackFromRunnerStatus("post_wave_visible_hash_regression");
    return { wave_id: waveId, status: "ROLLBACK_AFTER_REGRESSION", job, runnerStatus, lost_hashes: lost, rollback };
  }
  const state = readJson(STATE_PATH, {});
  state.completed_waves = state.completed_waves || [];
  state.completed_waves.push({
    wave_id: waveId,
    utc: nowIso(),
    target_count: targets.length,
    targets,
    pre_visible_count: preVisible.length,
    post_visible_count: postVisible.size,
    job_id: jobId
  });
  state.status = "RUNNING";
  state.next_action = "Continue gated Path 2 campaign loop.";
  writeJson(STATE_PATH, state);
  appendLog("wave_pass", { waveId, target_count: targets.length, pre_visible_count: preVisible.length, post_visible_count: postVisible.size });
  return { wave_id: waveId, status: "PASS", target_count: targets.length, pre_visible_count: preVisible.length, post_visible_count: postVisible.size };
}

function generateHeldWaves() {
  const snapshot = publicJson("section5_uncapped_index_snapshot_status.json", {});
  const present = snapshot.comparison && Array.isArray(snapshot.comparison.present) ? snapshot.comparison.present : [];
  const missing = snapshot.comparison && Array.isArray(snapshot.comparison.missing_samples) ? snapshot.comparison.missing_samples : [];
  const aliases = aliasHashSet();
  const movieCandidates = present
    .filter((row) => row && row.hash && !aliases.has(row.hash))
    .map((row) => ({ hash: row.hash, title: row.title || row.hash, file: row.file || "", status: "HELD_VISIBLE_MOVIE_CANDIDATE" }));
  const tvCandidates = [];
  const map = readJson(WEBDAV_MAP, []);
  const rows = Array.isArray(map) ? map : (Array.isArray(map.entries) ? map.entries : Object.values(map || {}));
  rows.forEach((row) => {
    const local = String(row && row.local_path || "");
    if (local.match(/\\b(TV|Shows|Series)\\b/i)) {
      tvCandidates.push({
        title: row.title || path.basename(local),
        local_path: local,
        webdav_path: row.webdav_path || "",
        status: "HELD_TV_CANDIDATE_NEEDS_AUDIT"
      });
    }
  });
  const held = {
    component: "path2_final_push_held_waves",
    updated_utc: nowIso(),
    campaign_root: CAMPAIGN_ROOT,
    held_waves: [
      { id: "movies_visible_next_25", status: "HELD", reason: "Requires successful 10-title wave and explicit stable baseline.", max_size: 25, candidates: movieCandidates.slice(0, 25) },
      { id: "movies_visible_next_50", status: "HELD", reason: "Requires successful 25-title wave and clean regression monitor.", max_size: 50, candidates: movieCandidates.slice(0, 50) },
      { id: "movies_missing_retryable", status: "HELD", reason: "Missing hashes are not eligible for additive mutation until a separate proof gate exists.", max_size: missing.length, candidates: missing.map((row) => ({ hash: row.hash, title: row.title || row.hash, file: row.file || "" })) },
      { id: "tv_audit_seed", status: "HELD", reason: "TV work requires separate audit and low-risk pilot selection.", max_size: Math.min(100, tvCandidates.length), candidates: tvCandidates.slice(0, 100) }
    ]
  };
  writeJson(HELD_WAVES_PATH, held);
  appendLog("held_waves_generated", { movieCandidates: movieCandidates.length, missing: missing.length, tvCandidates: tvCandidates.length });
  return held;
}

async function cycle() {
  const safety = currentSafety();
  const comp = safety.snapshot.comparison || {};
  appendLog("cycle_start", {
    sentinel: { status: safety.sentinel.status, alert_level: safety.sentinel.alert_level },
    baseline: { present_count: comp.present_count, missing_count: comp.missing_count },
    gates: safety.gates
  });
  generateHeldWaves();
  updateDocs();
  if (!safety.gates.pause_publication_active) {
    updateState({ status: "STOPPED_PAUSE_PUBLICATION_NOT_ACTIVE", next_action: "Restore PAUSE_PUBLICATION before any campaign action." });
    return "stop";
  }
  if (!safety.gates.sentinel_clear || !safety.gates.launch_non_degraded) {
    updateState({ status: "HELD_BY_SAFETY_GATE", next_action: "Wait for Sentinel/launch health gate to clear; continue manifest generation only." });
    return "held";
  }
  const snapshot = await captureSnapshot("campaign_cycle_fresh_baseline");
  const freshSafety = currentSafety();
  if (!freshSafety.gates.sentinel_clear || !freshSafety.gates.launch_non_degraded || !freshSafety.gates.baseline_stable) {
    updateState({ status: "HELD_AFTER_FRESH_BASELINE", next_action: "Wait for stable baseline and safety gates." });
    return "held";
  }
  const targets = chooseMovieTargets(snapshot, MAX_WAVE_SIZE);
  if (targets.length === 0) {
    updateState({ status: "NO_ELIGIBLE_VISIBLE_MOVIE_TARGETS", next_action: "Review held manifests for missing hashes and TV audit candidates." });
    return "held";
  }
  const result = await executeWave(targets);
  if (!String(result.status).startsWith("PASS")) {
    markWaveBlocked(result);
    return "held";
  }
  updateDocs();
  return "pass";
}

async function main() {
  ensureDir(CAMPAIGN_ROOT);
  const started = Date.now();
  updateState({
    campaign_root: CAMPAIGN_ROOT,
    runner: __filename,
    runner_started_utc: nowIso(),
    intended_duration_hours: RUN_HOURS,
    status: "RUNNING",
    max_wave_size: MAX_WAVE_SIZE,
    minimum_visible_count: MIN_VISIBLE,
    next_action: "Begin gated autonomous campaign loop."
  });
  appendLog("runner_started", { campaign_root: CAMPAIGN_ROOT, run_hours: RUN_HOURS, interval_ms: INTERVAL_MS, max_wave_size: MAX_WAVE_SIZE });
  while (Date.now() - started < RUN_HOURS * 60 * 60 * 1000) {
    const result = await cycle();
    if (result === "stop") break;
    await sleep(INTERVAL_MS);
  }
  updateState({ status: "STOPPED_OR_DURATION_COMPLETE", runner_stopped_utc: nowIso(), next_action: "Review campaign_summary.md and final_handoff.md." });
  updateDocs();
  appendLog("runner_stopped", {});
}

main().catch((error) => {
  appendLog("runner_error", { error: String(error && error.stack ? error.stack : error) });
  updateState({ status: "FAILED_RUNNER_EXCEPTION", last_error: String(error && error.message ? error.message : error), next_action: "Review campaign_log.ndjson before restarting." });
  updateDocs();
  process.exitCode = 1;
});
