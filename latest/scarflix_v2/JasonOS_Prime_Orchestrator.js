const fs = require("fs");
const path = require("path");
const http = require("http");
const net = require("net");
const crypto = require("crypto");
const childProcess = require("child_process");

const ROOT = "D:/PlexTools";
const PUBLIC = path.join(ROOT, "public/latest/scarflix_v2");
const STATE = path.join(ROOT, "state/jasonos_prime");
const LOG_DIR = path.join(ROOT, "logs/jasonos_prime");
const DB_PATH = path.join(STATE, "jasonos.db");
const STATUS_PATH = path.join(PUBLIC, "jasonos_prime_orchestrator_status.json");
const STATUS_MD_PATH = path.join(PUBLIC, "jasonos_prime_orchestrator_status.md");
const TOKEN_DIR = "C:/Users/jason/OneDrive/Public/TOKENS";
const TOKEN_AWARENESS_JSON = path.join(PUBLIC, "jasonos_prime_token_awareness.json");
const TOKEN_AWARENESS_MD = path.join(PUBLIC, "jasonos_prime_token_awareness.md");
const TASK_OWNERSHIP_MANIFEST = path.join(STATE, "orchestrator_task_ownership.json");
const MANAGED_JOBS_STATUS = path.join(PUBLIC, "jasonos_prime_orchestrator_managed_jobs_status.json");
const SCARFLIX_STATUS_JOBS = path.join(PUBLIC, "jasonos_prime_orchestrator_scarflix_status_jobs.json");
const MATERIALIZED_QA_STATUS = path.join(PUBLIC, "materialized_canary_decision_qa_status.json");
const MATERIALIZED_QA_TRIAGE_JSON = path.join(PUBLIC, "materialized_qa_failure_triage.json");
const MATERIALIZED_QA_TRIAGE_MD = path.join(PUBLIC, "materialized_qa_failure_triage.md");
const MATERIALIZED_QA_RECOVERY_PLAN_JSON = path.join(PUBLIC, "materialized_qa_recovery_plan.json");
const MATERIALIZED_QA_RECOVERY_PLAN_MD = path.join(PUBLIC, "materialized_qa_recovery_plan.md");
const GROK_CYCLE_REPORT_JSON = path.join(PUBLIC, "ORCHESTRATOR_GROK_CYCLE_REPORT.json");
const GROK_CYCLE_REPORT_MD = path.join(PUBLIC, "ORCHESTRATOR_GROK_CYCLE_REPORT.md");
const GROK_REPORT_OUTBOX = path.join(STATE, "grok_report_outbox.jsonl");
const INSTRUCTION_LOOP_STATUS = path.join(PUBLIC, "jasonos_prime_instruction_loop_status.json");
const INSTRUCTION_LOOP_STATUS_MD = path.join(PUBLIC, "jasonos_prime_instruction_loop_status.md");
const EVENTS_JSONL = path.join(LOG_DIR, "orchestrator_events.jsonl");
const LAUNCH_TELEMETRY = path.join(PUBLIC, "jasonos_prime_orchestrator_launch_telemetry.json");
const DEGRADED_MODE_FILE = path.join(STATE, "DEGRADED_MODE");
const LEGACY_RETIREMENT_MANIFEST = path.join(STATE, "legacy_retirement_manifest.json");
const RETIRED_TASK_COMPLIANCE_JSON = path.join(PUBLIC, "jasonos_prime_retired_task_compliance.json");
const RETIRED_TASK_COMPLIANCE_MD = path.join(PUBLIC, "jasonos_prime_retired_task_compliance.md");
const INCIDENTS_JSON = path.join(PUBLIC, "jasonos_prime_autonomous_incidents.json");
const INCIDENTS_MD = path.join(PUBLIC, "jasonos_prime_autonomous_incidents.md");
const MATERIALIZED_INCIDENT_PROBE_JSON = path.join(PUBLIC, "jasonos_prime_materialized_qa_incident_probe.json");
const MATERIALIZED_INCIDENT_PROBE_MD = path.join(PUBLIC, "jasonos_prime_materialized_qa_incident_probe.md");
const MATERIALIZED_USER_CONTEXT_PROBE_JSON = path.join(PUBLIC, "jasonos_prime_materialized_qa_user_context_probe.json");
const MATERIALIZED_USER_CONTEXT_PROBE_MD = path.join(PUBLIC, "jasonos_prime_materialized_qa_user_context_probe.md");
const MATERIALIZED_QA_INCIDENT_LEDGER_JSON = path.join(PUBLIC, "materialized_qa_incident_hypothesis_ledger.json");
const MATERIALIZED_QA_INCIDENT_LEDGER_MD = path.join(PUBLIC, "materialized_qa_incident_hypothesis_ledger.md");
const HANDS_OFF_STATUS_JSON = path.join(PUBLIC, "jasonos_prime_hands_off_operation_status.json");
const HANDS_OFF_STATUS_MD = path.join(PUBLIC, "jasonos_prime_hands_off_operation_status.md");
const HANDS_OFF_HISTORY_JSONL = path.join(STATE, "hands_off_operation_history.jsonl");
const MATERIALIZED_QA_TIMING_PLAN_JSON = path.join(PUBLIC, "materialized_qa_decision_timing_probe_plan.json");
const MATERIALIZED_QA_TIMING_PLAN_MD = path.join(PUBLIC, "materialized_qa_decision_timing_probe_plan.md");
const MATERIALIZED_QA_TIMING_RESULTS_JSON = path.join(PUBLIC, "materialized_qa_timing_probe_results.json");
const MATERIALIZED_QA_TIMING_RESULTS_MD = path.join(PUBLIC, "materialized_qa_timing_probe_results.md");
const PLEX_METADATA_WEBDAV_MAP_COMPARISON_JSON = path.join(PUBLIC, "plex_metadata_vs_webdav_map_comparison_results.json");
const PLEX_METADATA_WEBDAV_MAP_COMPARISON_MD = path.join(PUBLIC, "plex_metadata_vs_webdav_map_comparison_results.md");
const REPORT_SECTION_HASHES = path.join(STATE, "grok_report_section_hashes.json");
const GROK_CYCLE_REPORT_DIFF_JSON = path.join(PUBLIC, "ORCHESTRATOR_GROK_CYCLE_REPORT_DIFF.json");
const GROK_CYCLE_REPORT_DIFF_MD = path.join(PUBLIC, "ORCHESTRATOR_GROK_CYCLE_REPORT_DIFF.md");
const PAUSE_ALL = path.join(STATE, "PAUSE_ALL");
const PAUSE_PUBLICATION = path.join(STATE, "PAUSE_PUBLICATION");
const SAFE_MODE = path.join(STATE, "SAFE_MODE");
const WORKER_DIR = path.join(ROOT, "Foundry/workers");
const PUBLIC_MIRROR_SCRIPT = path.join(WORKER_DIR, "JasonOS_Prime_PublicMirrorPublisher.js");
const PREDICTIVE_SCRIPT = path.join(WORKER_DIR, "JasonOS_Prime_PredictiveSimulator.js");
const SELF_EVOLUTION_SCRIPT = path.join(WORKER_DIR, "JasonOS_Prime_SelfEvolutionCycle.js");
const COMMAND_CENTRE_8791_KEEPALIVE_SCRIPT = path.join(WORKER_DIR, "JasonOS_Prime_CommandCentre_8791_Keepalive.js");
const REAL_AI_8805_KEEPALIVE_SCRIPT = path.join(WORKER_DIR, "JasonOS_Prime_Real_AI_8805_Keepalive.js");
const FAST_TRACK_SCRIPT = path.join(WORKER_DIR, "JasonOS_Prime_FastTrackAccelerator.js");
const GROK_INSTRUCTION_BRIDGE_SCRIPT = path.join(WORKER_DIR, "JasonOS_Prime_GrokInstructionBridge.js");
const CODEX_INSTRUCTION_CONSUMER_SCRIPT = path.join(WORKER_DIR, "JasonOS_Prime_CodexInstructionConsumer.js");
const GROK_REPORT_DELIVERY_BRIDGE_SCRIPT = path.join(WORKER_DIR, "JasonOS_Prime_GrokReportDeliveryBridge.js");
const MATERIALIZED_INCIDENT_PROBE_SCRIPT = path.join(WORKER_DIR, "JasonOS_Prime_MaterializedQaIncidentProbe.js");
const MATERIALIZED_DECISION_TIMING_PROBE_SCRIPT = path.join(WORKER_DIR, "JasonOS_Prime_MaterializedQaDecisionTimingProbe.js");
const PLEX_METADATA_WEBDAV_MAP_COMPARISON_SCRIPT = path.join(WORKER_DIR, "JasonOS_Prime_PlexMetadataVsWebdavMapComparison.js");
const SECTION5_HYBRID_RECONCILE_SCRIPT = path.join(WORKER_DIR, "JasonOS_Prime_Section5HybridReconcileThenVerify.js");
const SECTION5_HYBRID_RECONCILE_STATUS_JSON = path.join(PUBLIC, "section5_reconciliation_execution_status.json");
const SECTION5_UNCAPPED_INDEX_SNAPSHOT_SCRIPT = path.join(WORKER_DIR, "JasonOS_Prime_Section5UncappedIndexSnapshot.js");
const SECTION5_UNCAPPED_INDEX_SNAPSHOT_STATUS_JSON = path.join(PUBLIC, "section5_uncapped_index_snapshot_status.json");
const PATH2_PILOT_MIGRATION_SCRIPT = path.join(WORKER_DIR, "JasonOS_Prime_Path2PilotMigrationRunner.js");
const PATH2_PILOT_MIGRATION_STATUS_JSON = path.join(PUBLIC, "path2_pilot_migration_status.json");
const PATH2_PILOT_MIGRATION_REQUEST_JSON = path.join(STATE, "path2_pilot_migration_request.json");

const CONFIG = {
  version: "0.1.0",
  healthHost: "127.0.0.1",
  healthPort: Number(process.env.JASONOS_ORCHESTRATOR_PORT || 8815),
  tickMs: 15000,
  leaseSeconds: 90,
  controlWorkers: 2,
  ioWorkers: 1,
  cpuWorkers: 1,
  maxInlineJobMs: 60000,
  recurringJitterSeconds: 90,
  retryBackoffBaseSeconds: 60,
  maxRetryBackoffSeconds: 900,
  launchAvgThresholdMs: 800,
  launchTimeoutRateThreshold: 0.15,
  launchWindowMinutes: 10,
  launchRecentWindowSize: 120,
  launchBudgetPerMinute: 8,
  degradedControlWorkers: 1,
  degradedIoWorkers: 0,
  degradedCpuWorkers: 0,
  trackedChildMaxAgeMs: 5 * 60 * 1000,
  safeActionFailureThreshold: 3,
  handsOffCycleCadenceSeconds: 300,
  handsOffNoProgressEscalationCycles: 3,
  materializedTimingPlanCadenceSeconds: 900
};

const allowlistedActions = new Set([
  "write_status_summary",
  "write_strategy_note",
  "queue_detached_task_request",
  "update_dashboard_note",
  "update_next_actions",
  "generate_command_center",
  "sync_public_status"
]);

function nowIso() {
  return new Date().toISOString();
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readText(filePath, fallback) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (_) {
    return fallback || "";
  }
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (_) {
    return null;
  }
}

function writeJson(filePath, obj) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), "utf8");
}

function writeText(filePath, text) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, text, "utf8");
}

function appendJsonl(filePath, obj) {
  ensureDir(path.dirname(filePath));
  fs.appendFileSync(filePath, JSON.stringify(obj) + "\n", "utf8");
}

function id(prefix) {
  return prefix + "_" + crypto.randomBytes(8).toString("hex");
}

function log(level, event, data) {
  const record = Object.assign({
    ts: nowIso(),
    level,
    event,
    correlation_id: data && data.correlation_id ? data.correlation_id : id("corr")
  }, data || {});
  appendJsonl(EVENTS_JSONL, record);
  if (level === "error") {
    console.error(JSON.stringify(record));
  } else {
    console.log(JSON.stringify(record));
  }
}

function loadSqlite() {
  try {
    const sqlite = require("node:sqlite");
    return {
      kind: "node:sqlite",
      DatabaseSync: sqlite.DatabaseSync
    };
  } catch (_) {
    try {
      const BetterSqlite3 = require("better-sqlite3");
      return {
        kind: "better-sqlite3",
        DatabaseSync: BetterSqlite3
      };
    } catch (error) {
      return {
        kind: "missing",
        error: String(error && error.message ? error.message : error)
      };
    }
  }
}

class Db {
  constructor(filePath) {
    this.filePath = filePath;
    this.driver = loadSqlite();
    if (this.driver.kind === "missing") {
      throw new Error("SQLite driver unavailable. Need Node node:sqlite or better-sqlite3. " + this.driver.error);
    }
    ensureDir(path.dirname(filePath));
    this.db = new this.driver.DatabaseSync(filePath);
    this.exec("PRAGMA journal_mode=WAL");
    this.exec("PRAGMA busy_timeout=5000");
    this.migrate();
  }

  exec(sql) {
    return this.db.exec(sql);
  }

  prepare(sql) {
    return this.db.prepare(sql);
  }

  bindParams(params) {
    if (!params || this.driver.kind !== "node:sqlite" || Array.isArray(params)) return params || {};
    const out = {};
    Object.keys(params).forEach((key) => {
      if (/^[@:$]/.test(key)) {
        out[key] = params[key];
      } else {
        out["@" + key] = params[key];
      }
    });
    return out;
  }

  run(sql, params) {
    const stmt = this.prepare(sql);
    return stmt.run(this.bindParams(params || {}));
  }

  get(sql, params) {
    const stmt = this.prepare(sql);
    return stmt.get(this.bindParams(params || {}));
  }

  all(sql, params) {
    const stmt = this.prepare(sql);
    return stmt.all(this.bindParams(params || {}));
  }

  migrate() {
    this.exec(`
      CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        queue TEXT NOT NULL DEFAULT 'control',
        status TEXT NOT NULL DEFAULT 'queued',
        priority INTEGER NOT NULL DEFAULT 100,
        payload_json TEXT NOT NULL DEFAULT '{}',
        attempts INTEGER NOT NULL DEFAULT 0,
        max_attempts INTEGER NOT NULL DEFAULT 3,
        lease_owner TEXT,
        lease_until_utc TEXT,
        not_before_utc TEXT,
        created_utc TEXT NOT NULL,
        updated_utc TEXT NOT NULL,
        last_error TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_jobs_pick ON jobs(status, queue, priority, not_before_utc, created_utc);
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        ts_utc TEXT NOT NULL,
        level TEXT NOT NULL,
        event_type TEXT NOT NULL,
        correlation_id TEXT,
        data_json TEXT NOT NULL DEFAULT '{}'
      );
      CREATE TABLE IF NOT EXISTS snapshots (
        id TEXT PRIMARY KEY,
        ts_utc TEXT NOT NULL,
        source TEXT NOT NULL,
        data_json TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS planner_instructions (
        id TEXT PRIMARY KEY,
        created_utc TEXT NOT NULL,
        expires_utc TEXT,
        source TEXT NOT NULL,
        risk_level TEXT,
        approved INTEGER NOT NULL DEFAULT 0,
        requires_user_decision INTEGER NOT NULL DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'observed',
        data_json TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS leases (
        name TEXT PRIMARY KEY,
        owner TEXT NOT NULL,
        lease_until_utc TEXT NOT NULL,
        updated_utc TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_utc TEXT NOT NULL
      );
    `);
  }
}

class Orchestrator {
  constructor() {
    ensureDir(STATE);
    ensureDir(LOG_DIR);
    ensureDir(PUBLIC);
    this.startedUtc = nowIso();
    this.owner = "jasonos-orchestrator-" + process.pid;
    this.running = false;
    this.db = null;
    this.active = new Map();
    this.lastTickUtc = "";
    this.lastError = "";
    this.sqliteStatus = "UNKNOWN";
    this.launchTelemetry = {
      component: "jasonos_prime_orchestrator_launch_telemetry",
      updated_utc: nowIso(),
      process_launches_total: 0,
      spawn_sync_total: 0,
      spawn_detached_total: 0,
      recent_launches: [],
      tracked_children: [],
      degraded_mode: false,
      degraded_reason: "",
      launch_budget: {
        per_minute: CONFIG.launchBudgetPerMinute,
        avg_threshold_ms: CONFIG.launchAvgThresholdMs,
        timeout_rate_threshold: CONFIG.launchTimeoutRateThreshold,
        window_minutes: CONFIG.launchWindowMinutes
      },
      health: {},
      failsafe_events: []
    };
    this.trackedChildren = [];
    this.degradedMode = fs.existsSync(DEGRADED_MODE_FILE);
    this.degradedReason = this.degradedMode ? readText(DEGRADED_MODE_FILE, "").trim() : "";
    this.failsafeEvents = [];
    this.safeActionFailureStreak = 0;
  }

  start() {
    try {
      this.db = new Db(DB_PATH);
      this.sqliteStatus = "PASS_" + this.db.driver.kind;
      this.seedRecurringJobs();
    } catch (error) {
      this.sqliteStatus = "FAIL";
      this.lastError = String(error && error.message ? error.message : error);
      writeJson(STATUS_PATH, this.status("SAFE_MODE_SQLITE_UNAVAILABLE"));
      log("error", "sqlite_unavailable", { error: this.lastError });
      return;
    }

    this.running = true;
    this.startHealthServer();
    this.interval = setInterval(() => this.tick(), CONFIG.tickMs);
    this.tick();
    log("info", "orchestrator_started", { owner: this.owner, db_path: DB_PATH });
  }

  pauseState() {
    return {
      pause_all: fs.existsSync(PAUSE_ALL),
      pause_publication: fs.existsSync(PAUSE_PUBLICATION),
      safe_mode: fs.existsSync(SAFE_MODE),
      degraded_mode: fs.existsSync(DEGRADED_MODE_FILE)
    };
  }

  status(state) {
    const pause = this.pauseState();
    const credentialAwareness = this.credentialAwareness();
    const instructionLoop = this.instructionLoopSummary ? this.instructionLoopSummary() : {};
    const launchHealth = this.launchHealthSummary();
    const workerLimits = this.effectiveWorkerLimits();
    const handsOff = readJson(HANDS_OFF_STATUS_JSON) || {};
    return {
      component: "jasonos_prime_orchestrator",
      status: state || (this.running ? "PASS" : "STARTING"),
      updated_utc: nowIso(),
      version: CONFIG.version,
      pid: process.pid,
      owner: this.owner,
      started_utc: this.startedUtc,
      sqlite_status: this.sqliteStatus,
      db_path: DB_PATH,
      health_url: "http://" + CONFIG.healthHost + ":" + CONFIG.healthPort + "/healthz",
      last_tick_utc: this.lastTickUtc,
      last_error: this.lastError,
      active_jobs: Array.from(this.active.values()),
      pause,
      worker_limits: workerLimits,
      launch_health: launchHealth,
      degraded_mode: {
        active: this.degradedMode === true,
        reason: this.degradedReason || ""
      },
      scheduling: {
        recurring_jitter_seconds: CONFIG.recurringJitterSeconds,
        retry_backoff_base_seconds: CONFIG.retryBackoffBaseSeconds,
        max_retry_backoff_seconds: CONFIG.maxRetryBackoffSeconds,
        grok_instruction_ingest_cadence_seconds: 300,
        grok_bridge_consumer_cadence_seconds: 900,
        hands_off_operator_cadence_seconds: CONFIG.handsOffCycleCadenceSeconds,
        grok_report_delivery_cadence_seconds: 1800
      },
      launch_telemetry_path: LAUNCH_TELEMETRY,
      hands_off_operation: handsOff,
      hands_off_operation_status_path: HANDS_OFF_STATUS_JSON,
      instruction_loop: instructionLoop,
      credential_awareness: credentialAwareness,
      task_ownership_manifest: TASK_OWNERSHIP_MANIFEST,
      safety: {
        legacy_direct_resolver_expansion_allowed: false,
        long_validation_inline_allowed: false,
        consumer_requires_allowlisted_low_medium_approved_nonexpired: true,
        publication_pause_must_remain_active: true,
        hands_off_external_input_policy: "exception_only",
        launch_failsafe_avg_ms: CONFIG.launchAvgThresholdMs,
        launch_failsafe_timeout_rate: CONFIG.launchTimeoutRateThreshold
      }
    };
  }

  writeStatus(state) {
    const status = this.status(state);
    writeJson(STATUS_PATH, status);
    writeText(STATUS_MD_PATH, this.renderStatusMd(status));
    writeJson(TOKEN_AWARENESS_JSON, status.credential_awareness);
    writeText(TOKEN_AWARENESS_MD, this.renderCredentialAwarenessMd(status.credential_awareness));
    this.writeLaunchTelemetry();
  }

  credentialAwareness() {
    const tokens = [];
    let files = [];
    try {
      files = fs.readdirSync(TOKEN_DIR).filter((name) => /\.txt$/i.test(name)).sort((a, b) => a.localeCompare(b));
    } catch (_) {
      files = [];
    }
    for (const name of files) {
      const full = path.join(TOKEN_DIR, name);
      let value = "";
      try {
        value = fs.readFileSync(full, "utf8").trim().split(/\r?\n/)[0].trim();
      } catch (_) {
        value = "";
      }
      if (!value) continue;
      const classification = this.classifyToken(name, value);
      tokens.push(Object.assign({
        filename: name,
        identifier_prefix: this.safeTokenIdentifier(value),
        chars: value.length,
        last_write_utc: this.fileMtimeUtc(full)
      }, classification));
    }
    const normal = tokens.find((item) => item.filename === "GROK_API_KEY.txt") || tokens.find((item) => item.type === "Grok API Key");
    const management = tokens.find((item) => item.filename === "GROK_MANAGEMENT_KEY.txt") || tokens.find((item) => item.type === "xAI Management Key");
    return {
      component: "jasonos_prime_token_awareness",
      updated_utc: nowIso(),
      token_dir: TOKEN_DIR,
      full_secret_values_logged: false,
      normal_grok_communication_key: normal ? normal.filename : "",
      normal_grok_communication_status: normal ? normal.usability_status : "missing",
      management_key: management ? management.filename : "",
      management_key_status: management ? management.usability_status : "missing",
      management_key_note: "xAI management keys are for account-management operations and are not used for Grok model calls.",
      tokens
    };
  }

  classifyToken(filename, value) {
    const lower = filename.toLowerCase();
    if (value.indexOf("xai-token-") === 0) {
      return {
        type: "xAI Management Key",
        purpose: "Future xAI account-management operations only.",
        usable_for_grok_model_calls: false,
        usable_for_account_management: true,
        usability_status: "Not valid for model calls; previous model-call test returned HTTP 400 invalid-argument."
      };
    }
    if (value.indexOf("xai-") === 0) {
      return {
        type: "Grok API Key",
        purpose: "Normal Grok model calls for bridge instructions and cycle report delivery.",
        usable_for_grok_model_calls: true,
        usable_for_account_management: false,
        usability_status: filename === "GROK_API_KEY.txt" ? "PASS: Grok model call returned HTTP 200." : "Untested Grok API-style key."
      };
    }
    if (value.indexOf("github_pat_") === 0 || value.indexOf("ghp_") === 0) {
      return {
        type: "GitHub PAT",
        purpose: "Public mirror / GitHub status publication.",
        usable_for_grok_model_calls: false,
        usable_for_account_management: false,
        usability_status: lower === "github_pat.txt" ? "Known configured for public mirror; not retested in this cycle." : "Duplicate/alternate GitHub token; not retested in this cycle."
      };
    }
    if (value.indexOf("http://") === 0 || value.indexOf("https://") === 0) {
      return {
        type: "Endpoint/URL",
        purpose: "Configuration endpoint, not a secret key by itself.",
        usable_for_grok_model_calls: false,
        usable_for_account_management: false,
        usability_status: "Configuration value; not tested as a credential."
      };
    }
    if (lower.indexOf("plex_token") >= 0) {
      return {
        type: "Plex Token",
        purpose: "Plex API access.",
        usable_for_grok_model_calls: false,
        usable_for_account_management: false,
        usability_status: "Not retested in this cycle."
      };
    }
    if (lower.indexOf("rd_token") >= 0) {
      return {
        type: "Real-Debrid Token",
        purpose: "Real-Debrid/debrid source access.",
        usable_for_grok_model_calls: false,
        usable_for_account_management: false,
        usability_status: "Not retested in this cycle."
      };
    }
    if (lower.indexOf("tmdb") >= 0) {
      return {
        type: "TMDB Credential",
        purpose: "TMDB metadata lookup.",
        usable_for_grok_model_calls: false,
        usable_for_account_management: false,
        usability_status: "Not retested in this cycle."
      };
    }
    if (lower.indexOf("jackett") >= 0 || lower.indexOf("prowlarr") >= 0) {
      return {
        type: "Indexer API Key",
        purpose: "Indexer API access.",
        usable_for_grok_model_calls: false,
        usable_for_account_management: false,
        usability_status: "Not retested in this cycle."
      };
    }
    if (lower.indexOf("pass") >= 0) {
      return {
        type: "Password/Passphrase",
        purpose: "Local device or UI authentication.",
        usable_for_grok_model_calls: false,
        usable_for_account_management: false,
        usability_status: "Not retested in this cycle."
      };
    }
    if (lower.indexOf("user") >= 0 || lower.indexOf("host") >= 0 || lower.indexOf("ip") >= 0 || lower.indexOf("port") >= 0) {
      return {
        type: "Connection Config",
        purpose: "Host/user/port configuration.",
        usable_for_grok_model_calls: false,
        usable_for_account_management: false,
        usability_status: "Configuration value; not tested as a credential."
      };
    }
    return {
      type: "Unknown/Other Credential",
      purpose: "Token-folder value requiring component-specific handling.",
      usable_for_grok_model_calls: false,
      usable_for_account_management: false,
      usability_status: "Not retested in this cycle."
    };
  }

  safeTokenIdentifier(value) {
    const text = String(value || "");
    if (text.length <= 24) return text.slice(0, Math.min(4, text.length)) + "...";
    return text.slice(0, 12);
  }

  fileMtimeUtc(filePath) {
    try {
      return fs.statSync(filePath).mtime.toISOString();
    } catch (_) {
      return "";
    }
  }

  renderCredentialAwarenessMd(awareness) {
    const lines = [
      "# JasonOS Prime Token Awareness",
      "",
      "- Updated UTC: " + awareness.updated_utc,
      "- Token directory: `" + awareness.token_dir + "`",
      "- Full secret values logged: false",
      "- Normal Grok communication key: `" + (awareness.normal_grok_communication_key || "missing") + "`",
      "- Management key: `" + (awareness.management_key || "missing") + "`",
      "- Management key note: " + awareness.management_key_note,
      "",
      "| Filename | Identifier | Type | Purpose | Usability |",
      "|---|---:|---|---|---|"
    ];
    for (const token of awareness.tokens || []) {
      lines.push("| `" + token.filename + "` | `" + token.identifier_prefix + "` | " + token.type + " | " + token.purpose + " | " + token.usability_status + " |");
    }
    lines.push("");
    return lines.join("\r\n");
  }

  renderStatusMd(status) {
    const awareness = status.credential_awareness || {};
    const tokens = Array.isArray(awareness.tokens) ? awareness.tokens : [];
    const loop = status.instruction_loop || {};
    const classCounts = loop.classification_counts || {};
    const statusCounts = loop.status_counts || {};
    const handsOff = status.hands_off_operation || {};
    return [
      "# JasonOS Prime Orchestrator Status",
      "",
      "- Updated UTC: " + status.updated_utc,
      "- Status: " + status.status,
      "- PID: " + status.pid,
      "- SQLite: " + status.sqlite_status,
      "- Health URL: " + status.health_url,
      "- PAUSE_PUBLICATION: " + status.pause.pause_publication,
      "- Token files discovered: " + tokens.length,
      "- Grok communication key: `" + (awareness.normal_grok_communication_key || "missing") + "`",
      "- Grok communication status: " + (awareness.normal_grok_communication_status || "unknown"),
      "- Grok management key: `" + (awareness.management_key || "missing") + "`",
      "- Grok management status: " + (awareness.management_key_status || "unknown"),
      "- Grok management note: " + (awareness.management_key_note || "not documented"),
      "- Instruction loop status: " + (loop.status || "unknown"),
      "- Instruction cadence: ingest `300s`, bridge/consumer `900s`, report delivery `1800s`",
      "- Instruction classifications: Safe `" + (classCounts.Safe || 0) + "`, Review `" + (classCounts.Review || 0) + "`, Requires Human Approval `" + (classCounts["Requires Human Approval"] || 0) + "`",
      "- Instructions executed: `" + (statusCounts.executed || 0) + "`",
      "- Hands-off operation: " + (handsOff.status || "pending") + " / " + (handsOff.operating_model || "not yet activated"),
      "- Hands-off escalation required: " + (handsOff.escalation_required === true),
      "- Hands-off status file: `" + HANDS_OFF_STATUS_MD + "`",
      "- Instruction loop status file: `" + INSTRUCTION_LOOP_STATUS + "`",
      "- Token awareness: `" + TOKEN_AWARENESS_MD + "`",
      "- Launch telemetry: `" + LAUNCH_TELEMETRY + "`",
      ""
    ].join("\r\n");
  }

  startHealthServer() {
    this.server = http.createServer((req, res) => {
      if (req.url === "/healthz") {
        const status = this.status();
        const ok = status.sqlite_status.indexOf("PASS") === 0 && !status.pause.pause_all;
        res.writeHead(ok ? 200 : 503, { "Content-Type": "application/json" });
        res.end(JSON.stringify(status, null, 2));
        return;
      }
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("not found");
    });
    this.server.listen(CONFIG.healthPort, CONFIG.healthHost);
  }

  seedRecurringJobs() {
    this.writeTaskOwnershipManifest();
    this.scheduleRecurring();
  }

  enqueueUnique(type, queue, priority, payload) {
    const existing = this.db.get("SELECT id FROM jobs WHERE type=@type AND status IN ('queued','leased','running') LIMIT 1", { type });
    if (existing) return existing.id;
    const job = {
      id: id("job"),
      type,
      queue,
      priority,
      payload_json: JSON.stringify(payload || {}),
      not_before_utc: payload && payload.not_before_utc ? payload.not_before_utc : null,
      created_utc: nowIso(),
      updated_utc: nowIso()
    };
    this.db.run(
      "INSERT INTO jobs(id,type,queue,status,priority,payload_json,not_before_utc,created_utc,updated_utc) VALUES(@id,@type,@queue,'queued',@priority,@payload_json,@not_before_utc,@created_utc,@updated_utc)",
      job
    );
    return job.id;
  }

  tick() {
    this.lastTickUtc = nowIso();
    const pause = this.pauseState();
    if (pause.pause_all) {
      this.writeStatus("PAUSED_ALL");
      return;
    }
    this.pruneTrackedChildren();
    this.evaluateFailsafes();
    this.writeLegacyRetirementManifest();
    this.requeueExpiredLeases();
    this.scheduleRecurring();
    const limits = this.effectiveWorkerLimits();
    this.drainQueue("control", limits.control);
    this.drainQueue("io", limits.io);
    this.drainQueue("cpu", limits.cpu);
    this.writeStatus();
  }

  requeueExpiredLeases() {
    this.db.run(
      "UPDATE jobs SET status='queued', lease_owner=NULL, lease_until_utc=NULL, updated_utc=@now WHERE status IN ('leased','running') AND lease_until_utc IS NOT NULL AND lease_until_utc < @now",
      { now: nowIso() }
    );
  }

  scheduleRecurring() {
    this.ensureRecurringJob("snapshot_status", "control", 10, 60);
    this.ensureRecurringJob("launch_health_monitor", "control", 12, 60);
    this.ensureRecurringJob("ingest_grok_instructions", "control", 15, 300);
    this.ensureRecurringJob("run_grok_bridge_consumer_cycle", "control", 18, 900);
    this.ensureRecurringJob("hands_off_operator_cycle", "control", 20, CONFIG.handsOffCycleCadenceSeconds);
    this.ensureRecurringJob("retired_task_compliance_audit", "control", 25, 900);
    this.ensureRecurringJob("autonomous_incident_manager", "control", 27, 300);
    this.ensureRecurringJob("generate_command_center", "control", 30, 900);
    this.ensureRecurringJob("sync_public_status", "io", 50, 900);
    this.ensureRecurringJob("run_public_mirror_publisher", "io", 60, 900);
    this.ensureRecurringJob("run_ai_keepalive_check", "control", 60, 900);
    this.ensureRecurringJob("run_predictive_simulator", "control", 70, 3600);
    this.ensureRecurringJob("run_self_evolution_cycle", "control", 80, 86400);
    this.ensureRecurringJob("evaluate_fasttrack_gate", "control", 90, 900);
    this.ensureRecurringJob("scarflix_status_snapshot", "control", 95, 900);
    this.ensureRecurringJob("generate_grok_cycle_report", "control", 100, 1800);
    this.ensureRecurringJob("deliver_grok_cycle_report", "io", 105, 1800);
  }

  ensureRecurringJob(type, queue, priority, cadenceSeconds) {
    const active = this.db.get("SELECT id FROM jobs WHERE type=@type AND status IN ('queued','leased','running') LIMIT 1", { type });
    if (active) return;
    const last = this.db.get("SELECT updated_utc FROM jobs WHERE type=@type AND status='done' ORDER BY updated_utc DESC LIMIT 1", { type });
    if (last && last.updated_utc) {
      const ageMs = Date.now() - Date.parse(last.updated_utc);
      if (Number.isFinite(ageMs) && ageMs < cadenceSeconds * 1000) return;
    }
    const jitterSeconds = Math.floor(Math.random() * Math.max(1, CONFIG.recurringJitterSeconds + 1));
    const notBefore = new Date(Date.now() + jitterSeconds * 1000).toISOString();
    this.enqueueUnique(type, queue, priority, {
      scheduled_at: nowIso(),
      cadence_seconds: cadenceSeconds,
      jitter_seconds: jitterSeconds,
      not_before_utc: notBefore
    });
  }

  drainQueue(queue, limit) {
    const active = Array.from(this.active.values()).filter((job) => job.queue === queue).length;
    const capacity = Math.max(0, limit - active);
    for (let i = 0; i < capacity; i += 1) {
      const job = this.leaseJob(queue);
      if (!job) break;
      this.runJob(job);
    }
  }

  leaseJob(queue) {
    const job = this.db.get(
      "SELECT * FROM jobs WHERE status='queued' AND queue=@queue AND (not_before_utc IS NULL OR not_before_utc <= @now) ORDER BY priority ASC, created_utc ASC LIMIT 1",
      { queue, now: nowIso() }
    );
    if (!job) return null;
    const leaseUntil = new Date(Date.now() + CONFIG.leaseSeconds * 1000).toISOString();
    this.db.run(
      "UPDATE jobs SET status='leased', lease_owner=@owner, lease_until_utc=@lease_until_utc, attempts=attempts+1, updated_utc=@now WHERE id=@id AND status='queued'",
      { id: job.id, owner: this.owner, lease_until_utc: leaseUntil, now: nowIso() }
    );
    return this.db.get("SELECT * FROM jobs WHERE id=@id", { id: job.id });
  }

  runJob(job) {
    const started = nowIso();
    this.active.set(job.id, { id: job.id, type: job.type, queue: job.queue, started_utc: started });
    this.db.run("UPDATE jobs SET status='running', updated_utc=@now WHERE id=@id", { id: job.id, now: nowIso() });
    Promise.resolve()
      .then(() => this.dispatch(job))
      .then(() => {
        this.db.run("UPDATE jobs SET status='done', updated_utc=@now WHERE id=@id", { id: job.id, now: nowIso() });
        log("info", "job_done", { job_id: job.id, job_type: job.type });
      })
      .catch((error) => {
        const err = String(error && error.message ? error.message : error).slice(0, 1000);
        const nextStatus = job.attempts >= job.max_attempts ? "failed" : "queued";
        const backoffSeconds = Math.min(
          CONFIG.maxRetryBackoffSeconds,
          CONFIG.retryBackoffBaseSeconds * Math.max(1, Math.pow(2, Math.max(0, job.attempts - 1)))
        );
        const retryAfter = nextStatus === "queued" ? new Date(Date.now() + backoffSeconds * 1000).toISOString() : null;
        this.db.run(
          "UPDATE jobs SET status=@status, last_error=@err, lease_owner=NULL, lease_until_utc=NULL, not_before_utc=@not_before_utc, updated_utc=@now WHERE id=@id",
          { id: job.id, status: nextStatus, err, not_before_utc: retryAfter, now: nowIso() }
        );
        this.lastError = err;
        log("error", "job_failed", { job_id: job.id, job_type: job.type, error: err });
      })
      .finally(() => {
        this.active.delete(job.id);
      });
  }

  async dispatch(job) {
    if (job.type === "snapshot_status") return this.snapshotStatus();
    if (job.type === "launch_health_monitor") return this.launchHealthMonitor();
    if (job.type === "ingest_grok_instructions") return this.ingestGrokInstructions();
    if (job.type.indexOf("execute_instruction_") === 0 || job.type.indexOf("execute_grok_instruction_") === 0) return this.executePlannerInstruction(job);
    if (job.type === "generate_command_center") return this.generateCommandCenter();
    if (job.type === "run_grok_bridge_consumer_cycle") return this.runGrokBridgeConsumerCycle();
    if (job.type === "hands_off_operator_cycle") return this.handsOffOperatorCycle();
    if (job.type === "sync_public_status") return this.syncPublicStatus();
    if (job.type === "run_public_mirror_publisher") return this.runPublicMirrorPublisher();
    if (job.type === "run_ai_keepalive_check") return this.runAiKeepaliveCheck();
    if (job.type === "run_predictive_simulator") return this.runPredictiveSimulator();
    if (job.type === "run_self_evolution_cycle") return this.runSelfEvolutionCycle();
    if (job.type === "evaluate_fasttrack_gate") return this.evaluateFastTrackGate();
    if (job.type === "scarflix_status_snapshot") return this.scarflixStatusSnapshot();
    if (job.type === "triage_materialized_qa_failures") return this.triageMaterializedQaFailures();
    if (job.type === "retired_task_compliance_audit") return this.retiredTaskComplianceAudit();
    if (job.type === "autonomous_incident_manager") return this.autonomousIncidentManager();
    if (job.type === "plan_materialized_qa_decision_timing_probe") return this.planMaterializedQaDecisionTimingProbe();
    if (job.type === "run_materialized_qa_incident_probe_cycle") return this.runMaterializedQaIncidentProbeCycle();
    if (job.type === "section5_hybrid_reconcile_then_verify") return this.section5HybridReconcileThenVerify();
    if (job.type === "section5_uncapped_index_snapshot") return this.section5UncappedIndexSnapshot();
    if (job.type === "path2_pilot_migration") return this.path2PilotMigration();
    if (job.type === "run_materialized_qa_decision_timing_probe") return this.runMaterializedQaDecisionTimingProbe();
    if (job.type === "run_plex_metadata_vs_webdav_map_comparison") return this.runPlexMetadataVsWebdavMapComparison();
    if (job.type === "generate_grok_cycle_report") return this.generateGrokCycleReport();
    if (job.type === "deliver_grok_cycle_report") return this.deliverGrokCycleReport();
    throw new Error("Unknown job type " + job.type);
  }

  snapshotStatus() {
    const dashboard = readJson(path.join(PUBLIC, "jasonos_prime_outcome_dashboard.json")) || {};
    const snapshot = {
      id: id("snap"),
      ts_utc: nowIso(),
      source: "public_status_files",
      data_json: JSON.stringify({
        dashboard_updated_utc: dashboard.updated_utc || null,
        truth_metrics: dashboard.truth_metrics || {},
        automation_health: dashboard.automation_health || {},
        watchdog_status: dashboard.watchdog_status || {},
        sentinel_status: dashboard.sentinel_status || {}
      })
    };
    this.db.run("INSERT INTO snapshots(id,ts_utc,source,data_json) VALUES(@id,@ts_utc,@source,@data_json)", snapshot);
  }

  writeTaskOwnershipManifest() {
    writeJson(TASK_OWNERSHIP_MANIFEST, {
      component: "jasonos_prime_orchestrator_task_ownership",
      version: "1.0",
      updated_utc: nowIso(),
      owner: "jasonos_prime_orchestrator",
      purpose: "Shared manifest used by legacy scheduled-task installers/workers to avoid re-enabling tasks migrated to the Orchestrator.",
      tasks: {
        JasonOS_Prime_PublicMirrorPublisher: this.taskOwnership("run_public_mirror_publisher", "io", 900),
        JasonOS_Prime_PredictiveSimulator: this.taskOwnership("run_predictive_simulator", "control", 3600),
        JasonOS_Prime_SelfEvolutionCycle: this.taskOwnership("run_self_evolution_cycle", "control", 86400),
        JasonOS_Prime_CommandCentre_8791_Keepalive: this.taskOwnership("run_ai_keepalive_check", "control", 900),
        JasonOS_Prime_Real_AI_8805_Keepalive: this.taskOwnership("run_ai_keepalive_check", "control", 900),
        JasonOS_Prime_GrokInstructionBridge: this.taskOwnership("run_grok_bridge_consumer_cycle", "control", 900),
        JasonOS_Prime_CodexInstructionConsumer: this.taskOwnership("run_grok_bridge_consumer_cycle", "control", 900),
        JasonOS_Prime_FastTrackAccelerator: Object.assign(this.taskOwnership("evaluate_fasttrack_gate", "control", 900), {
          safety_gate: "never_launch_expansion_unless_materialized_decision_qa_passes"
        })
      }
    });
  }

  taskOwnership(job, queue, cadenceSeconds) {
    return {
      owner: "orchestrator",
      orchestrator_job: job,
      queue,
      cadence_seconds: cadenceSeconds,
      legacy_scheduler: {
        desired_state: "disabled",
        allow_create: false,
        allow_enable: false,
        allow_run: false
      }
    };
  }

  effectiveWorkerLimits() {
    if (this.degradedMode === true || fs.existsSync(DEGRADED_MODE_FILE)) {
      return {
        control: CONFIG.degradedControlWorkers,
        io: CONFIG.degradedIoWorkers,
        cpu: CONFIG.degradedCpuWorkers,
        degraded: true
      };
    }
    return {
      control: CONFIG.controlWorkers,
      io: CONFIG.ioWorkers,
      cpu: CONFIG.cpuWorkers,
      degraded: false
    };
  }

  launchHealthSummary() {
    const now = Date.now();
    const windowMs = CONFIG.launchWindowMinutes * 60 * 1000;
    const recent = (this.launchTelemetry.recent_launches || []).filter((item) => {
      const ts = Date.parse(item.ts_utc || "");
      return Number.isFinite(ts) && now - ts <= windowMs;
    });
    const latencyValues = recent
      .map((item) => Number(item.launch_latency_ms))
      .filter((value) => Number.isFinite(value) && value >= 0);
    const runtimeValues = recent
      .map((item) => Number(item.process_runtime_ms || item.elapsed_ms || 0))
      .filter((value) => value > 0);
    const timedOut = recent.filter((item) => item.timed_out === true || /timed out|timeout/i.test(String(item.error || ""))).length;
    const avgLatency = latencyValues.length ? Math.round(latencyValues.reduce((sum, value) => sum + value, 0) / latencyValues.length) : 0;
    const avgRuntime = runtimeValues.length ? Math.round(runtimeValues.reduce((sum, value) => sum + value, 0) / runtimeValues.length) : 0;
    const timeoutRate = recent.length ? Number((timedOut / recent.length).toFixed(3)) : 0;
    const launchesLastMinute = recent.filter((item) => {
      const ts = Date.parse(item.ts_utc || "");
      return Number.isFinite(ts) && now - ts <= 60000;
    }).length;
    return {
      updated_utc: nowIso(),
      window_minutes: CONFIG.launchWindowMinutes,
      sample_count: recent.length,
      latency_sample_count: latencyValues.length,
      avg_spawn_latency_ms: avgLatency,
      avg_process_runtime_ms: avgRuntime,
      timeout_count: timedOut,
      timeout_rate: timeoutRate,
      launches_last_minute: launchesLastMinute,
      budget_per_minute: CONFIG.launchBudgetPerMinute,
      degraded_required: (latencyValues.length > 0 && avgLatency > CONFIG.launchAvgThresholdMs) || timeoutRate > CONFIG.launchTimeoutRateThreshold,
      active_child_count: this.trackedChildren.length,
      tracked_child_count: this.trackedChildren.length
    };
  }

  setDegradedMode(active, reason) {
    const normalizedReason = reason || "";
    if (active) {
      this.degradedMode = true;
      this.degradedReason = normalizedReason;
      writeText(DEGRADED_MODE_FILE, normalizedReason + "\r\n");
    } else {
      this.degradedMode = false;
      this.degradedReason = "";
      try { fs.unlinkSync(DEGRADED_MODE_FILE); } catch (_) {}
    }
    const event = {
      ts_utc: nowIso(),
      active: this.degradedMode,
      reason: this.degradedReason
    };
    this.failsafeEvents.push(event);
    if (this.failsafeEvents.length > 50) this.failsafeEvents = this.failsafeEvents.slice(-50);
    log("warn", "degraded_mode_changed", event);
  }

  evaluateFailsafes() {
    const health = this.launchHealthSummary();
    if (health.degraded_required && this.degradedMode !== true) {
      this.setDegradedMode(true, "launch_health_threshold_exceeded avg_ms=" + health.avg_spawn_latency_ms + " timeout_rate=" + health.timeout_rate);
      this.recordManagedJob("launch_failsafe", "DEGRADED_MODE_ACTIVE", { health });
    }
    if (this.degradedMode === true && !health.degraded_required && health.sample_count >= 5) {
      this.recordManagedJob("launch_failsafe", "PASS_RECOVERING_MANUAL_CLEAR_RECOMMENDED", {
        health,
        note: "Degraded mode is left active until manually cleared or next stable maintenance window to prevent oscillation."
      });
    }
  }

  launchAllowed(jobClass, name, critical) {
    const health = this.launchHealthSummary();
    if (health.launches_last_minute >= CONFIG.launchBudgetPerMinute && critical !== true) {
      this.recordManagedJob("launch_budget", "HELD_BUDGET_EXCEEDED", { job_class: jobClass, name, health });
      return false;
    }
    if ((this.degradedMode === true || fs.existsSync(DEGRADED_MODE_FILE)) && critical !== true) {
      this.recordManagedJob("launch_budget", "HELD_DEGRADED_MODE", { job_class: jobClass, name, health, degraded_reason: this.degradedReason });
      return false;
    }
    return true;
  }

  pruneTrackedChildren() {
    const now = Date.now();
    const kept = [];
    const actions = [];
    for (const child of this.trackedChildren) {
      const ageMs = now - Date.parse(child.started_utc || nowIso());
      if (ageMs <= CONFIG.trackedChildMaxAgeMs) {
        kept.push(child);
        continue;
      }
      try {
        if (child.pid) process.kill(child.pid, 0);
        if (child.pid) process.kill(child.pid);
        actions.push({ pid: child.pid, name: child.name, action: "killed_tracked_child_over_5m" });
      } catch (err) {
        actions.push({ pid: child.pid, name: child.name, action: "already_exited_or_unavailable", error: String(err && err.message ? err.message : err).slice(0, 200) });
      }
    }
    this.trackedChildren = kept;
    if (actions.length) {
      this.recordManagedJob("tracked_child_cleanup", "PASS", { actions });
    }
  }

  writeLegacyRetirementManifest() {
    const manifest = {
      component: "jasonos_prime_legacy_retirement_manifest",
      schema_version: "jasonos.legacy_retirement.v1",
      updated_utc: nowIso(),
      owner: "jasonos_prime_orchestrator",
      mode: "soft_tombstone_reversible",
      rollback_path: "Set retired=false for the component or remove this manifest, then restart the affected legacy worker only if Orchestrator ownership is deliberately rolled back.",
      retired_components: {
        JasonOS_Prime_WorkerMesh: {
          retired: true,
          reason: "Recurring task creation and repair ownership moved to JasonOS Prime Orchestrator.",
          allowed_actions: ["write_retired_status", "exit_without_task_mutation"],
          blocked_actions: ["create_scheduled_task", "enable_scheduled_task", "run_high_churn_worker_loop"]
        },
        JasonOS_Prime_QuietTasks_InstallOrUpdate: {
          retired: true,
          reason: "Quiet scheduled task hygiene is replaced by Orchestrator task ownership and compliance audit.",
          allowed_actions: ["write_retired_status", "exit_without_task_mutation"],
          blocked_actions: ["create_scheduled_task", "enable_scheduled_task", "run_task_hygiene"]
        }
      }
    };
    writeJson(LEGACY_RETIREMENT_MANIFEST, manifest);
  }

  retiredTaskComplianceAudit() {
    this.writeLegacyRetirementManifest();
    const workerMesh = readJson(path.join(PUBLIC, "jasonos_prime_worker_mesh_status.json")) || {};
    const quietTasks = readJson(path.join(PUBLIC, "jasonos_prime_quiet_tasks_status.json")) || {};
    const findings = [];
    if (workerMesh.status && String(workerMesh.status).indexOf("RETIRED") < 0) {
      findings.push({ component: "JasonOS_Prime_WorkerMesh", status: workerMesh.status, finding: "retired_component_status_not_retired" });
    }
    if (quietTasks.status && String(quietTasks.status).indexOf("RETIRED") < 0) {
      findings.push({ component: "JasonOS_Prime_QuietTasks_InstallOrUpdate", status: quietTasks.status, finding: "retired_component_status_not_retired" });
    }
    const status = {
      component: "jasonos_prime_retired_task_compliance",
      status: findings.length ? "REVIEW_LEGACY_REAPPEARANCE_OR_STALE_STATUS" : "PASS",
      updated_utc: nowIso(),
      checked_sources: [
        "legacy_retirement_manifest",
        "jasonos_prime_worker_mesh_status.json",
        "jasonos_prime_quiet_tasks_status.json"
      ],
      findings,
      automatic_action: findings.length ? "incident_recorded_no_task_mutation" : "none",
      no_task_mutation_performed: true
    };
    writeJson(RETIRED_TASK_COMPLIANCE_JSON, status);
    writeText(RETIRED_TASK_COMPLIANCE_MD, [
      "# Retired Task Compliance",
      "",
      "- Updated UTC: " + status.updated_utc,
      "- Status: " + status.status,
      "- Findings: " + findings.length,
      "- No task mutation performed: true",
      "",
      ...findings.map((item) => "- " + item.component + ": " + item.finding + " (" + item.status + ")")
    ].join("\r\n"));
    this.recordManagedJob("retired_task_compliance_audit", status.status, { finding_count: findings.length, findings });
  }

  launchHealthMonitor() {
    const health = this.launchHealthSummary();
    this.evaluateFailsafes();
    this.recordManagedJob("launch_health_monitor", health.degraded_required ? "DEGRADED_MODE_REQUIRED" : "PASS", { health });
  }

  handsOffOperatorCycle() {
    const pause = this.pauseState();
    const safety = this.currentSafetySnapshot();
    const launchHealth = this.launchHealthSummary();
    const incidents = readJson(INCIDENTS_JSON) || {};
    const incident = Array.isArray(incidents.incidents) ? incidents.incidents[0] || {} : {};
    const playbook = incident.playbook || {};
    const userProbe = playbook.user_context_probe || {};
    const timingPlan = readJson(MATERIALIZED_QA_TIMING_PLAN_JSON) || {};
    const timingResults = readJson(MATERIALIZED_QA_TIMING_RESULTS_JSON) || {};
    const plexMapComparison = readJson(PLEX_METADATA_WEBDAV_MAP_COMPARISON_JSON) || {};
    const delivery = readJson(path.join(PUBLIC, "jasonos_prime_grok_report_delivery_status.json")) || {};
    const instructionLoop = this.instructionLoopSummary();
    const previous = readJson(HANDS_OFF_STATUS_JSON) || {};
    const activeIncident = String(incident.status || "").indexOf("ACTIVE") === 0;
    const materializedQaReview = String(safety.materialized_qa_status).toUpperCase() === "REVIEW" && Number(safety.materialized_qa_failed || 0) > 0;
    const sentinelHigh = String(safety.sentinel_status).toUpperCase() === "ALERT" && String(safety.sentinel_alert).toUpperCase() === "HIGH";
    const launchDegraded = launchHealth.degraded_required === true || this.degradedMode === true;
    const publicationPauseMissing = pause.pause_publication !== true;
    const semanticSignature = [
      "qa=" + safety.materialized_qa_status + ":" + safety.materialized_qa_passed + "/" + safety.materialized_qa_checked + ":" + safety.materialized_qa_failed,
      "incident=" + (incident.status || "") + ":" + (playbook.status || ""),
      "user_probe=" + (userProbe.status || "") + ":" + (userProbe.ok_count || 0) + "/" + (userProbe.probed || 0) + ":" + (userProbe.timeout_count || 0),
      "timing_plan=" + (timingPlan.status || "") + ":" + (timingPlan.sample_count || 0),
      "timing_results=" + (timingResults.status || "") + ":" + ((timingResults.summary && timingResults.summary.probed) || 0) + ":" + ((timingResults.summary && timingResults.summary.plex_metadata_timeout_count) || 0),
      "plex_map_comparison=" + (plexMapComparison.status || "") + ":" + ((plexMapComparison.summary && plexMapComparison.summary.expected_part_match_count) || 0),
      "delivery=" + (delivery.status || "") + ":" + (delivery.delivery_mode || ""),
      "instruction_loop=" + (instructionLoop.status || "")
    ].join("|");
    const progressMade = previous.progress_signature !== semanticSignature;
    const noProgressCycles = progressMade ? 0 : Number(previous.no_progress_cycles || 0) + 1;
    const actions = [];
    const queuedJobs = [];
    const blockers = [];
    const timingPlanReady = String(timingPlan.status || "").indexOf("PASS_PLAN_READY") === 0;
    const timingResultsDone = String(timingResults.status || "").indexOf("PASS_TINY_TIMING") === 0;
    const timingResultFresh = timingResultsDone && timingPlan.updated_utc && timingResults.updated_utc &&
      Date.parse(timingResults.updated_utc) >= Date.parse(timingPlan.updated_utc);
    const plexMapComparisonDone = String(plexMapComparison.status || "").indexOf("PASS_SAME_SAMPLE_METADATA_COMPARISON") === 0;
    const plexMapComparisonFresh = plexMapComparisonDone && timingResults.updated_utc && plexMapComparison.updated_utc &&
      Date.parse(plexMapComparison.updated_utc) >= Date.parse(timingResults.updated_utc);

    if (publicationPauseMissing) {
      blockers.push("PAUSE_PUBLICATION missing; publication state changes require escalation.");
    }
    if (sentinelHigh) {
      blockers.push("Sentinel ALERT/HIGH; autonomous work held.");
    }
    if (launchDegraded) {
      blockers.push("Process launch health degraded; non-critical work throttled.");
      this.setDegradedMode(true, "hands_off_operator_cycle_launch_health_degraded avg_ms=" + launchHealth.avg_spawn_latency_ms + " timeout_rate=" + launchHealth.timeout_rate);
    }

    const canQueueSafeControlWork = !publicationPauseMissing && !sentinelHigh && !launchDegraded && !pause.pause_all && !pause.safe_mode;
    if (canQueueSafeControlWork) {
      if (materializedQaReview) {
        queuedJobs.push({
          type: "autonomous_incident_manager",
          id: this.enqueueUnique("autonomous_incident_manager", "control", 27, {
            source: "hands_off_operator_cycle",
            reason: "standing_objective_refresh_active_materialized_qa_incident"
          })
        });
      }
      if (materializedQaReview && Number(userProbe.ok_count || 0) > 0 && String(timingPlan.status || "").indexOf("PASS_PLAN_READY") !== 0) {
        queuedJobs.push({
          type: "plan_materialized_qa_decision_timing_probe",
          id: this.enqueueUnique("plan_materialized_qa_decision_timing_probe", "control", 24, {
            source: "hands_off_operator_cycle",
            reason: "path_confirmed_prepare_next_tiny_decision_timing_diagnostic"
          })
        });
      }
      if (materializedQaReview && Number(userProbe.ok_count || 0) > 0 && timingPlanReady && !timingResultFresh) {
        queuedJobs.push({
          type: "run_materialized_qa_decision_timing_probe",
          id: this.enqueueUnique("run_materialized_qa_decision_timing_probe", "control", 26, {
            source: "hands_off_operator_cycle",
            reason: "execute_confirmed_tiny_decision_timing_diagnostic"
          })
        });
      }
      if (materializedQaReview && timingResultFresh && !plexMapComparisonFresh) {
        queuedJobs.push({
          type: "run_plex_metadata_vs_webdav_map_comparison",
          id: this.enqueueUnique("run_plex_metadata_vs_webdav_map_comparison", "control", 25, {
            source: "hands_off_operator_cycle",
            reason: "compare_plex_metadata_paths_against_webdav_map_for_confirmed_sample"
          })
        });
      }
      const reportAgeMs = delivery.updated_utc ? Date.now() - Date.parse(delivery.updated_utc) : Number.POSITIVE_INFINITY;
      if (!Number.isFinite(reportAgeMs) || reportAgeMs > CONFIG.handsOffCycleCadenceSeconds * 1000) {
        queuedJobs.push({
          type: "generate_grok_cycle_report",
          id: this.enqueueUnique("generate_grok_cycle_report", "control", 100, {
            source: "hands_off_operator_cycle",
            reason: "status_changed_or_report_due"
          })
        });
        queuedJobs.push({
          type: "deliver_grok_cycle_report",
          id: this.enqueueUnique("deliver_grok_cycle_report", "io", 105, {
            source: "hands_off_operator_cycle",
            reason: "status_changed_or_report_due"
          })
        });
      }
    }

    if (queuedJobs.length > 0) {
      actions.push("Queued safe bounded control-plane jobs: " + queuedJobs.map((job) => job.type).join(", "));
    }
    if (materializedQaReview && Number(userProbe.ok_count || 0) > 0) {
      actions.push("Maintaining Materialized QA recovery as a standing objective using Strategy A path model.");
    }

    const noProgressEscalation = noProgressCycles >= CONFIG.handsOffNoProgressEscalationCycles;
    const escalationRequired = publicationPauseMissing || sentinelHigh || noProgressEscalation || safety.jason_action_required === true || safety.codex_action_required === true;
    const status = {
      component: "jasonos_prime_hands_off_operation",
      schema_version: "jasonos.hands_off_operation.v1",
      status: escalationRequired ? "REVIEW_ESCALATION_REQUIRED" : "PASS_ACTIVE_TRUE_HANDS_OFF",
      operating_model: "TRUE_HANDS_OFF_ACTIVE_PERMANENT",
      updated_utc: nowIso(),
      external_input_policy: "exception_only",
      primary_operator: "JasonOS_Prime_Orchestrator",
      grok_role: "occasional_high_level_strategy_and_periodic_review",
      jason_role: "exception_only_for_hard_blockers_permissions_credentials_major_decisions",
      standing_proactive_authority: true,
      hard_limits: {
        pause_publication_must_remain_active: true,
        no_broad_cleanup_deletion_path_rewrites_publication_or_large_retries: true,
        process_launch_avg_ms_threshold: CONFIG.launchAvgThresholdMs,
        process_launch_timeout_rate_threshold: CONFIG.launchTimeoutRateThreshold,
        destructive_or_high_blast_radius_actions_autonomous: false
      },
      safety_snapshot: safety,
      launch_health: launchHealth,
      degraded_mode: {
        active: this.degradedMode === true,
        reason: this.degradedReason || ""
      },
      objectives: [
        {
          id: "OBJ-MQA-RECOVERY",
          title: "Recover Materialized QA without publication or destructive changes",
          status: materializedQaReview ? "ACTIVE" : "MONITORING",
          current_blocker: materializedQaReview ? "Materialized QA REVIEW " + safety.materialized_qa_passed + "/" + safety.materialized_qa_checked + " failed=" + safety.materialized_qa_failed : "none",
          strategy: "Strategy A metadata-first service context plus controlled user-context probes",
          next_safe_action: timingResultFresh ? "Evaluate tiny timing diagnostic results and plan only QA-only reversible mitigation." : (String(timingPlan.status || "").indexOf("PASS_PLAN_READY") === 0 ? "Execute only a tiny detached Plex decision/indexing timing diagnostic if gates remain clear." : "Prepare tiny bounded Plex decision/indexing timing diagnostic plan."),
          progress_signal: playbook.status || ""
        },
        {
          id: "OBJ-CONTROL-HEALTH",
          title: "Maintain stable control plane and launch health",
          status: launchDegraded ? "DEGRADED" : "PASS",
          next_safe_action: launchDegraded ? "Throttle non-critical launches." : "Continue launch health monitor cadence."
        },
        {
          id: "OBJ-GROK-LOOP",
          title: "Maintain autonomous Grok reporting and safe inbound instruction loop",
          status: delivery.status || instructionLoop.status || "UNKNOWN",
          next_safe_action: "Continue differential reporting and execute only Safe allowlisted instructions."
        },
        {
          id: "OBJ-LEGACY-SAFETY",
          title: "Keep legacy/direct resolver expansion retired and blocked",
          status: safety.broad_legacy_resolver_expansion_paused ? "PASS" : "REVIEW",
          next_safe_action: "Escalate if any broad legacy/direct resolver expansion resumes."
        }
      ],
      progress_signature: semanticSignature,
      progress_made_this_cycle: progressMade,
      no_progress_cycles: noProgressCycles,
      last_meaningful_progress_utc: progressMade ? nowIso() : (previous.last_meaningful_progress_utc || ""),
      queued_jobs: queuedJobs,
      actions_taken: actions,
      blockers,
      escalation_required: escalationRequired,
      escalation_reason: escalationRequired ? blockers.concat(noProgressEscalation ? ["No semantic progress for " + noProgressCycles + " hands-off cycles."] : []).join("; ") : "",
      no_publication_started: true,
      no_expansion_started: true,
      no_cleanup_performed: true,
      no_source_mutation_performed: true
    };

    writeJson(HANDS_OFF_STATUS_JSON, status);
    writeText(HANDS_OFF_STATUS_MD, [
      "# JasonOS Prime Hands-Off Operation Status",
      "",
      "- Updated UTC: " + status.updated_utc,
      "- Status: " + status.status,
      "- Operating model: " + status.operating_model,
      "- Primary operator: " + status.primary_operator,
      "- External input policy: " + status.external_input_policy,
      "- Escalation required: " + status.escalation_required,
      "- PAUSE_PUBLICATION active: " + pause.pause_publication,
      "- Sentinel: " + safety.sentinel_status + "/" + safety.sentinel_alert,
      "- Materialized QA: " + safety.materialized_qa_status + " " + safety.materialized_qa_passed + "/" + safety.materialized_qa_checked + ", failed=" + safety.materialized_qa_failed,
      "- Launch degraded: " + launchDegraded,
      "- Progress made this cycle: " + progressMade,
      "- No-progress cycles: " + noProgressCycles,
      "",
      "## Standing Objectives",
      "",
      ...status.objectives.map((item) => "- `" + item.id + "` " + item.status + " - " + item.title + "; next: " + item.next_safe_action),
      "",
      "## Actions Taken",
      "",
      ...(actions.length ? actions.map((item) => "- " + item) : ["- No new action needed this cycle."]),
      "",
      "## Blockers",
      "",
      ...(blockers.length ? blockers.map((item) => "- " + item) : ["- None requiring Jason action."]),
      "",
      "No publication, expansion, cleanup, deletion, path rewrite, source mutation, or broad QA retry was performed."
    ].join("\r\n"));
    appendJsonl(HANDS_OFF_HISTORY_JSONL, {
      updated_utc: status.updated_utc,
      status: status.status,
      progress_signature: status.progress_signature,
      progress_made_this_cycle: status.progress_made_this_cycle,
      no_progress_cycles: status.no_progress_cycles,
      queued_jobs: queuedJobs,
      escalation_required: status.escalation_required
    });
    this.recordManagedJob("hands_off_operator_cycle", status.status, {
      escalation_required: status.escalation_required,
      no_progress_cycles: status.no_progress_cycles,
      queued_job_count: queuedJobs.length,
      operating_model: status.operating_model
    });
  }

  planMaterializedQaDecisionTimingProbe() {
    const pause = this.pauseState();
    const safety = this.currentSafetySnapshot();
    const launchHealth = this.launchHealthSummary();
    const userProbe = readJson(MATERIALIZED_USER_CONTEXT_PROBE_JSON) || {};
    const results = Array.isArray(userProbe.results) ? userProbe.results : [];
    const sentinelHigh = String(safety.sentinel_status).toUpperCase() === "ALERT" && String(safety.sentinel_alert).toUpperCase() === "HIGH";
    const launchDegraded = launchHealth.degraded_required === true || this.degradedMode === true;
    let status = "PASS_PLAN_READY_STATUS_ONLY";
    const blockers = [];
    if (pause.pause_publication !== true) {
      status = "HELD_PAUSE_PUBLICATION_MISSING";
      blockers.push("PAUSE_PUBLICATION is not active.");
    }
    if (sentinelHigh) {
      status = "HELD_SENTINEL_ALERT_HIGH";
      blockers.push("Sentinel is ALERT/HIGH.");
    }
    if (launchDegraded) {
      status = "HELD_LAUNCH_HEALTH_DEGRADED";
      blockers.push("Launch health is degraded.");
    }
    if (!results.length) {
      status = "HELD_USER_CONTEXT_SAMPLE_MISSING";
      blockers.push("No user-context probe sample is available.");
    }
    const samples = results
      .filter((row) => row && row.child && row.child.ok === true)
      .slice(0, 8)
      .map((row) => {
        const parsed = row.child && row.child.parsed ? row.child.parsed : {};
        const streamStat = parsed.probes && parsed.probes.stream_file_stat ? parsed.probes.stream_file_stat : {};
        const streamValue = streamStat.value || {};
        return {
          title: row.title || "",
          section_id: row.section_id || null,
          target_hash: row.target_hash || "",
          prior_reason: row.prior_reason || "",
          target_link: row.target_link || "",
          file: row.file || "",
          user_context_elapsed_ms: row.child.elapsed_ms || null,
          file_stat_ms: streamStat.elapsed_ms || 0,
          size_bytes: streamValue.size || null,
          layer_assessment: row.child.layer_assessment || parsed.layer_assessment || ""
        };
      });
    if (status === "PASS_PLAN_READY_STATUS_ONLY" && samples.length === 0) {
      status = "HELD_NO_SUCCESSFUL_USER_CONTEXT_SAMPLES";
      blockers.push("User-context probe exists but has no successful sampled path.");
    }
    const plan = {
      component: "jasonos_prime_materialized_qa_decision_timing_probe_plan",
      schema_version: "jasonos.materialized_qa_timing_plan.v1",
      status,
      updated_utc: nowIso(),
      incident_id: "INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610",
      purpose: "Prepare the next tiny bounded Plex decision/indexing timing diagnostic after path presence was confirmed from user context.",
      read_only: true,
      execution_status: "not_executed_plan_only",
      sample_count: samples.length,
      samples,
      preconditions: [
        "PAUSE_PUBLICATION remains active",
        "Sentinel is not ALERT/HIGH",
        "process launch health is below degraded thresholds",
        "max concurrency is 1",
        "max paths is 8",
        "diagnostic remains detached/status-only"
      ],
      constraints: {
        max_paths: 8,
        max_concurrency: 1,
        broad_retest_allowed: false,
        publication_allowed: false,
        cleanup_allowed: false,
        source_mutation_allowed: false,
        path_rewrite_allowed: false,
        inline_plex_decision_qa_allowed: false
      },
      recommended_next_action: status === "PASS_PLAN_READY_STATUS_ONLY"
        ? "Implement or run only a detached tiny Plex decision/indexing timing diagnostic against this sample if gates remain clear."
        : "Hold diagnostic execution until blockers clear.",
      blockers,
      safety_snapshot: safety,
      launch_health: launchHealth,
      no_publication_started: true,
      no_expansion_started: true,
      no_cleanup_performed: true,
      no_source_mutation_performed: true
    };
    writeJson(MATERIALIZED_QA_TIMING_PLAN_JSON, plan);
    writeText(MATERIALIZED_QA_TIMING_PLAN_MD, [
      "# Materialized QA Decision Timing Probe Plan",
      "",
      "- Updated UTC: " + plan.updated_utc,
      "- Status: " + plan.status,
      "- Incident: " + plan.incident_id,
      "- Execution status: " + plan.execution_status,
      "- Sample count: " + plan.sample_count,
      "- Recommended next action: " + plan.recommended_next_action,
      "",
      "## Samples",
      "",
      ...samples.map((item) => "- `" + item.title + "` / `" + item.target_hash + "` / elapsed `" + item.user_context_elapsed_ms + "ms` / size `" + item.size_bytes + "`"),
      "",
      "## Blockers",
      "",
      ...(blockers.length ? blockers.map((item) => "- " + item) : ["- None."]),
      "",
      "No publication, expansion, cleanup, deletion, path rewrite, source mutation, or broad QA retry was performed."
    ].join("\r\n"));
    this.recordManagedJob("materialized_qa_decision_timing_probe_plan", status, {
      sample_count: samples.length,
      blockers,
      no_publication_started: true,
      no_source_mutation_performed: true
    });
  }

  currentSafetySnapshot() {
    const dashboard = readJson(path.join(PUBLIC, "jasonos_prime_outcome_dashboard.json")) || {};
    const truth = dashboard.truth_metrics || {};
    const sentinel = dashboard.sentinel_status || {};
    return {
      dashboard_updated_utc: dashboard.updated_utc || "",
      sentinel_status: sentinel.status || "",
      sentinel_alert: sentinel.alert_level || "",
      codex_action_required: sentinel.codex_action_required === true,
      jason_action_required: dashboard.jason_action_required === true || sentinel.jason_action_required === true,
      materialized_qa_status: truth.materialized_canary_decision_qa_status || "",
      materialized_qa_checked: truth.materialized_canary_decision_qa_checked || 0,
      materialized_qa_passed: truth.materialized_canary_decision_qa_passed || 0,
      materialized_qa_failed: truth.materialized_canary_decision_qa_failed || 0,
      controlled_materialized_expansion_eligible: truth.controlled_materialized_expansion_eligible === true,
      broad_legacy_resolver_expansion_paused: truth.broad_legacy_resolver_expansion_paused !== false
    };
  }

  safetyAllowsControlJob() {
    const safety = this.currentSafetySnapshot();
    return !(String(safety.sentinel_status).toUpperCase() === "ALERT" && String(safety.sentinel_alert).toUpperCase() === "HIGH");
  }

  materializedQaPasses() {
    const safety = this.currentSafetySnapshot();
    return String(safety.materialized_qa_status).toUpperCase() === "PASS" && Number(safety.materialized_qa_failed || 0) === 0;
  }

  recordManagedJob(name, status, detail) {
    const current = readJson(MANAGED_JOBS_STATUS) || {
      component: "jasonos_prime_orchestrator_managed_jobs",
      jobs: {}
    };
    current.updated_utc = nowIso();
    current.status = "PASS";
    current.jobs[name] = Object.assign({
      updated_utc: nowIso(),
      status
    }, detail || {});
    writeJson(MANAGED_JOBS_STATUS, current);
  }

  recordLaunch(kind, name, detail) {
    const record = Object.assign({
      ts_utc: nowIso(),
      kind,
      name
    }, detail || {});
    if (record.error && /timed out|timeout/i.test(String(record.error))) record.timed_out = true;
    if (record.exit_code === null && record.error) record.timed_out = /timed out|timeout/i.test(String(record.error));
    this.launchTelemetry.updated_utc = nowIso();
    this.launchTelemetry.process_launches_total += 1;
    if (kind === "spawn_sync") this.launchTelemetry.spawn_sync_total += 1;
    if (kind === "spawn_detached") this.launchTelemetry.spawn_detached_total += 1;
    this.launchTelemetry.recent_launches.push(record);
    if (this.launchTelemetry.recent_launches.length > CONFIG.launchRecentWindowSize) {
      this.launchTelemetry.recent_launches = this.launchTelemetry.recent_launches.slice(-CONFIG.launchRecentWindowSize);
    }
    this.launchTelemetry.health = this.launchHealthSummary();
    this.launchTelemetry.degraded_mode = this.degradedMode === true;
    this.launchTelemetry.degraded_reason = this.degradedReason || "";
    this.launchTelemetry.tracked_children = this.trackedChildren.slice(-20);
    this.launchTelemetry.failsafe_events = this.failsafeEvents.slice(-20);
  }

  writeLaunchTelemetry() {
    this.launchTelemetry.updated_utc = nowIso();
    this.launchTelemetry.health = this.launchHealthSummary();
    this.launchTelemetry.degraded_mode = this.degradedMode === true;
    this.launchTelemetry.degraded_reason = this.degradedReason || "";
    this.launchTelemetry.tracked_children = this.trackedChildren.slice(-20);
    this.launchTelemetry.failsafe_events = this.failsafeEvents.slice(-20);
    writeJson(LAUNCH_TELEMETRY, this.launchTelemetry);
  }

  scarflixStatusSnapshot() {
    const safety = this.currentSafetySnapshot();
    const dashboard = readJson(path.join(PUBLIC, "jasonos_prime_outcome_dashboard.json")) || {};
    const status = {
      component: "jasonos_prime_orchestrator_scarflix_status_jobs",
      status: "PASS",
      updated_utc: nowIso(),
      mode: "status_only_no_expansion",
      publication_pause_respected: true,
      legacy_direct_resolver_expansion_allowed: false,
      materialized_qa_status: safety.materialized_qa_status,
      materialized_checked: safety.materialized_qa_checked,
      materialized_passed: safety.materialized_qa_passed,
      materialized_failed: safety.materialized_qa_failed,
      expansion_action: this.materializedQaPasses() ? "ELIGIBLE_FOR_FUTURE_CONTROLLED_ORCHESTRATOR_JOB" : "HELD_MATERIALIZED_QA_NOT_PASS",
      sentinel_status: safety.sentinel_status,
      sentinel_alert: safety.sentinel_alert,
      current_milestone: dashboard.current_milestone || "",
      no_heavy_validation_started: true,
      no_publisher_started: true
    };
    writeJson(SCARFLIX_STATUS_JOBS, status);
  }

  materializedQaIncidentHypothesisLedger(context) {
    const ctx = context || {};
    const safety = ctx.safety || {};
    const triage = ctx.triage || {};
    const probe = ctx.probe || {};
    const userProbe = ctx.userProbe || {};
    const incident = ctx.incident || {};
    const timingResults = ctx.timingResults || {};
    const plexMapComparison = ctx.plexMapComparison || {};
    const timingSummary = timingResults.summary || {};
    const plexMapSummary = plexMapComparison.summary || {};
    const reasonCounts = Array.isArray(triage.failure_reason_counts) ? triage.failure_reason_counts : [];
    const sectionCounts = Array.isArray(triage.failure_section_counts) ? triage.failure_section_counts : [];
    const pathCounts = Array.isArray(triage.failure_path_category_counts) ? triage.failure_path_category_counts : [];
    const timeoutCount = (reasonCounts.find((item) => String(item.key).toLowerCase() === "timeout") || {}).count || 0;
    const section5Count = (sectionCounts.find((item) => String(item.key) === "5") || {}).count || 0;
    const hybridLiveCount = (pathCounts.find((item) => item.key === "hybrid_movies_live") || {}).count || 0;
    const serviceProbeSummary = probe.probe_summary || {};
    const serviceLayerCounts = Array.isArray(serviceProbeSummary.layer_counts) ? serviceProbeSummary.layer_counts : [];
    const serviceInaccessible = (serviceLayerCounts.find((item) => item.key === "service_context_symlink_target_mount_inaccessible" || item.key === "host_or_visibility_path_inaccessible") || {}).count || 0;
    const serviceProbed = Number(serviceProbeSummary.probed || 0);
    const userSummary = userProbe.summary || {};
    const userOk = Number(userSummary.ok_count || 0);
    const userProbed = Number(userSummary.probed || 0);
    const userTimeouts = Number(userSummary.timeout_count || 0);
    const timingRan = String(timingResults.status || "").indexOf("PASS_TINY_TIMING") === 0;
    const timingServiceInaccessible = Number(timingSummary.service_context_inaccessible_count || 0);
    const timingUserOk = Number(timingSummary.user_context_ok_count || 0);
    const timingWebdav2xx = Number(timingSummary.webdav_head_2xx_count || 0);
    const timingWebdavTimeouts = Number(timingSummary.webdav_head_timeout_count || 0);
    const timingPlex2xx = Number(timingSummary.plex_metadata_2xx_count || 0);
    const timingPlexTimeouts = Number(timingSummary.plex_metadata_timeout_count || 0);
    const timingPlexMatches = Number(timingSummary.plex_metadata_matching_part_count || 0);
    const timingProbed = Number(timingSummary.probed || 0);
    const plexMapRan = String(plexMapComparison.status || "").indexOf("PASS_SAME_SAMPLE_METADATA_COMPARISON") === 0;
    const plexMapProbed = Number(plexMapSummary.probed || 0);
    const plexMapExpectedMatches = Number(plexMapSummary.expected_part_match_count || 0);
    const plexMapSameSectionMismatch = Number(plexMapSummary.same_section_path_mismatch_count || 0);
    const plexMapSameSectionNoPart = Number(plexMapSummary.same_section_row_without_part_count || 0);
    const plexMapNotIndexed = Number(plexMapSummary.title_not_found_or_not_indexed_count || 0);
    const plexMapRowsWithParts = Number(plexMapSummary.rows_with_part_files_count || 0);
    const qaLabel = String(safety.materialized_qa_status || "") + " " + safety.materialized_qa_passed + "/" + safety.materialized_qa_checked + " failed=" + safety.materialized_qa_failed;
    const hypotheses = [
      {
        id: "H1_SERVICE_CONTEXT_PATH_VISIBILITY",
        hypothesis: "Service-context path visibility or symlink target resolution fails because the Orchestrator service context cannot reliably follow user-session S: rclone mount targets.",
        confidence: (userOk > 0 && serviceInaccessible > 0) || (timingRan && timingServiceInaccessible > 0 && timingUserOk > 0) ? "HIGH" : "MEDIUM",
        confidence_score: (userOk > 0 && serviceInaccessible > 0) || (timingRan && timingServiceInaccessible > 0 && timingUserOk > 0) ? 0.9 : 0.55,
        evidence_for: [
          "Service-context probe classified " + serviceInaccessible + "/" + serviceProbed + " sampled paths as service/host visibility inaccessible.",
          "User-context tiny probe statted " + userOk + "/" + userProbed + " sampled target stream files with " + userTimeouts + " timeouts.",
          "Known path model: D:\\StremioCatalog ScarFLIX_part entries are directory symlinks to S:\\media, while S: is maintained in user context.",
          timingRan ? "Timing probe reconfirmed service-context inaccessible paths " + timingServiceInaccessible + "/" + timingProbed + " while user-context evidence remained OK for " + timingUserOk + "/" + timingProbed + "." : "Timing probe not yet executed."
        ],
        evidence_against: [
          "This explains service-context diagnostics, but not by itself why Plex/materialized decision QA timed out once Plex-visible rows existed.",
          "User-context probe confirms sampled files exist, so the Materialized QA failure cannot be reduced to missing files."
        ],
        next_bounded_test: "Keep service diagnostics metadata-first. Use only controlled user-context samples for target-follow evidence; do not attempt service/system rclone mount changes in this incident.",
        allowed_actions: ["metadata_first_path_resolution", "tiny_user_context_probe"],
        forbidden_actions: ["system_rclone_mount_change", "service_account_rights_change", "path_rewrite", "publication_change"]
      },
      {
        id: "H2_RESOLVER_INDEXING_TIMING_LOAD",
        hypothesis: "Resolver, Plex indexing, or decision timing is load-sensitive for hybrid_movies_live paths after files are present.",
        confidence: plexMapRan && plexMapNotIndexed > 0 ? "MEDIUM_HIGH" : (timingRan && (timingPlexTimeouts > 0 || timingPlex2xx === 0) ? "HIGH" : (timeoutCount >= 100 && userOk > 0 ? "MEDIUM" : "MEDIUM")),
        confidence_score: plexMapRan && plexMapNotIndexed > 0 ? 0.68 : (timingRan && (timingPlexTimeouts > 0 || timingPlex2xx === 0) ? 0.82 : (timeoutCount >= 100 && userOk > 0 ? 0.56 : 0.5)),
        evidence_for: [
          "Materialized QA is " + qaLabel + " with " + timeoutCount + " timeout-class failures.",
          "Timeouts are concentrated in Movies section 5 and hybrid_movies_live paths.",
          "User-context file stat succeeded for sampled rows, moving suspicion toward Plex decision/indexing/load timing.",
          timingRan ? "Timing probe Plex metadata result: 2xx=" + timingPlex2xx + "/" + timingProbed + ", timeouts=" + timingPlexTimeouts + "." : "Timing probe not yet executed.",
          plexMapRan ? "Plex metadata comparison found not-indexed/not-found samples=" + plexMapNotIndexed + "/" + plexMapProbed + "." : "Plex metadata comparison not yet executed."
        ],
        evidence_against: [
          timingRan ? "Timing probe did not run full Materialized PlexDecisionQA, so this remains a diagnostic signal rather than a gate result." : "A dedicated Plex decision/indexing timing diagnostic has not yet run on the confirmed sample.",
          "Some rows passed in the same QA set, so timing may be path-family-specific rather than globally systemic."
        ],
        next_bounded_test: plexMapRan ? "Use Plex metadata comparison evidence to plan a QA-only reconciliation diagnostic; do not broaden QA yet." : "Run a detached tiny Plex decision/indexing timing diagnostic against the confirmed 8-path sample, max concurrency 1, status-only, no publication.",
        allowed_actions: ["detached_tiny_decision_timing_diagnostic", "status_only_result_logging"],
        forbidden_actions: ["inline_plex_decision_qa", "full_materialized_qa_retry", "publication_change"]
      },
      {
        id: "H3_WEBDAV_RCLONE_LATENCY_UNDER_LOAD",
        hypothesis: "WebDAV or rclone latency under load is causing timeout behavior for large or live-path materialized files.",
        confidence: timingRan && timingWebdavTimeouts === 0 && timingWebdav2xx > 0 ? "LOW_MEDIUM" : (timingWebdavTimeouts > 0 ? "MEDIUM_HIGH" : "MEDIUM"),
        confidence_score: timingRan && timingWebdavTimeouts === 0 && timingWebdav2xx > 0 ? 0.3 : (timingWebdavTimeouts > 0 ? 0.62 : 0.46),
        evidence_for: [
          "Affected paths traverse rclone/WebDAV-backed materialized storage.",
          "The failure mode is timeout-heavy rather than deterministic wrong-path or missing-file failure.",
          "File sizes in the confirmed sample include multi-GB streams.",
          timingRan ? "Timing probe WebDAV HEAD result: 2xx=" + timingWebdav2xx + "/" + timingProbed + ", timeouts=" + timingWebdavTimeouts + "." : "Timing probe not yet executed."
        ],
        evidence_against: [
          "User-context target stat completed quickly for all sampled files.",
          timingRan && timingWebdavTimeouts === 0 ? "WebDAV HEAD did not timeout on the sampled paths." : "No direct WebDAV HEAD/range timing round has been recorded yet for the exact sample."
        ],
        next_bounded_test: "Measure WebDAV HEAD plus optional tiny range timing on the same 8-path sample, concurrency 1, strict timeout, no media read beyond tiny range.",
        allowed_actions: ["webdav_head_timing", "tiny_range_timing"],
        forbidden_actions: ["bulk_get", "large_media_read", "concurrent_load_test_above_2"]
      },
      {
        id: "H4_QA_HARNESS_TIMEOUT_THRESHOLD_MISMATCH",
        hypothesis: "The QA harness timeout threshold is too aggressive for the hybrid_movies_live path family or large-file decision path.",
        confidence: timingRan && timingWebdav2xx === timingProbed && timingPlex2xx === timingProbed ? "MEDIUM_HIGH" : "MEDIUM",
        confidence_score: timingRan && timingWebdav2xx === timingProbed && timingPlex2xx === timingProbed ? 0.6 : 0.42,
        evidence_for: [
          "Timeout is the dominant reported reason.",
          "Affected samples include large files and live-path family rows.",
          "QA target count is broad enough that a fixed timeout mismatch could create clustered REVIEW results."
        ],
        evidence_against: [
          timingRan ? "Timing probe completed without changing QA harness settings; harness tuning remains a planning-only mitigation." : "No controlled reduced-timeout/increased-timeout comparison has been run.",
          "The current evidence does not separate Plex decision timeout from WebDAV/rclone timeout."
        ],
        next_bounded_test: "Read harness timeout config and compare elapsed timing distributions for pass controls versus confirmed fail samples before changing any timeout.",
        allowed_actions: ["read_harness_config", "compare_existing_elapsed_timings"],
        forbidden_actions: ["global_timeout_increase_without_sample_evidence", "full_qa_retry_inline"]
      },
      {
        id: "H5_PLEX_SECTION_CACHE_OR_METADATA_BEHAVIOR",
        hypothesis: "Plex section-specific cache freshness or metadata/path extraction behavior is contributing to the timeout cluster.",
        confidence: plexMapRan && plexMapExpectedMatches === 0 ? "HIGH" : (timingRan && timingPlex2xx > 0 && timingPlexMatches === 0 ? "MEDIUM_HIGH" : (section5Count >= 100 ? "LOW_MEDIUM" : "LOW")),
        confidence_score: plexMapRan && plexMapExpectedMatches === 0 ? 0.86 : (timingRan && timingPlex2xx > 0 && timingPlexMatches === 0 ? 0.62 : (section5Count >= 100 ? 0.35 : 0.2)),
        evidence_for: [
          "Failures are heavily concentrated in Movies section 5.",
          "Playback QA controller previously triggered Plex scans for sections 5 and 6.",
          "Smaller TV section 6 involvement suggests section/path cache behavior still needs control comparison.",
          plexMapRan ? "Plex metadata vs webdav_map comparison expected ScarFLIX_part matches=" + plexMapExpectedMatches + "/" + plexMapProbed + ", same-section mismatches=" + plexMapSameSectionMismatch + ", same-section rows without parts=" + plexMapSameSectionNoPart + ", rows with part files=" + plexMapRowsWithParts + "." : "Plex metadata vs webdav_map comparison not yet executed."
        ],
        evidence_against: [
          "Path family concentration may be stronger than section behavior.",
          timingRan ? "Timing probe Plex path matching result: matching ScarFLIX_part paths=" + timingPlexMatches + "/" + timingProbed + "." : "No Plex metadata path extraction comparison has been completed for known-fail versus known-pass rows.",
          plexMapRan && plexMapExpectedMatches > 0 ? "At least one expected ScarFLIX_part path was visible in Plex metadata, so this is not a universal path mapping failure." : "No evidence yet contradicts the Plex metadata/path mapping mismatch hypothesis."
        ],
        next_bounded_test: plexMapRan ? "Plan targeted QA-only mitigation/reconciliation for Plex metadata/path visibility; escalate before cleanup or mutation." : "Compare Plex metadata path extraction against filesystem/webdav_map paths for the confirmed sample plus known-pass controls, status-only.",
        allowed_actions: ["plex_metadata_path_read", "status_only_path_compare"],
        forbidden_actions: ["plex_library_mutation", "broad_scan_loop", "metadata_rewrite"]
      }
    ];
    const leading = hypotheses.slice().sort((a, b) => b.confidence_score - a.confidence_score).slice(0, 2);
    return {
      component: "scarflix_v2_materialized_qa_incident_hypothesis_ledger",
      schema_version: "scarflix.materialized_qa_incident_ledger.v1",
      incident_id: incident.incident_id || "INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610",
      status: "PASS_FORMALISED_P0_INCIDENT",
      updated_utc: nowIso(),
      p0: true,
      qa_summary: {
        status: safety.materialized_qa_status || "",
        checked: safety.materialized_qa_checked || 0,
        passed: safety.materialized_qa_passed || 0,
        failed: safety.materialized_qa_failed || 0,
        timeout_failures: timeoutCount,
        section_5_failures: section5Count,
        hybrid_movies_live_failures: hybridLiveCount
      },
      leading_hypotheses: leading.map((item) => ({
        id: item.id,
        confidence: item.confidence,
        confidence_score: item.confidence_score,
        next_bounded_test: item.next_bounded_test
      })),
      hypotheses,
      evidence_sources: {
        materialized_qa_status: MATERIALIZED_QA_STATUS,
        triage: MATERIALIZED_QA_TRIAGE_JSON,
        service_context_probe: MATERIALIZED_INCIDENT_PROBE_JSON,
        user_context_probe: MATERIALIZED_USER_CONTEXT_PROBE_JSON,
        timing_plan: MATERIALIZED_QA_TIMING_PLAN_JSON,
        timing_results: MATERIALIZED_QA_TIMING_RESULTS_JSON,
        plex_metadata_vs_webdav_map_comparison: PLEX_METADATA_WEBDAV_MAP_COMPARISON_JSON
      },
      safety_rules: {
        pause_publication_must_remain_active: true,
        no_publication: true,
        no_deletion: true,
        no_cleanup: true,
        no_path_rewrite: true,
        no_broad_retry: true,
        max_bounded_paths_per_round: 30,
        max_diagnostic_concurrency: 2
      },
      next_required_step: "Execute Step 4.2 diagnostic round only through bounded, low-concurrency, read-only/status-only jobs.",
      no_publication_started: true,
      no_cleanup_performed: true,
      no_source_mutation_performed: true
    };
  }

  writeMaterializedQaHypothesisLedger(ledger) {
    writeJson(MATERIALIZED_QA_INCIDENT_LEDGER_JSON, ledger);
    const lines = [
      "# Materialized QA Incident Hypothesis Ledger",
      "",
      "- Updated UTC: " + ledger.updated_utc,
      "- Incident: `" + ledger.incident_id + "`",
      "- Status: " + ledger.status,
      "- P0: " + ledger.p0,
      "- QA: " + ledger.qa_summary.status + " " + ledger.qa_summary.passed + "/" + ledger.qa_summary.checked + ", failed=" + ledger.qa_summary.failed,
      "- Timeout failures: " + ledger.qa_summary.timeout_failures,
      "- Section 5 failures: " + ledger.qa_summary.section_5_failures,
      "- Hybrid movies live failures: " + ledger.qa_summary.hybrid_movies_live_failures,
      "",
      "## Leading Hypotheses",
      "",
      ...ledger.leading_hypotheses.map((item) => "- `" + item.id + "` " + item.confidence + " (" + item.confidence_score + "): " + item.next_bounded_test),
      "",
      "## Hypotheses",
      ""
    ];
    for (const h of ledger.hypotheses || []) {
      lines.push("### " + h.id);
      lines.push("");
      lines.push("- Hypothesis: " + h.hypothesis);
      lines.push("- Confidence: " + h.confidence + " (" + h.confidence_score + ")");
      lines.push("- Next bounded test: " + h.next_bounded_test);
      lines.push("");
      lines.push("Evidence for:");
      for (const item of h.evidence_for || []) lines.push("- " + item);
      lines.push("");
      lines.push("Evidence against:");
      for (const item of h.evidence_against || []) lines.push("- " + item);
      lines.push("");
    }
    lines.push("## Safety");
    lines.push("");
    lines.push("- `PAUSE_PUBLICATION` remains required.");
    lines.push("- No publication, deletion, cleanup, path rewrite, source mutation, broad retry, or inline full QA is authorized by this ledger.");
    lines.push("");
    writeText(MATERIALIZED_QA_INCIDENT_LEDGER_MD, lines.join("\r\n"));
  }

  autonomousIncidentManager() {
    const safety = this.currentSafetySnapshot();
    const triage = readJson(MATERIALIZED_QA_TRIAGE_JSON) || {};
    const probe = readJson(MATERIALIZED_INCIDENT_PROBE_JSON) || {};
    const userProbe = readJson(MATERIALIZED_USER_CONTEXT_PROBE_JSON) || {};
    const timingResults = readJson(MATERIALIZED_QA_TIMING_RESULTS_JSON) || {};
    const plexMapComparison = readJson(PLEX_METADATA_WEBDAV_MAP_COMPARISON_JSON) || {};
    const reasonCounts = Array.isArray(triage.failure_reason_counts) ? triage.failure_reason_counts : [];
    const sectionCounts = Array.isArray(triage.failure_section_counts) ? triage.failure_section_counts : [];
    const pathCounts = Array.isArray(triage.failure_path_category_counts) ? triage.failure_path_category_counts : [];
    const timeoutCount = (reasonCounts.find((item) => String(item.key).toLowerCase() === "timeout") || {}).count || 0;
    const section5Count = (sectionCounts.find((item) => String(item.key) === "5") || {}).count || 0;
    const hybridLiveCount = (pathCounts.find((item) => item.key === "hybrid_movies_live") || {}).count || 0;
    const active = String(safety.materialized_qa_status).toUpperCase() === "REVIEW" && Number(safety.materialized_qa_failed || 0) > 0;
    const incident = {
      incident_id: "INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610",
      title: "Materialized QA timeout cluster in Movies section 5 / hybrid_movies_live",
      status: active ? "ACTIVE_DIAGNOSE" : "MONITORING",
      severity: active ? "REVIEW" : "PASS",
      updated_utc: nowIso(),
      scope: {
        materialized_qa_status: safety.materialized_qa_status,
        checked: safety.materialized_qa_checked,
        passed: safety.materialized_qa_passed,
        failed: safety.materialized_qa_failed,
        timeout_failures: timeoutCount,
        section_5_failures: section5Count,
        hybrid_movies_live_failures: hybridLiveCount
      },
      hypothesis: timeoutCount >= 100 && section5Count >= 100 && hybridLiveCount >= 100
        ? "Systemic timing/indexing/load issue is more likely than 100+ distinct bad titles."
        : "Failure set needs more evidence before separating transient timeout from source-specific rows.",
      retry_budget: {
        max_attempts: 3,
        used_attempts: 0,
        next_attempt_requires: "explicit detached bounded retest approval after launch health remains stable and PAUSE_PUBLICATION remains active"
      },
      allowed_actions: [
        "read_status_files",
        "bounded_diagnostics",
        "tiny_user_context_path_probe",
        "launch_throttling",
        "degraded_mode",
        "source_only_cleanup_plan"
      ],
      blocked_actions: [
        "publication",
        "broad_expansion",
        "file_deletion",
        "source_mutation",
        "inline_plex_decision_qa",
        "inline_concurrent_qa",
        "full_catalogue_checks"
      ],
      lifecycle: [
        "detect",
        "diagnose",
        "plan_reversible_mitigation",
        "retest_detached_when_approved",
        "escalate_if_retry_budget_exhausted"
      ],
      preconditions_for_any_mitigation: [
        "PAUSE_PUBLICATION exists",
        "Sentinel is not ALERT/HIGH",
        "cmd launch health is below degraded threshold",
        "mitigation is source-only and reversible",
        "title remains wanted/retryable"
      ],
      postconditions_for_any_mitigation: [
        "no broad publication started",
        "legacy/direct resolver remains paused",
        "affected rows are tracked with reason codes",
        "Grok receives incident update in next cycle"
      ],
      rollback_path: "Revert any future source-only mitigation by restoring the pre-change status backup and removing only the mitigation marker; no catalogue deletion is authorized in this incident.",
      no_changes_performed: true,
      source_files: {
        materialized_qa_status: MATERIALIZED_QA_STATUS,
        triage: MATERIALIZED_QA_TRIAGE_JSON,
        bounded_probe: MATERIALIZED_INCIDENT_PROBE_JSON,
        user_context_probe: MATERIALIZED_USER_CONTEXT_PROBE_JSON,
        hypothesis_ledger: MATERIALIZED_QA_INCIDENT_LEDGER_JSON,
        timing_results: MATERIALIZED_QA_TIMING_RESULTS_JSON,
        plex_metadata_vs_webdav_map_comparison: PLEX_METADATA_WEBDAV_MAP_COMPARISON_JSON
      }
    };
    incident.playbook = {
      status: probe.status || "PENDING_FIRST_BOUNDED_PROBE",
      max_concurrency: 2,
      max_paths_per_probe_batch: 20,
      last_probe_updated_utc: probe.updated_utc || "",
      last_probe_progress_signal: probe.probe_summary ? probe.probe_summary.progress_signal || "" : "",
      last_probe_decision: probe.autonomous_decision ? probe.autonomous_decision.next_action || "" : "",
      second_iteration_run_now: false,
      escalation_triggered: probe.autonomous_decision ? probe.autonomous_decision.escalation_triggered === true : false,
      chosen_path_strategy: "Strategy A - metadata-first service context plus controlled user-context probe",
      user_context_probe: {
        status: userProbe.status || "",
        updated_utc: userProbe.updated_utc || "",
        probed: userProbe.summary ? Number(userProbe.summary.probed || 0) : 0,
        ok_count: userProbe.summary ? Number(userProbe.summary.ok_count || 0) : 0,
        timeout_count: userProbe.summary ? Number(userProbe.summary.timeout_count || 0) : 0,
        decision: userProbe.summary ? userProbe.summary.decision || "" : "",
        layer_counts: userProbe.summary && Array.isArray(userProbe.summary.layer_counts) ? userProbe.summary.layer_counts : []
      },
      timing_probe: {
        status: timingResults.status || "",
        updated_utc: timingResults.updated_utc || "",
        probed: timingResults.summary ? Number(timingResults.summary.probed || 0) : 0,
        service_context_inaccessible_count: timingResults.summary ? Number(timingResults.summary.service_context_inaccessible_count || 0) : 0,
        user_context_ok_count: timingResults.summary ? Number(timingResults.summary.user_context_ok_count || 0) : 0,
        webdav_head_2xx_count: timingResults.summary ? Number(timingResults.summary.webdav_head_2xx_count || 0) : 0,
        plex_metadata_2xx_count: timingResults.summary ? Number(timingResults.summary.plex_metadata_2xx_count || 0) : 0,
        plex_metadata_timeout_count: timingResults.summary ? Number(timingResults.summary.plex_metadata_timeout_count || 0) : 0,
        plex_metadata_matching_part_count: timingResults.summary ? Number(timingResults.summary.plex_metadata_matching_part_count || 0) : 0
      },
      plex_metadata_vs_webdav_map_comparison: {
        status: plexMapComparison.status || "",
        updated_utc: plexMapComparison.updated_utc || "",
        probed: plexMapComparison.summary ? Number(plexMapComparison.summary.probed || 0) : 0,
        expected_part_match_count: plexMapComparison.summary ? Number(plexMapComparison.summary.expected_part_match_count || 0) : 0,
        same_section_path_mismatch_count: plexMapComparison.summary ? Number(plexMapComparison.summary.same_section_path_mismatch_count || 0) : 0,
        same_section_row_without_part_count: plexMapComparison.summary ? Number(plexMapComparison.summary.same_section_row_without_part_count || 0) : 0,
        title_not_found_or_not_indexed_count: plexMapComparison.summary ? Number(plexMapComparison.summary.title_not_found_or_not_indexed_count || 0) : 0,
        classification_counts: plexMapComparison.summary && Array.isArray(plexMapComparison.summary.classification_counts) ? plexMapComparison.summary.classification_counts : []
      }
    };
    const probeMatchesCurrentQa = probe.qa_updated_utc && probe.qa_updated_utc === (triage.qa_summary ? triage.qa_summary.updated_utc : "");
    const launchHealth = this.launchHealthSummary();
    const probeLayerCounts = probe.probe_summary && Array.isArray(probe.probe_summary.layer_counts) ? probe.probe_summary.layer_counts : [];
    const hostInaccessibleCount = (probeLayerCounts.find((item) => item.key === "host_or_visibility_path_inaccessible") || {}).count || 0;
    const serviceSymlinkInaccessibleCount = (probeLayerCounts.find((item) => item.key === "service_context_symlink_target_mount_inaccessible") || {}).count || 0;
    const probedCount = probe.probe_summary ? Number(probe.probe_summary.probed || 0) : 0;
    const allProbedPathsHostInaccessible = probedCount > 0 && (hostInaccessibleCount === probedCount || serviceSymlinkInaccessibleCount === probedCount);
    if (allProbedPathsHostInaccessible) {
      incident.playbook.status = "HOLD_SECOND_ITERATION_SERVICE_CONTEXT_PATH_ACCESS";
      incident.playbook.last_probe_progress_signal = "SERVICE_CONTEXT_PATH_ACCESS_ISSUE";
      incident.playbook.last_probe_decision = "HOLD_SECOND_ITERATION_SERVICE_CONTEXT_PATH_ACCESS";
      incident.playbook.service_context_path_access_issue = true;
    }
    if (incident.playbook.user_context_probe.ok_count > 0) {
      incident.hypothesis = "User-context tiny probe can stat sampled hybrid_movies_live targets, so the materialized files are present from the Plex/materialized mount context. Remaining Materialized QA REVIEW is more likely Plex decision/indexing/load timing than missing files.";
      incident.playbook.status = "ACTIVE_DIAGNOSE_PLEX_DECISION_TIMING_AFTER_PATH_CONFIRMED";
      incident.playbook.path_strategy_locked = true;
      incident.playbook.service_context_path_access_issue = true;
    }
    if (active && !probeMatchesCurrentQa && !launchHealth.degraded_required && this.degradedMode !== true) {
      this.enqueueUnique("run_materialized_qa_incident_probe_cycle", "control", 26, {
        incident_id: incident.incident_id,
        reason: "first_bounded_probe_for_current_materialized_qa_status",
        max_paths: 20,
        max_concurrency: 1
      });
      incident.playbook.status = "QUEUED_FIRST_BOUNDED_PROBE";
    } else if (active && probe.autonomous_decision && probe.autonomous_decision.next_action === "SECOND_ITERATION_ALLOWED_IF_STABLE" && !allProbedPathsHostInaccessible && !launchHealth.degraded_required && this.degradedMode !== true) {
      this.enqueueUnique("run_materialized_qa_incident_probe_cycle", "control", 26, {
        incident_id: incident.incident_id,
        reason: "second_bounded_probe_allowed_by_first_cycle",
        max_paths: 12,
        max_concurrency: 1
      });
      incident.playbook.second_iteration_run_now = true;
    }
    if (incident.playbook.plex_metadata_vs_webdav_map_comparison.probed > 0) {
      incident.hypothesis = "Same-sample Plex metadata comparison found no expected ScarFLIX_part matches in Plex metadata, while WebDAV and Plex metadata endpoints were responsive. Leading cause is Plex metadata/path visibility or indexing/cache mismatch.";
      incident.playbook.status = "ACTIVE_DIAGNOSE_PLEX_METADATA_PATH_MAPPING_MISMATCH";
    }
    const hypothesisLedger = this.materializedQaIncidentHypothesisLedger({ safety, triage, probe, userProbe, timingResults, plexMapComparison, incident });
    this.writeMaterializedQaHypothesisLedger(hypothesisLedger);
    incident.hypothesis_ledger = {
      status: hypothesisLedger.status,
      updated_utc: hypothesisLedger.updated_utc,
      ledger_json: MATERIALIZED_QA_INCIDENT_LEDGER_JSON,
      ledger_md: MATERIALIZED_QA_INCIDENT_LEDGER_MD,
      leading_hypotheses: hypothesisLedger.leading_hypotheses,
      next_required_step: hypothesisLedger.next_required_step
    };
    const incidentStatus = {
      component: "jasonos_prime_autonomous_incident_manager",
      status: active ? "PASS_ACTIVE_INCIDENT_TRACKED" : "PASS_NO_ACTIVE_INCIDENT",
      updated_utc: nowIso(),
      incidents: [incident],
      no_publication_started: true,
      no_source_mutation_performed: true,
      no_cleanup_performed: true
    };
    writeJson(INCIDENTS_JSON, incidentStatus);
    writeText(INCIDENTS_MD, [
      "# JasonOS Prime Autonomous Incidents",
      "",
      "- Updated UTC: " + incidentStatus.updated_utc,
      "- Status: " + incidentStatus.status,
      "- Active incident: " + incident.incident_id,
      "- Incident state: " + incident.status,
      "- Scope: " + incident.scope.passed + "/" + incident.scope.checked + " materialized QA pass, failed=" + incident.scope.failed,
      "- Timeout failures: " + incident.scope.timeout_failures,
      "- Section 5 failures: " + incident.scope.section_5_failures,
      "- Hybrid movies live failures: " + incident.scope.hybrid_movies_live_failures,
      "- Hypothesis: " + incident.hypothesis,
      "- Path strategy: " + incident.playbook.chosen_path_strategy,
      "- User-context probe: " + incident.playbook.user_context_probe.status + ", ok=" + incident.playbook.user_context_probe.ok_count + "/" + incident.playbook.user_context_probe.probed + ", timeouts=" + incident.playbook.user_context_probe.timeout_count,
      "- Timing probe: " + (incident.playbook.timing_probe.status || "not yet run") + ", webdav_2xx=" + incident.playbook.timing_probe.webdav_head_2xx_count + "/" + incident.playbook.timing_probe.probed + ", plex_2xx=" + incident.playbook.timing_probe.plex_metadata_2xx_count + "/" + incident.playbook.timing_probe.probed + ", plex_timeouts=" + incident.playbook.timing_probe.plex_metadata_timeout_count,
      "- Playbook status: " + incident.playbook.status,
      "- Hypothesis ledger: " + incident.hypothesis_ledger.status + " (`" + incident.hypothesis_ledger.ledger_json + "`)",
      "",
      "## Leading Hypotheses",
      "",
      ...incident.hypothesis_ledger.leading_hypotheses.map((item) => "- `" + item.id + "` " + item.confidence + " (" + item.confidence_score + "): " + item.next_bounded_test),
      "",
      "## Blocked Actions",
      "",
      ...incident.blocked_actions.map((item) => "- " + item),
      "",
      "No publication, cleanup, expansion, deletion, or inline QA was performed."
    ].join("\r\n"));
    this.recordManagedJob("autonomous_incident_manager", incidentStatus.status, {
      incident_id: incident.incident_id,
      incident_status: incident.status,
      no_changes_performed: true
    });
  }

  countBy(items, keyFn) {
    const counts = new Map();
    for (const item of items) {
      const key = String(keyFn(item) || "unknown");
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([key, count]) => ({ key, count }))
      .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
  }

  materializedPathCategory(row) {
    const text = String(row.file || row.target_link || row.link || "").replace(/\//g, "\\");
    if (text.indexOf("\\_Hybrid\\Shows\\") >= 0) return "hybrid_shows";
    if (text.indexOf("\\_Hybrid\\Movies\\_ScarFLIXLive\\") >= 0) return "hybrid_movies_live";
    if (text.indexOf("\\_Hybrid\\Movies\\") >= 0) return "hybrid_movies_root_seed";
    if (text.indexOf("ScarFLIX_part-") >= 0) return "materialized_other";
    return "unknown";
  }

  compactQaFailure(row) {
    return {
      title: row.title || "",
      section_id: row.section_id || "",
      http_status: row.http_status === undefined || row.http_status === null ? "" : row.http_status,
      reason: row.reason || row.error || "unknown",
      target_hash: row.target_hash || row.hash || "",
      path_category: this.materializedPathCategory(row),
      target_link: row.target_link || row.link || ""
    };
  }

  renderCountTable(title, rows) {
    const lines = ["", "## " + title, "", "| Value | Count |", "|---|---:|"];
    if (!rows.length) lines.push("| none | 0 |");
    for (const row of rows) {
      lines.push("| `" + row.key + "` | " + row.count + " |");
    }
    return lines;
  }

  triageMaterializedQaFailures() {
    const qa = readJson(MATERIALIZED_QA_STATUS) || {};
    const safety = this.currentSafetySnapshot();
    const allRows = Array.isArray(qa.results) ? qa.results : (Array.isArray(qa.failures) ? qa.failures : []);
    const failedRows = allRows.filter((row) => String(row.status || "").toUpperCase() !== "PASS");
    const failures = failedRows.map((row) => this.compactQaFailure(row));
    const reasonCounts = this.countBy(failures, (row) => row.reason);
    const httpCounts = this.countBy(failures, (row) => row.http_status === "" ? "unknown" : String(row.http_status));
    const sectionCounts = this.countBy(failures, (row) => row.section_id === "" ? "unknown" : String(row.section_id));
    const pathCategoryCounts = this.countBy(failures, (row) => row.path_category);
    const targetHashCounts = this.countBy(failures, (row) => row.target_hash || "unknown");

    const timeoutCount = reasonCounts.find((row) => row.key.toLowerCase() === "timeout");
    const timeoutFailures = timeoutCount ? timeoutCount.count : 0;
    const patterns = [];
    if (failures.length && timeoutFailures / failures.length >= 0.8) {
      patterns.push("Timeouts dominate the failed set; this looks timing/load/indexing related before it looks like 110 distinct bad titles.");
    }
    const moviesFailure = sectionCounts.find((row) => row.key === "5");
    const tvFailure = sectionCounts.find((row) => row.key === "6");
    if (moviesFailure && moviesFailure.count >= 0.8 * failures.length) {
      patterns.push("Failures are heavily concentrated in Plex movie section 5.");
    }
    if (tvFailure && tvFailure.count > 0) {
      patterns.push("TV failures are present but limited; include TV in any follow-up validation sample.");
    }
    const http400 = reasonCounts.find((row) => row.key === "HTTP 400");
    if (http400 && http400.count > 0) {
      patterns.push("HTTP 400 rows are a small subset and should be treated as likely row/source-specific cleanup candidates.");
    }
    const liveMovies = pathCategoryCounts.find((row) => row.key === "hybrid_movies_live");
    if (liveMovies && liveMovies.count >= 0.8 * failures.length) {
      patterns.push("Most failures are under the live materialized movie path, so the first follow-up should be row/source cleanup planning, not broad expansion.");
    }

    const triage = {
      component: "jasonos_prime_materialized_qa_failure_triage",
      status: "PASS_READ_ONLY_TRIAGE_COMPLETE",
      updated_utc: nowIso(),
      source_status_file: MATERIALIZED_QA_STATUS,
      read_only: true,
      no_catalogue_changes: true,
      no_publication_started: true,
      no_expansion_started: true,
      qa_summary: {
        status: qa.status || "",
        started_utc: qa.started_utc || "",
        ended_utc: qa.ended_utc || "",
        updated_utc: qa.updated_utc || "",
        rows_found: qa.rows_found || qa.target_count || 0,
        checked: qa.checked || 0,
        passed: qa.passed || 0,
        failed: qa.failed || failures.length,
        decision_policy: qa.decision_policy || ""
      },
      failure_reason_counts: reasonCounts,
      failure_http_status_counts: httpCounts,
      failure_section_counts: sectionCounts,
      failure_path_category_counts: pathCategoryCounts,
      repeated_target_hash_counts: targetHashCounts.filter((row) => row.count > 1),
      patterns,
      sample_failures: failures.slice(0, 25),
      safety_snapshot: safety,
      proposed_next_step: "Prepare a reviewable source-only cleanup candidate list from existing failed rows; do not move, hide, publish, or expand until explicitly allowed by safety gates."
    };

    const plan = {
      component: "jasonos_prime_materialized_qa_recovery_plan",
      status: "PLAN_ONLY_NO_CHANGES",
      updated_utc: triage.updated_utc,
      based_on_triage: MATERIALIZED_QA_TRIAGE_JSON,
      smallest_safe_next_step: "Generate a dry-run cleanup candidate list for failed materialized source/release rows, grouped by reason and path, with title retry preserved.",
      reversible_source_only_cleanup_outline: [
        "Keep PAUSE_PUBLICATION active.",
        "Do not add catalogue titles or run publisher jobs.",
        "For confirmed failed source/release rows only, prepare reversible hide/quarantine candidates that preserve wanted titles and retry alternate sources.",
        "Separate timeout-dominant rows from HTTP 400 rows; HTTP 400 rows are stronger cleanup candidates, while timeout rows may need indexing/load-aware retest before action.",
        "After any approved cleanup, rerun targeted materialized QA through detached/local automation, not inline."
      ],
      safety_gates_before_changes: [
        "Sentinel must be PASS/LOW or otherwise explicitly cleared.",
        "Orchestrator health must be PASS.",
        "PAUSE_PUBLICATION must remain active until cleanup is complete and targeted QA returns to PASS.",
        "No broad legacy/direct resolver expansion.",
        "No broad materialized expansion until targeted materialized QA returns PASS and representative concurrent QA remains PASS.",
        "All cleanup candidates must be source-only and reversible; titles remain retryable."
      ],
      not_executed: [
        "No cleanup performed.",
        "No source or catalogue files moved.",
        "No publisher started.",
        "No expansion started.",
        "No QA validation job rerun inline."
      ]
    };

    writeJson(MATERIALIZED_QA_TRIAGE_JSON, triage);
    writeJson(MATERIALIZED_QA_RECOVERY_PLAN_JSON, plan);

    const md = [
      "# Materialized QA Failure Triage",
      "",
      "- Updated UTC: " + triage.updated_utc,
      "- Status: " + triage.status,
      "- Source status file: `" + MATERIALIZED_QA_STATUS + "`",
      "- Read-only: true",
      "- No catalogue changes: true",
      "- No publication started: true",
      "- No expansion started: true",
      "- QA status: " + triage.qa_summary.status,
      "- Checked: " + triage.qa_summary.checked,
      "- Passed: " + triage.qa_summary.passed,
      "- Failed: " + triage.qa_summary.failed,
      "- Decision policy: " + triage.qa_summary.decision_policy,
      ...this.renderCountTable("Failure Reasons", reasonCounts),
      ...this.renderCountTable("HTTP Status Counts", httpCounts),
      ...this.renderCountTable("Plex Section Counts", sectionCounts),
      ...this.renderCountTable("Path Category Counts", pathCategoryCounts),
      "",
      "## Patterns",
      "",
      ...(patterns.length ? patterns.map((item) => "- " + item) : ["- No clear pattern identified beyond current grouped counts."]),
      "",
      "## Proposed Next Step",
      "",
      "- " + triage.proposed_next_step,
      ""
    ].join("\r\n");

    const planMd = [
      "# Materialized QA Recovery Plan",
      "",
      "- Updated UTC: " + plan.updated_utc,
      "- Status: " + plan.status,
      "- Based on triage: `" + MATERIALIZED_QA_TRIAGE_JSON + "`",
      "",
      "## Smallest Safe Next Step",
      "",
      "- " + plan.smallest_safe_next_step,
      "",
      "## Reversible Source-Only Cleanup Outline",
      "",
      ...plan.reversible_source_only_cleanup_outline.map((item) => "- " + item),
      "",
      "## Safety Gates Before Changes",
      "",
      ...plan.safety_gates_before_changes.map((item) => "- " + item),
      "",
      "## Not Executed",
      "",
      ...plan.not_executed.map((item) => "- " + item),
      ""
    ].join("\r\n");

    writeText(MATERIALIZED_QA_TRIAGE_MD, md);
    writeText(MATERIALIZED_QA_RECOVERY_PLAN_MD, planMd);

    this.recordManagedJob("materialized_qa_failure_triage", "PASS_READ_ONLY", {
      triage_json: MATERIALIZED_QA_TRIAGE_JSON,
      triage_md: MATERIALIZED_QA_TRIAGE_MD,
      recovery_plan_json: MATERIALIZED_QA_RECOVERY_PLAN_JSON,
      recovery_plan_md: MATERIALIZED_QA_RECOVERY_PLAN_MD,
      failed: triage.qa_summary.failed,
      reason_counts: reasonCounts,
      no_publication_started: true,
      no_expansion_started: true,
      no_cleanup_executed: true
    });
  }

  grokTokenMode() {
    const names = ["GROK_API_KEY.txt", "XAI_API_KEY.txt", "xai.key", "grok_token.txt"];
    for (const name of names) {
      if (fs.existsSync(path.join(TOKEN_DIR, name))) {
        return { mode: "TOKEN_PRESENT_REPORT_READY_FOR_BRIDGE", token_file_name: name };
      }
    }
    return { mode: "LOCAL_QUEUE_NO_TOKEN", token_file_name: "" };
  }

  sectionHash(value) {
    return crypto.createHash("sha256").update(JSON.stringify(value || {})).digest("hex");
  }

  writeDifferentialGrokReport(report, fullMd) {
    const previous = readJson(REPORT_SECTION_HASHES) || {};
    const sections = {
      safety: report.safety,
      task_reduction_status: report.task_reduction_status,
      managed_jobs: report.managed_jobs,
      grok_instruction_activity: report.grok_instruction_activity,
      hands_off_operation: report.hands_off_operation,
      scarflix_status_job: report.scarflix_status_job,
      materialized_qa_triage: report.materialized_qa_triage,
      materialized_qa_incident_hypothesis_ledger: report.materialized_qa_incident_hypothesis_ledger,
      materialized_qa_timing_plan: report.materialized_qa_timing_plan,
      materialized_qa_timing_results: report.materialized_qa_timing_results,
      plex_metadata_vs_webdav_map_comparison: report.plex_metadata_vs_webdav_map_comparison,
      launch_health: report.launch_health,
      incidents: report.incidents,
      materialized_incident_probe: report.materialized_incident_probe,
      retired_task_compliance: report.retired_task_compliance,
      recommendations: report.recommendations
    };
    const hashes = {};
    const changed = {};
    const unchanged = [];
    Object.keys(sections).forEach((key) => {
      hashes[key] = this.sectionHash(sections[key]);
      if (previous[key] !== hashes[key]) {
        changed[key] = sections[key];
      } else {
        unchanged.push(key);
      }
    });
    writeJson(REPORT_SECTION_HASHES, hashes);
    const diff = {
      component: "jasonos_prime_orchestrator_grok_cycle_report_diff",
      schema_version: "jasonos.grok_cycle_report_diff.v1",
      updated_utc: report.updated_utc,
      base_report_json: GROK_CYCLE_REPORT_JSON,
      base_report_md: GROK_CYCLE_REPORT_MD,
      delivery_mode: report.delivery_mode,
      escalation_required: report.escalation_required,
      changed_section_names: Object.keys(changed),
      omitted_unchanged_section_names: unchanged,
      changed_sections: changed,
      compact_heartbeat: {
        sentinel: report.safety.sentinel_status + "/" + report.safety.sentinel_alert,
        materialized_qa: report.safety.materialized_qa_status + " " + report.safety.materialized_qa_passed + "/" + report.safety.materialized_qa_checked,
        instruction_loop_status: report.grok_instruction_activity.status || "",
        launch_degraded: report.launch_health.degraded_required === true || this.degradedMode === true,
        publication_held: fs.existsSync(PAUSE_PUBLICATION)
      },
      full_report_hash: crypto.createHash("sha256").update(fullMd || "").digest("hex")
    };
    writeJson(GROK_CYCLE_REPORT_DIFF_JSON, diff);
    writeText(GROK_CYCLE_REPORT_DIFF_MD, [
      "# Orchestrator Grok Cycle Report Diff",
      "",
      "- Updated UTC: " + diff.updated_utc,
      "- Escalation required: " + diff.escalation_required,
      "- Changed sections: " + diff.changed_section_names.join(", "),
      "- Omitted unchanged sections: " + diff.omitted_unchanged_section_names.join(", "),
      "- Sentinel: " + diff.compact_heartbeat.sentinel,
      "- Materialized QA: " + diff.compact_heartbeat.materialized_qa,
      "- Instruction loop: " + diff.compact_heartbeat.instruction_loop_status,
      "- Launch degraded: " + diff.compact_heartbeat.launch_degraded,
      "- Publication held: " + diff.compact_heartbeat.publication_held,
      "",
      "Changed section payload is in `" + GROK_CYCLE_REPORT_DIFF_JSON + "`."
    ].join("\r\n"));
    return diff;
  }

  generateGrokCycleReport() {
    const safety = this.currentSafetySnapshot();
    const token = this.grokTokenMode();
    const reduction = readJson(path.join(PUBLIC, "jasonos_prime_orchestrator_task_reduction_status.json")) || {};
    const managed = readJson(MANAGED_JOBS_STATUS) || {};
    const scarflixJobs = readJson(SCARFLIX_STATUS_JOBS) || {};
    const materializedQaTriage = readJson(MATERIALIZED_QA_TRIAGE_JSON) || {};
    const materializedQaIncidentLedger = readJson(MATERIALIZED_QA_INCIDENT_LEDGER_JSON) || {};
    const materializedQaTimingPlan = readJson(MATERIALIZED_QA_TIMING_PLAN_JSON) || {};
    const materializedQaTimingResults = readJson(MATERIALIZED_QA_TIMING_RESULTS_JSON) || {};
    const plexMapComparison = readJson(PLEX_METADATA_WEBDAV_MAP_COMPARISON_JSON) || {};
    const launchHealth = this.launchHealthSummary();
    const incidents = readJson(INCIDENTS_JSON) || {};
    const handsOff = readJson(HANDS_OFF_STATUS_JSON) || {};
    const materializedIncidentProbe = readJson(MATERIALIZED_INCIDENT_PROBE_JSON) || {};
    const retiredTaskCompliance = readJson(RETIRED_TASK_COMPLIANCE_JSON) || {};
    const instructionLoop = this.instructionLoopSummary();
    const report = {
      component: "jasonos_prime_orchestrator_grok_cycle_report",
      schema_version: "jasonos.grok_cycle_report.v1",
      updated_utc: nowIso(),
      delivery_mode: token.mode,
      token_file_name_detected: token.token_file_name,
      minimum_report_cadence_seconds: 1800,
      grok_instruction_ingest_cadence_seconds: 300,
      grok_bridge_cadence_seconds: 900,
      grok_report_delivery_cadence_seconds: 1800,
      escalation_required: safety.jason_action_required || safety.codex_action_required || handsOff.escalation_required === true || (String(safety.sentinel_status).toUpperCase() === "ALERT" && String(safety.sentinel_alert).toUpperCase() === "HIGH"),
      hands_off_operation: handsOff,
      safety,
      task_reduction_status: {
        status: reduction.status || "",
        apply: reduction.apply === true,
        candidate_count: Array.isArray(reduction.candidate_tasks) ? reduction.candidate_tasks.length : 0
      },
      launch_health: launchHealth,
      degraded_mode: {
        active: this.degradedMode === true,
        reason: this.degradedReason || ""
      },
      incidents,
      materialized_incident_probe: materializedIncidentProbe,
      retired_task_compliance: retiredTaskCompliance,
      managed_jobs: managed.jobs || {},
      grok_instruction_activity: instructionLoop,
      scarflix_status_job: scarflixJobs,
      materialized_qa_timing_plan: materializedQaTimingPlan.component ? {
        status: materializedQaTimingPlan.status || "",
        updated_utc: materializedQaTimingPlan.updated_utc || "",
        sample_count: materializedQaTimingPlan.sample_count || 0,
        recommended_next_action: materializedQaTimingPlan.recommended_next_action || "",
        timing_plan_json: MATERIALIZED_QA_TIMING_PLAN_JSON
      } : {},
      materialized_qa_timing_results: materializedQaTimingResults.component ? {
        status: materializedQaTimingResults.status || "",
        updated_utc: materializedQaTimingResults.updated_utc || "",
        summary: materializedQaTimingResults.summary || {},
        hypothesis_update: materializedQaTimingResults.hypothesis_update || {},
        results_json: MATERIALIZED_QA_TIMING_RESULTS_JSON,
        results_md: MATERIALIZED_QA_TIMING_RESULTS_MD
      } : {},
      plex_metadata_vs_webdav_map_comparison: plexMapComparison.component ? {
        status: plexMapComparison.status || "",
        updated_utc: plexMapComparison.updated_utc || "",
        summary: plexMapComparison.summary || {},
        hypothesis_update: plexMapComparison.hypothesis_update || {},
        results_json: PLEX_METADATA_WEBDAV_MAP_COMPARISON_JSON,
        results_md: PLEX_METADATA_WEBDAV_MAP_COMPARISON_MD
      } : {},
      materialized_qa_incident_hypothesis_ledger: materializedQaIncidentLedger.component ? {
        status: materializedQaIncidentLedger.status || "",
        updated_utc: materializedQaIncidentLedger.updated_utc || "",
        incident_id: materializedQaIncidentLedger.incident_id || "",
        leading_hypotheses: materializedQaIncidentLedger.leading_hypotheses || [],
        next_required_step: materializedQaIncidentLedger.next_required_step || "",
        ledger_json: MATERIALIZED_QA_INCIDENT_LEDGER_JSON
      } : {},
      materialized_qa_triage: materializedQaTriage.component ? {
        status: materializedQaTriage.status || "",
        updated_utc: materializedQaTriage.updated_utc || "",
        qa_summary: materializedQaTriage.qa_summary || {},
        failure_reason_counts: materializedQaTriage.failure_reason_counts || [],
        failure_section_counts: materializedQaTriage.failure_section_counts || [],
        failure_path_category_counts: materializedQaTriage.failure_path_category_counts || [],
        patterns: materializedQaTriage.patterns || [],
        proposed_next_step: materializedQaTriage.proposed_next_step || "",
        triage_json: MATERIALIZED_QA_TRIAGE_JSON,
        recovery_plan_json: MATERIALIZED_QA_RECOVERY_PLAN_JSON
      } : {},
      recommendations: [
        handsOff.status ? "True hands-off operating model is active; external input should be exception-only." : "Activate hands-off operating model status cycle.",
        safety.materialized_qa_status === "PASS" ? "Materialized QA is PASS; controlled Orchestrator-managed ScarFLIX work can be considered after concurrent QA gate." : "Keep ScarFLIX expansion held; materialized QA is not PASS.",
        materializedQaIncidentLedger.status ? "Use the formal P0 hypothesis ledger to drive bounded diagnostics in order of confidence." : "Formalize the Materialized QA P0 hypothesis ledger.",
        plexMapComparison.status === "PASS_SAME_SAMPLE_METADATA_COMPARISON_COMPLETE" ? "Use the same-sample Plex metadata vs webdav_map comparison to plan only QA-safe path reconciliation; do not publish or mutate paths." : (materializedQaTimingResults.status === "PASS_TINY_TIMING_PROBE_COMPLETE" ? "Next safe incident step is same-sample Plex metadata path comparison against webdav_map." : (materializedQaTimingPlan.status === "PASS_PLAN_READY_STATUS_ONLY" ? "Next safe incident step is a tiny detached Plex decision/indexing timing diagnostic using the confirmed 8-path sample." : "Prepare or refresh the tiny Materialized QA timing diagnostic plan.")),
        materializedQaTriage.component ? "Use the read-only materialized QA triage to prepare a reversible source-only cleanup candidate plan before any cleanup execution." : "Run read-only materialized QA triage before cleanup planning.",
        instructionLoop.blocked_or_review_count > 0 ? "Review or human-approval Grok instructions are present; report them back before execution." : "Inbound Grok instructions are either safely executable or already handled.",
        "Keep legacy/direct resolver expansion disabled.",
        "Keep Windows scheduled-task ownership reduced; Orchestrator remains the scheduling owner for migrated tasks."
      ]
    };
    const md = [
      "# Orchestrator Grok Cycle Report",
      "",
      "- Updated UTC: " + report.updated_utc,
      "- Delivery mode: " + report.delivery_mode,
      "- Sentinel: " + safety.sentinel_status + " / " + safety.sentinel_alert,
      "- Materialized QA: " + safety.materialized_qa_status + " (" + safety.materialized_qa_passed + "/" + safety.materialized_qa_checked + ", failed=" + safety.materialized_qa_failed + ")",
      "- Legacy/direct resolver expansion allowed: false",
      "- Escalation required: " + report.escalation_required,
      "- Hands-off operation: " + (handsOff.status || "pending") + " / " + (handsOff.operating_model || "not active"),
      "- Inbound instruction loop: " + instructionLoop.status + " (safe=" + instructionLoop.classification_counts.Safe + ", review=" + instructionLoop.classification_counts.Review + ", human=" + instructionLoop.classification_counts["Requires Human Approval"] + ", executed=" + instructionLoop.status_counts.executed + ")",
      "",
      "## Hands-Off Operation",
      "",
      "- Status: " + (handsOff.status || "pending"),
      "- Operating model: " + (handsOff.operating_model || "not active"),
      "- External input policy: " + (handsOff.external_input_policy || "unknown"),
      "- Progress made this cycle: " + (handsOff.progress_made_this_cycle === true),
      "- No-progress cycles: " + (handsOff.no_progress_cycles || 0),
      "- Escalation required: " + (handsOff.escalation_required === true),
      "",
      "## Inbound Grok Instruction Loop",
      "",
      "- Last updated UTC: " + instructionLoop.updated_utc,
      "- Last ingest UTC: " + instructionLoop.last_ingest_utc,
      "- Last execution UTC: " + instructionLoop.last_execution_utc,
      "- Last instruction id: " + instructionLoop.last_instruction_id,
      "- Last instruction status: " + instructionLoop.last_instruction_status,
      "- Blocked/review count: " + instructionLoop.blocked_or_review_count,
      "",
      "## Materialized QA Triage",
      "",
      materializedQaTriage.component ? "- Triage status: " + (materializedQaTriage.status || "") : "- Triage status: not yet generated",
      materializedQaTriage.component ? "- Triage updated UTC: " + (materializedQaTriage.updated_utc || "") : "",
      materializedQaTriage.component ? "- Failure reasons: " + (materializedQaTriage.failure_reason_counts || []).map((row) => row.key + "=" + row.count).join(", ") : "",
      materializedQaTriage.component ? "- Proposed next step: " + (materializedQaTriage.proposed_next_step || "") : "",
      "",
      "## Materialized QA P0 Hypothesis Ledger",
      "",
      materializedQaIncidentLedger.component ? "- Ledger status: " + (materializedQaIncidentLedger.status || "") : "- Ledger status: not yet generated",
      materializedQaIncidentLedger.component ? "- Leading hypotheses: " + (materializedQaIncidentLedger.leading_hypotheses || []).map((item) => item.id + "=" + item.confidence).join(", ") : "",
      materializedQaIncidentLedger.component ? "- Next required step: " + (materializedQaIncidentLedger.next_required_step || "") : "",
      "",
      "## Materialized QA Timing Plan",
      "",
      materializedQaTimingPlan.component ? "- Plan status: " + (materializedQaTimingPlan.status || "") : "- Plan status: not yet generated",
      materializedQaTimingPlan.component ? "- Sample count: " + (materializedQaTimingPlan.sample_count || 0) : "",
      materializedQaTimingPlan.component ? "- Recommended next action: " + (materializedQaTimingPlan.recommended_next_action || "") : "",
      "",
      "## Materialized QA Timing Results",
      "",
      materializedQaTimingResults.component ? "- Results status: " + (materializedQaTimingResults.status || "") : "- Results status: not yet generated",
      materializedQaTimingResults.component ? "- Results updated UTC: " + (materializedQaTimingResults.updated_utc || "") : "",
      materializedQaTimingResults.component && materializedQaTimingResults.summary ? "- Service-context inaccessible: " + (materializedQaTimingResults.summary.service_context_inaccessible_count || 0) + "/" + (materializedQaTimingResults.summary.probed || 0) : "",
      materializedQaTimingResults.component && materializedQaTimingResults.summary ? "- WebDAV HEAD 2xx: " + (materializedQaTimingResults.summary.webdav_head_2xx_count || 0) + "/" + (materializedQaTimingResults.summary.probed || 0) : "",
      materializedQaTimingResults.component && materializedQaTimingResults.summary ? "- Plex metadata 2xx: " + (materializedQaTimingResults.summary.plex_metadata_2xx_count || 0) + "/" + (materializedQaTimingResults.summary.probed || 0) + ", timeouts=" + (materializedQaTimingResults.summary.plex_metadata_timeout_count || 0) : "",
      materializedQaTimingResults.component && materializedQaTimingResults.summary ? "- Hypothesis update: " + Object.keys(materializedQaTimingResults.hypothesis_update || {}).map((key) => key + "=" + materializedQaTimingResults.hypothesis_update[key]).join(", ") : "",
      "",
      "## Materialized QA Incident Probe",
      "",
      materializedIncidentProbe.component ? "- Probe status: " + (materializedIncidentProbe.status || "") : "- Probe status: not yet generated",
      materializedIncidentProbe.component ? "- Progress signal: " + ((materializedIncidentProbe.probe_summary && materializedIncidentProbe.probe_summary.progress_signal) || "") : "",
      materializedIncidentProbe.component ? "- Decision: " + ((materializedIncidentProbe.autonomous_decision && materializedIncidentProbe.autonomous_decision.next_action) || "") : "",
      materializedIncidentProbe.component ? "- Probed paths: " + ((materializedIncidentProbe.probe_summary && materializedIncidentProbe.probe_summary.probed) || 0) : "",
      "",
      "## Recommendations",
      "",
      ...report.recommendations.map((item) => "- " + item),
      ""
    ].join("\r\n");
    const diff = this.writeDifferentialGrokReport(report, md);
    report.differential_reporting = {
      enabled: true,
      diff_json: GROK_CYCLE_REPORT_DIFF_JSON,
      diff_md: GROK_CYCLE_REPORT_DIFF_MD,
      changed_section_names: diff.changed_section_names,
      omitted_unchanged_section_names: diff.omitted_unchanged_section_names
    };
    writeJson(GROK_CYCLE_REPORT_JSON, report);
    fs.writeFileSync(GROK_CYCLE_REPORT_MD, md, "utf8");
    appendJsonl(GROK_REPORT_OUTBOX, {
      updated_utc: report.updated_utc,
      delivery_mode: report.delivery_mode,
      report_json: GROK_CYCLE_REPORT_JSON,
      report_md: GROK_CYCLE_REPORT_MD,
      escalation_required: report.escalation_required
    });
  }

  deliverGrokCycleReport() {
    const result = this.runNodeSync(GROK_REPORT_DELIVERY_BRIDGE_SCRIPT, 90000, "io", true);
    const delivery = readJson(path.join(PUBLIC, "jasonos_prime_grok_report_delivery_status.json")) || {};
    this.recordManagedJob("grok_report_delivery", result.status === "PASS" ? "PASS" : "REVIEW", {
      bridge_result: result,
      delivery_status: delivery.status || "",
      delivery_mode: delivery.delivery_mode || "",
      token_file_present: delivery.token_file_present === true,
      token_file_usable: delivery.token_file_usable === true,
      last_grok_http_status: delivery.last_grok_http_status || null,
      queue_reason: delivery.queue_reason || "",
      queue_files: delivery.queue_files || {}
    });
  }

  markMaterializedProbeRequestsHeld(status, reason, detail) {
    const requestFiles = [
      path.join(STATE, "plex_reachability_diagnostic_request.json"),
      path.join(STATE, "section5_current_missing_correlation_request.json"),
      path.join(STATE, "section5_tiny_plex_forensic_check_request.json"),
      path.join(STATE, "section5_forensic_diff_request.json"),
      path.join(STATE, "section5_uncapped_index_snapshot_request.json"),
      path.join(STATE, "section5_indexing_diagnostic_request.json"),
      path.join(STATE, "section5_hybrid_reconcile_then_verify_request.json")
    ];
    requestFiles.forEach((filePath) => {
      const request = readJson(filePath);
      if (!request || request.status !== "queued") return;
      request.status = status;
      request.held_utc = nowIso();
      request.held_reason = reason;
      request.held_detail = detail || {};
      writeJson(filePath, request);
    });
  }

  runMaterializedQaIncidentProbeCycle() {
    const pause = this.pauseState();
    const safety = this.currentSafetySnapshot();
    const launchHealth = this.launchHealthSummary();
    if (pause.pause_all || pause.safe_mode || pause.pause_publication !== true) {
      this.markMaterializedProbeRequestsHeld("HELD_PAUSED_OR_PUBLICATION_NOT_HELD", "Orchestrator held materialized probe because pause/safe/publication state is not eligible.", { pause, safety, launch_health: launchHealth });
      this.recordManagedJob("materialized_qa_incident_probe", "HELD_PAUSED_OR_PUBLICATION_NOT_HELD", { pause, safety, launch_health: launchHealth });
      return;
    }
    if (!this.safetyAllowsControlJob()) {
      this.markMaterializedProbeRequestsHeld("HELD_SENTINEL_ALERT", "Orchestrator held materialized probe because Sentinel/control-plane safety gate is active.", { pause, safety, launch_health: launchHealth });
      this.recordManagedJob("materialized_qa_incident_probe", "HELD_SENTINEL_ALERT", { pause, safety, launch_health: launchHealth });
      return;
    }
    if (launchHealth.degraded_required || this.degradedMode === true) {
      this.setDegradedMode(true, "incident_probe_held_launch_health_degraded avg_ms=" + launchHealth.avg_spawn_latency_ms + " timeout_rate=" + launchHealth.timeout_rate);
      this.markMaterializedProbeRequestsHeld("HELD_LAUNCH_HEALTH_DEGRADED", "Orchestrator held materialized probe because process launch health is degraded.", { pause, safety, launch_health: launchHealth });
      this.recordManagedJob("materialized_qa_incident_probe", "HELD_LAUNCH_HEALTH_DEGRADED", { pause, safety, launch_health: launchHealth });
      return;
    }
    const result = this.runNodeSync(MATERIALIZED_INCIDENT_PROBE_SCRIPT, 180000, "control", false);
    const probe = readJson(MATERIALIZED_INCIDENT_PROBE_JSON) || {};
    this.recordManagedJob("materialized_qa_incident_probe", result.status === "PASS" ? (probe.status || "PASS") : "REVIEW", {
      bridge_result: result,
      probe_status: probe.status || "",
      incident_id: probe.incident_id || "INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610",
      progress_signal: probe.probe_summary ? probe.probe_summary.progress_signal || "" : "",
      autonomous_decision: probe.autonomous_decision || {},
      no_publication_started: probe.no_publication_started !== false,
      no_source_mutation_performed: probe.no_source_mutation_performed !== false
    });
  }

  section5HybridReconcileThenVerify() {
    const pause = this.pauseState();
    const safety = this.currentSafetySnapshot();
    const launchHealth = this.launchHealthSummary();
    if (pause.pause_all || pause.safe_mode || pause.pause_publication !== true) {
      this.recordManagedJob("section5_hybrid_reconcile_then_verify", "HELD_PAUSED_OR_PUBLICATION_NOT_HELD", { pause, safety, launch_health: launchHealth });
      return;
    }
    if (!this.safetyAllowsControlJob()) {
      this.recordManagedJob("section5_hybrid_reconcile_then_verify", "HELD_SENTINEL_ALERT", { pause, safety, launch_health: launchHealth });
      return;
    }
    if (launchHealth.degraded_required || this.degradedMode === true) {
      this.setDegradedMode(true, "section5_reconcile_held_launch_health_degraded avg_ms=" + launchHealth.avg_spawn_latency_ms + " timeout_rate=" + launchHealth.timeout_rate);
      this.recordManagedJob("section5_hybrid_reconcile_then_verify", "HELD_LAUNCH_HEALTH_DEGRADED", { pause, safety, launch_health: launchHealth });
      return;
    }
    const result = this.runNodeSync(SECTION5_HYBRID_RECONCILE_SCRIPT, 900000, "control", false);
    const status = readJson(SECTION5_HYBRID_RECONCILE_STATUS_JSON) || {};
    this.recordManagedJob("section5_hybrid_reconcile_then_verify", result.status === "PASS" ? (status.status || "PASS") : "REVIEW", {
      bridge_result: result,
      execution_status: status.status || "",
      incident_id: status.incident_id || "INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610",
      decision_gate: status.decision_gate || {},
      no_publication_started: status.no_publication_started !== false,
      no_expansion_started: status.no_expansion_started !== false,
      no_cleanup_performed: status.no_cleanup_performed !== false,
      no_source_mutation_performed: status.no_source_mutation_performed !== false,
      no_path_rewrite_performed: status.no_path_rewrite_performed !== false
    });
    this.enqueueUnique("generate_grok_cycle_report", "control", 100, {
      source: "section5_hybrid_reconcile_then_verify",
      reason: "report_section5_gate_status"
    });
    this.enqueueUnique("deliver_grok_cycle_report", "io", 105, {
      source: "section5_hybrid_reconcile_then_verify",
      reason: "report_section5_gate_status"
    });
  }

  section5UncappedIndexSnapshot() {
    const pause = this.pauseState();
    const safety = this.currentSafetySnapshot();
    const launchHealth = this.launchHealthSummary();
    if (pause.pause_all || pause.safe_mode || pause.pause_publication !== true) {
      this.recordManagedJob("section5_uncapped_index_snapshot", "HELD_PAUSED_OR_PUBLICATION_NOT_HELD", { pause, safety, launch_health: launchHealth });
      return;
    }
    if (launchHealth.degraded_required || this.degradedMode === true) {
      this.setDegradedMode(true, "section5_uncapped_snapshot_held_launch_health_degraded avg_ms=" + launchHealth.avg_spawn_latency_ms + " timeout_rate=" + launchHealth.timeout_rate);
      this.recordManagedJob("section5_uncapped_index_snapshot", "HELD_LAUNCH_HEALTH_DEGRADED", { pause, safety, launch_health: launchHealth });
      return;
    }
    const result = this.runNodeSync(SECTION5_UNCAPPED_INDEX_SNAPSHOT_SCRIPT, 180000, "control", false);
    const status = readJson(SECTION5_UNCAPPED_INDEX_SNAPSHOT_STATUS_JSON) || {};
    this.recordManagedJob("section5_uncapped_index_snapshot", result.status === "PASS" ? (status.status || "PASS") : "REVIEW", {
      bridge_result: result,
      snapshot_status: status.status || "",
      updated_utc: status.updated_utc || "",
      total_expected: status.total_expected || null,
      present_count: status.present_count || null,
      missing_count: status.missing_count || null,
      visibility_percent: status.visibility_percent || null,
      section_total_items: status.section_total_items || null,
      pause_publication_active: pause.pause_publication === true,
      read_only: true,
      no_publication_started: true,
      no_expansion_started: true,
      no_cleanup_performed: true,
      no_source_mutation_performed: true,
      no_path_rewrite_performed: true
    });
  }

  markPath2PilotRequestHeld(status, reason, detail) {
    const request = readJson(PATH2_PILOT_MIGRATION_REQUEST_JSON);
    if (!request || request.status !== "queued") return;
    request.status = status;
    request.held_utc = nowIso();
    request.held_reason = reason;
    request.held_detail = detail || {};
    writeJson(PATH2_PILOT_MIGRATION_REQUEST_JSON, request);
  }

  path2PilotMigration() {
    const pause = this.pauseState();
    const safety = this.currentSafetySnapshot();
    const launchHealth = this.launchHealthSummary();
    if (pause.pause_all || pause.safe_mode || pause.pause_publication !== true) {
      this.markPath2PilotRequestHeld("HELD_PAUSED_OR_PUBLICATION_NOT_HELD", "Orchestrator held Path 2 pilot because pause/safe/publication state is not eligible.", { pause, safety, launch_health: launchHealth });
      this.recordManagedJob("path2_pilot_migration", "HELD_PAUSED_OR_PUBLICATION_NOT_HELD", { pause, safety, launch_health: launchHealth });
      return;
    }
    if (!this.safetyAllowsControlJob()) {
      this.markPath2PilotRequestHeld("HELD_SENTINEL_ALERT", "Orchestrator held Path 2 pilot because Sentinel/control-plane safety gate is active.", { pause, safety, launch_health: launchHealth });
      this.recordManagedJob("path2_pilot_migration", "HELD_SENTINEL_ALERT", { pause, safety, launch_health: launchHealth });
      return;
    }
    if (launchHealth.degraded_required || this.degradedMode === true) {
      this.setDegradedMode(true, "path2_pilot_held_launch_health_degraded avg_ms=" + launchHealth.avg_spawn_latency_ms + " timeout_rate=" + launchHealth.timeout_rate);
      this.markPath2PilotRequestHeld("HELD_LAUNCH_HEALTH_DEGRADED", "Orchestrator held Path 2 pilot because process launch health is degraded.", { pause, safety, launch_health: launchHealth });
      this.recordManagedJob("path2_pilot_migration", "HELD_LAUNCH_HEALTH_DEGRADED", { pause, safety, launch_health: launchHealth });
      return;
    }
    const result = this.runNodeSync(PATH2_PILOT_MIGRATION_SCRIPT, 300000, "control", false);
    const status = readJson(PATH2_PILOT_MIGRATION_STATUS_JSON) || {};
    this.recordManagedJob("path2_pilot_migration", result.status === "PASS" ? (status.status || "PASS") : "REVIEW", {
      bridge_result: result,
      execution_status: status.status || "",
      incident_id: status.incident_id || "INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610",
      baseline: status.baseline || {},
      pilot: status.pilot || {},
      rollback: status.rollback || {},
      pause_publication_active: status.pause_publication_active === true,
      no_publication_started: status.no_publication_started !== false,
      no_expansion_started: status.no_expansion_started !== false
    });
    this.enqueueUnique("generate_grok_cycle_report", "control", 100, {
      source: "path2_pilot_migration",
      reason: "report_path2_pilot_status"
    });
    this.enqueueUnique("deliver_grok_cycle_report", "io", 105, {
      source: "path2_pilot_migration",
      reason: "report_path2_pilot_status"
    });
  }

  runMaterializedQaDecisionTimingProbe() {
    const pause = this.pauseState();
    const safety = this.currentSafetySnapshot();
    const launchHealth = this.launchHealthSummary();
    if (pause.pause_all || pause.safe_mode || pause.pause_publication !== true) {
      this.recordManagedJob("materialized_qa_decision_timing_probe", "HELD_PAUSED_OR_PUBLICATION_NOT_HELD", { pause, safety, launch_health: launchHealth });
      return;
    }
    if (!this.safetyAllowsControlJob()) {
      this.recordManagedJob("materialized_qa_decision_timing_probe", "HELD_SENTINEL_ALERT", { pause, safety, launch_health: launchHealth });
      return;
    }
    if (launchHealth.degraded_required || this.degradedMode === true) {
      this.setDegradedMode(true, "decision_timing_probe_held_launch_health_degraded avg_ms=" + launchHealth.avg_spawn_latency_ms + " timeout_rate=" + launchHealth.timeout_rate);
      this.recordManagedJob("materialized_qa_decision_timing_probe", "HELD_LAUNCH_HEALTH_DEGRADED", { pause, safety, launch_health: launchHealth });
      return;
    }
    const result = this.runNodeSync(MATERIALIZED_DECISION_TIMING_PROBE_SCRIPT, 180000, "control", false);
    const probe = readJson(MATERIALIZED_QA_TIMING_RESULTS_JSON) || {};
    this.recordManagedJob("materialized_qa_decision_timing_probe", result.status === "PASS" ? (probe.status || "PASS") : "REVIEW", {
      bridge_result: result,
      probe_status: probe.status || "",
      incident_id: probe.incident_id || "INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610",
      summary: probe.summary || {},
      no_publication_started: probe.no_publication_started !== false,
      no_expansion_started: probe.no_expansion_started !== false,
      no_cleanup_performed: probe.no_cleanup_performed !== false,
      no_source_mutation_performed: probe.no_source_mutation_performed !== false,
      no_path_rewrite_performed: probe.no_path_rewrite_performed !== false
    });
  }

  runPlexMetadataVsWebdavMapComparison() {
    const pause = this.pauseState();
    const safety = this.currentSafetySnapshot();
    const launchHealth = this.launchHealthSummary();
    if (pause.pause_all || pause.safe_mode || pause.pause_publication !== true) {
      this.recordManagedJob("plex_metadata_vs_webdav_map_comparison", "HELD_PAUSED_OR_PUBLICATION_NOT_HELD", { pause, safety, launch_health: launchHealth });
      return;
    }
    if (!this.safetyAllowsControlJob()) {
      this.recordManagedJob("plex_metadata_vs_webdav_map_comparison", "HELD_SENTINEL_ALERT", { pause, safety, launch_health: launchHealth });
      return;
    }
    if (launchHealth.degraded_required || this.degradedMode === true) {
      this.setDegradedMode(true, "plex_metadata_vs_webdav_map_comparison_held_launch_health_degraded avg_ms=" + launchHealth.avg_spawn_latency_ms + " timeout_rate=" + launchHealth.timeout_rate);
      this.recordManagedJob("plex_metadata_vs_webdav_map_comparison", "HELD_LAUNCH_HEALTH_DEGRADED", { pause, safety, launch_health: launchHealth });
      return;
    }
    const result = this.runNodeSync(PLEX_METADATA_WEBDAV_MAP_COMPARISON_SCRIPT, 180000, "control", false);
    const comparison = readJson(PLEX_METADATA_WEBDAV_MAP_COMPARISON_JSON) || {};
    this.recordManagedJob("plex_metadata_vs_webdav_map_comparison", result.status === "PASS" ? (comparison.status || "PASS") : "REVIEW", {
      bridge_result: result,
      comparison_status: comparison.status || "",
      incident_id: comparison.incident_id || "INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610",
      summary: comparison.summary || {},
      no_publication_started: comparison.no_publication_started !== false,
      no_expansion_started: comparison.no_expansion_started !== false,
      no_cleanup_performed: comparison.no_cleanup_performed !== false,
      no_source_mutation_performed: comparison.no_source_mutation_performed !== false,
      no_path_rewrite_performed: comparison.no_path_rewrite_performed !== false
    });
  }

  runGuardedDetachedNode(script, name, options) {
    const opts = options || {};
    const pause = this.pauseState();
    const safety = this.currentSafetySnapshot();
    if (pause.pause_all || pause.safe_mode) {
      this.recordManagedJob(name, "HELD_PAUSED", { script, safety, pause });
      return;
    }
    if (!this.safetyAllowsControlJob()) {
      this.recordManagedJob(name, "HELD_SENTINEL_ALERT", { script, safety, pause });
      return;
    }
    if (opts.requireMaterializedQaPass && !this.materializedQaPasses()) {
      this.recordManagedJob(name, "HELD_MATERIALIZED_QA_NOT_PASS", { script, safety, pause });
      return;
    }
    if (!fs.existsSync(script)) {
      this.recordManagedJob(name, "REVIEW_SCRIPT_MISSING", { script, safety, pause });
      return;
    }
    this.runDetachedNode(script, name);
    this.recordManagedJob(name, "STARTED_DETACHED", { script, safety, pause });
  }

  runNodeSync(script, timeoutMs, jobClass, critical) {
    if (!fs.existsSync(script)) {
      return { status: "REVIEW_SCRIPT_MISSING", exit_code: null, error: "missing script " + script };
    }
    const name = path.basename(script);
    const parentJobClass = jobClass || "control";
    if (!this.launchAllowed(parentJobClass, name, critical === true)) {
      return { status: "HELD_LAUNCH_BUDGET", exit_code: null, error: "launch held by degraded mode or launch budget" };
    }
    const startMs = Date.now();
    const result = childProcess.spawnSync(process.execPath, [script], {
      windowsHide: true,
      timeout: timeoutMs || 60000,
      encoding: "utf8",
      maxBuffer: 1024 * 1024
    });
    this.recordLaunch("spawn_sync", path.basename(script), {
      script,
      parent_job_class: parentJobClass,
      critical: critical === true,
      timeout_ms: timeoutMs || 60000,
      elapsed_ms: Date.now() - startMs,
      process_runtime_ms: Date.now() - startMs,
      launch_latency_ms: null,
      exit_code: result.status,
      timed_out: !!(result.error && /timed out|timeout/i.test(String(result.error.message || result.error))),
      error: result.error ? String(result.error.message || result.error) : ""
    });
    return {
      status: result.status === 0 ? "PASS" : "REVIEW",
      exit_code: result.status,
      error: result.error ? String(result.error.message || result.error) : "",
      stdout_tail: result.stdout ? result.stdout.slice(-2000) : "",
      stderr_tail: result.stderr ? result.stderr.slice(-2000) : ""
    };
  }

  runGrokBridgeConsumerCycle() {
    const pause = this.pauseState();
    const safety = this.currentSafetySnapshot();
    if (pause.pause_all || pause.safe_mode) {
      this.recordManagedJob("grok_bridge_consumer_cycle", "HELD_PAUSED", { pause, safety });
      return;
    }
    if (!this.safetyAllowsControlJob()) {
      this.recordManagedJob("grok_bridge_consumer_cycle", "HELD_SENTINEL_ALERT", { pause, safety });
      return;
    }
    const bridge = this.runNodeSync(GROK_INSTRUCTION_BRIDGE_SCRIPT, 60000, "control", true);
    const consumer = this.runNodeSync(CODEX_INSTRUCTION_CONSUMER_SCRIPT, 60000, "control", true);
    const bridgeStatus = readJson(path.join(PUBLIC, "jasonos_prime_grok_instruction_bridge_status.json")) || {};
    const consumerStatus = readJson(path.join(PUBLIC, "jasonos_prime_codex_instruction_consumer_status.json")) || {};
    this.recordManagedJob("grok_bridge_consumer_cycle", bridge.status === "PASS" && consumer.status === "PASS" ? "PASS" : "REVIEW", {
      pause,
      safety,
      bridge_result: bridge,
      consumer_result: consumer,
      bridge_mode: bridgeStatus.bridge_mode || bridgeStatus.api_mode || "",
      bridge_status: bridgeStatus.status || "",
      consumer_status: consumerStatus.status || "",
      executable_instruction_count: consumerStatus.executable_instruction_count || 0,
      executed_action_count: consumerStatus.executed_action_count || 0
    });
  }

  runPublicMirrorPublisher() {
    this.runGuardedDetachedNode(PUBLIC_MIRROR_SCRIPT, "public_mirror_publisher", {});
  }

  runPredictiveSimulator() {
    this.runGuardedDetachedNode(PREDICTIVE_SCRIPT, "predictive_simulator", {});
  }

  runSelfEvolutionCycle() {
    this.runGuardedDetachedNode(SELF_EVOLUTION_SCRIPT, "self_evolution_cycle", {});
  }

  runAiKeepaliveCheck() {
    return Promise.all([
      this.checkTcpPort(8791, 1500),
      this.checkTcpPort(8805, 1500)
    ]).then((results) => {
      const status = results.every((item) => item.ok) ? "PASS" : "REVIEW";
      this.recordManagedJob("ai_keepalive_check", status, {
        mode: "in_process_tcp_probe_no_worker_spawn",
        ports: results,
        migrated_from_tasks: [
          "JasonOS_Prime_CommandCentre_8791_Keepalive",
          "JasonOS_Prime_Real_AI_8805_Keepalive"
        ]
      });
    });
  }

  checkTcpPort(port, timeoutMs) {
    return new Promise((resolve) => {
      const socket = new net.Socket();
      let settled = false;
      const finish = (ok, error) => {
        if (settled) return;
        settled = true;
        try { socket.destroy(); } catch (_) {}
        resolve({ port, ok, error: error || "", checked_utc: nowIso() });
      };
      socket.setTimeout(timeoutMs || 1500);
      socket.once("connect", () => finish(true, ""));
      socket.once("timeout", () => finish(false, "timeout"));
      socket.once("error", (err) => finish(false, String(err && err.message ? err.message : err)));
      socket.connect(port, "127.0.0.1");
    });
  }

  evaluateFastTrackGate() {
    this.runGuardedDetachedNode(FAST_TRACK_SCRIPT, "fast_track_accelerator", { requireMaterializedQaPass: true });
  }

  capabilityContractForAction(action) {
    const type = action && action.action_type ? String(action.action_type) : "unknown";
    const parameters = action && action.parameters ? action.parameters : {};
    const taskName = String(parameters.task_name || action.task_name || "");
    const combined = (type + " " + taskName + " " + JSON.stringify(parameters)).toLowerCase();
    let blastRadiusScore = 1;
    const escalationTriggers = [];
    if (/publish|publication|publisher|expand|expansion|cleanup|delete|quarantine|platformgate|visiblecatalogqa|plexdecisionqa|concurrentqa|autogate|directstrm|safewebdav|fasttrack/i.test(combined)) {
      blastRadiusScore = 8;
      escalationTriggers.push("publication_or_high_concurrency_or_legacy_sensitive_action");
    }
    if (/legacy|direct resolver|worker_mesh|quiettasks|scheduled task/i.test(combined)) {
      blastRadiusScore = Math.max(blastRadiusScore, 7);
      escalationTriggers.push("legacy_or_task_ownership_sensitive_action");
    }
    if (type === "queue_detached_task_request") {
      blastRadiusScore = Math.max(blastRadiusScore, 5);
      escalationTriggers.push("detached_execution_requires_review_only_queue");
    }
    return {
      schema_version: "jasonos.capability_contract.v1",
      action_type: type,
      blast_radius_score: blastRadiusScore,
      preconditions: [
        "Sentinel is not ALERT/HIGH",
        "PAUSE_PUBLICATION remains active",
        "Action is allowlisted and approved for Codex execution",
        "Instruction is non-expired and low/medium risk"
      ],
      postconditions: [
        "No publication state changed",
        "No broad cleanup/deletion performed",
        "Result is logged to instruction results and next Grok report"
      ],
      rollback_path: type === "queue_detached_task_request"
        ? "Remove or ignore the queued review request before any local worker executes it."
        : "Revert only the written status/note artifact produced by this action.",
      escalation_triggers: escalationTriggers,
      autonomous_execution_allowed_by_contract: blastRadiusScore < 8
    };
  }

  normalizePlannerAction(action) {
    const normalized = Object.assign({}, action || {});
    if (normalized.action_type === "status_only" || normalized.action_type === "publish_status_summary") {
      normalized.action_type = "write_status_summary";
      normalized.parameters = Object.assign({}, normalized.parameters || {}, {
        summary: normalized.summary || normalized.reason || "Grok requested a safe status-only acknowledgement."
      });
    } else if (normalized.action_type === "start_detached_task") {
      normalized.action_type = "queue_detached_task_request";
      normalized.parameters = Object.assign({}, normalized.parameters || {}, {
        task_name: normalized.task_name || (normalized.parameters && normalized.parameters.task_name) || "",
        queued_for_review_only: true
      });
    }
    normalized.capability_contract = this.capabilityContractForAction(normalized);
    return normalized;
  }

  normalizePlannerInstruction(rawInstruction) {
    const instruction = Object.assign({}, rawInstruction || {});
    if (typeof instruction.risk_level === "string") instruction.risk_level = instruction.risk_level.toLowerCase();
    const actions = Array.isArray(instruction.actions) ? instruction.actions.map((action) => this.normalizePlannerAction(action)) : [];
    if (actions.length < 1 &&
        instruction.approved_for_codex_execution === true &&
        instruction.requires_user_decision !== true &&
        ["low", "medium"].includes(instruction.risk_level)) {
      actions.push({
        action_type: "write_status_summary",
        parameters: {
          summary: instruction.summary || instruction.title || "Safe Grok instruction had no explicit action; recorded as status-only execution.",
          source_instruction_id: instruction.instruction_id || "",
          auto_added_by_orchestrator: true
        }
      });
    }
    instruction.actions = actions;
    return instruction;
  }

  validatePlannerInstruction(instruction) {
    const errors = [];
    const allowedTargets = new Set([
      "scarflix_materialized_pipeline",
      "scarflix_qa",
      "jasonos_prime",
      "public_mirror",
      "status_dashboard",
      "worker_mesh",
      "grok_codex_bridge",
      "orchestrator",
      "documentation"
    ]);
    [
      "instruction_id",
      "created_at",
      "expires_at",
      "target_component",
      "risk_level",
      "requires_user_decision",
      "approved_for_codex_execution",
      "success_criteria",
      "retry_policy"
    ].forEach((field) => {
      if (instruction[field] === undefined || instruction[field] === null || instruction[field] === "") errors.push(field + "_missing");
    });
    if (!allowedTargets.has(instruction.target_component)) errors.push("target_not_allowlisted");
    if (!Array.isArray(instruction.success_criteria) || instruction.success_criteria.length < 1) errors.push("success_criteria_missing");
    if (!instruction.retry_policy || typeof instruction.retry_policy !== "object") errors.push("retry_policy_missing");
    return errors;
  }

  classifyPlannerInstruction(instruction, validationErrors) {
    const reasons = Array.isArray(validationErrors) ? validationErrors.slice() : [];
    if (instruction.requires_user_decision === true) reasons.push("requires_user_decision");
    if (["high", "critical"].includes(String(instruction.risk_level || "").toLowerCase())) reasons.push("risk_level_requires_human");
    if (instruction.approved_for_codex_execution !== true) reasons.push("not_approved_for_codex_execution");
    const expires = Date.parse(instruction.expires_at || "");
    if (!Number.isFinite(expires) || expires <= Date.now()) reasons.push("expired_or_invalid_expires_at");
    const actions = Array.isArray(instruction.actions) ? instruction.actions : [];
    if (!actions.length) reasons.push("no_allowlisted_actions");
    actions.forEach((action) => {
      const type = action && action.action_type;
      if (!allowlistedActions.has(type)) reasons.push("action_not_allowlisted:" + (type || "unknown"));
      const parameters = action && action.parameters ? action.parameters : {};
      const taskName = String(parameters.task_name || action.task_name || "");
      if (/PlatformGate|VisibleCatalogQA|PlexClientDecisionQA|AutoGate|DirectStrmMirror|StagedCandidatePublisher|SafeWebDavExpansion|Autopilot/i.test(taskName)) {
        reasons.push("task_forbidden_by_policy:" + taskName);
      }
      if (type === "queue_detached_task_request" && parameters.queued_for_review_only !== true) {
        reasons.push("detached_task_request_requires_review_only_flag");
      }
      const contract = action.capability_contract || this.capabilityContractForAction(action);
      if (Number(contract.blast_radius_score || 0) >= 8) {
        reasons.push("capability_contract_requires_human:" + type);
      }
    });
    let classification = "Safe";
    if (reasons.some((reason) => reason === "requires_user_decision" || reason === "risk_level_requires_human" || reason.indexOf("task_forbidden_by_policy:") === 0)) {
      classification = "Requires Human Approval";
    } else if (reasons.length) {
      classification = "Review";
    }
    return {
      classification,
      autonomous_execution_allowed: classification === "Safe",
      reasons: reasons.length ? reasons : ["approved_safe_instruction"]
    };
  }

  instructionExecutable(instruction) {
    const normalized = this.normalizePlannerInstruction(instruction);
    const validationErrors = this.validatePlannerInstruction(normalized);
    return this.classifyPlannerInstruction(normalized, validationErrors).autonomous_execution_allowed;
  }

  ingestGrokInstructions() {
    const updated = nowIso();
    const envelope = readJson(path.join(PUBLIC, "GROK_INSTRUCTIONS_FOR_CODEX.json"));
    if (!envelope || envelope.schema_version !== "grok_codex_instruction.v1") {
      this.writeInstructionLoopStatus({ status: "REVIEW_NO_VALID_ENVELOPE", last_ingest_utc: updated });
      return;
    }
    const instructions = Array.isArray(envelope.instructions) ? envelope.instructions : [];
    const ingested = [];
    instructions.forEach((rawInstruction) => {
      const instruction = this.normalizePlannerInstruction(rawInstruction);
      const validationErrors = this.validatePlannerInstruction(instruction);
      const classification = this.classifyPlannerInstruction(instruction, validationErrors);
      instruction.safety_classification = classification;
      const status = classification.autonomous_execution_allowed
        ? "safe_queued"
        : (classification.classification === "Requires Human Approval" ? "requires_human_approval" : "blocked_review");
      const existing = this.db.get("SELECT id,status FROM planner_instructions WHERE id=@id", { id: instruction.instruction_id });
      const params = {
        id: instruction.instruction_id,
        created_utc: instruction.created_at || updated,
        expires_utc: instruction.expires_at || null,
        source: envelope.source || "unknown",
        risk_level: instruction.risk_level || "unknown",
        approved: instruction.approved_for_codex_execution === true ? 1 : 0,
        requires_user_decision: instruction.requires_user_decision === true ? 1 : 0,
        status,
        data_json: JSON.stringify(instruction)
      };
      if (existing) {
        if (existing.status === "executed") {
          ingested.push({ instruction_id: instruction.instruction_id, status: "already_executed", classification: classification.classification });
          return;
        }
        this.db.run(
          "UPDATE planner_instructions SET expires_utc=@expires_utc, source=@source, risk_level=@risk_level, approved=@approved, requires_user_decision=@requires_user_decision, status=@status, data_json=@data_json WHERE id=@id",
          params
        );
      } else {
        this.db.run(
          "INSERT INTO planner_instructions(id,created_utc,expires_utc,source,risk_level,approved,requires_user_decision,status,data_json) VALUES(@id,@created_utc,@expires_utc,@source,@risk_level,@approved,@requires_user_decision,@status,@data_json)",
          params
        );
      }
      if (classification.autonomous_execution_allowed) {
        this.enqueueUnique("execute_grok_instruction_" + instruction.instruction_id, "control", 22, { instruction_id: instruction.instruction_id });
      }
      ingested.push({ instruction_id: instruction.instruction_id, status, classification: classification.classification, reasons: classification.reasons });
    });
    this.writeInstructionLoopStatus({
      status: "PASS_INGESTED",
      last_ingest_utc: updated,
      envelope_source: envelope.source || "",
      ingested
    });
  }

  executePlannerAction(instructionId, instruction, action) {
    const type = action && action.action_type;
    const parameters = action && action.parameters ? action.parameters : {};
    if (type === "write_status_summary") {
      const payload = {
        updated_utc: nowIso(),
        instruction_id: instructionId,
        action_type: type,
        parameters,
        summary: parameters.summary || instruction.summary || "",
        safety: "executed_by_orchestrator_allowlist"
      };
      writeJson(path.join(PUBLIC, "orchestrator_last_instruction_action.json"), payload);
      return { action_type: type, status: "PASS", path: path.join(PUBLIC, "orchestrator_last_instruction_action.json") };
    }
    if (type === "write_strategy_note") {
      const text = "# Orchestrator Strategy Note\n\n- Updated UTC: " + nowIso() + "\n- Instruction: " + instructionId + "\n- Summary: " + (instruction.summary || "") + "\n\n" + (parameters.note || action.note || "") + "\n";
      writeText(path.join(PUBLIC, "ORCHESTRATOR_STRATEGY_NOTE.md"), text);
      return { action_type: type, status: "PASS", path: path.join(PUBLIC, "ORCHESTRATOR_STRATEGY_NOTE.md") };
    }
    if (type === "update_dashboard_note") {
      writeText(path.join(PUBLIC, "GROK_DASHBOARD_NOTE.md"), "# Grok Dashboard Note\n\n- Updated UTC: " + nowIso() + "\n- Instruction: " + instructionId + "\n\n" + (parameters.note || action.note || instruction.summary || "") + "\n");
      return { action_type: type, status: "PASS", path: path.join(PUBLIC, "GROK_DASHBOARD_NOTE.md") };
    }
    if (type === "update_next_actions") {
      writeText(path.join(PUBLIC, "GROK_NEXT_ACTIONS.md"), "# Grok Next Actions\n\n- Updated UTC: " + nowIso() + "\n- Instruction: " + instructionId + "\n\n" + (parameters.next_actions || action.next_actions || instruction.summary || "") + "\n");
      return { action_type: type, status: "PASS", path: path.join(PUBLIC, "GROK_NEXT_ACTIONS.md") };
    }
    if (type === "queue_detached_task_request" || type === "generate_command_center" || type === "sync_public_status") {
      const queueFile = path.join(STATE, "detached_task_requests.jsonl");
      appendJsonl(queueFile, {
        updated_utc: nowIso(),
        instruction_id: instructionId,
        action_type: type,
        parameters,
        status: "QUEUED_FOR_LOCAL_WORKER_REVIEW"
      });
      return { action_type: type, status: "PASS", path: queueFile, reason: "queued_for_local_worker_review" };
    }
    return { action_type: type || "unknown", status: "REVIEW", reason: "action_type_not_implemented" };
  }

  recordSafeInstructionOutcome(instructionId, finalStatus, results) {
    if (finalStatus === "executed") {
      this.safeActionFailureStreak = 0;
      return;
    }
    this.safeActionFailureStreak += 1;
    const event = {
      ts_utc: nowIso(),
      instruction_id: instructionId,
      final_status: finalStatus,
      failure_streak: this.safeActionFailureStreak,
      results
    };
    appendJsonl(path.join(STATE, "safe_instruction_failure_events.jsonl"), event);
    if (this.safeActionFailureStreak >= CONFIG.safeActionFailureThreshold) {
      this.setDegradedMode(true, "safe_instruction_failure_threshold_exceeded streak=" + this.safeActionFailureStreak);
      this.recordManagedJob("safe_instruction_failsafe", "ESCALATE_THRESHOLD_EXCEEDED", {
        instruction_id: instructionId,
        failure_streak: this.safeActionFailureStreak,
        rollback_path: "Recent Safe actions are limited to status/note artifacts; revert or ignore the last written public note/status file listed in action results."
      });
    }
  }

  executePlannerInstruction(job) {
    const payload = JSON.parse(job.payload_json || "{}");
    const instructionId = payload.instruction_id || job.type.replace(/^execute_(?:grok_)?instruction_/, "");
    const row = this.db.get("SELECT * FROM planner_instructions WHERE id=@id", { id: instructionId });
    if (!row) return;
    const instruction = this.normalizePlannerInstruction(JSON.parse(row.data_json || "{}"));
    const validationErrors = this.validatePlannerInstruction(instruction);
    const classification = this.classifyPlannerInstruction(instruction, validationErrors);
    instruction.safety_classification = classification;
    if (!classification.autonomous_execution_allowed) {
      const status = classification.classification === "Requires Human Approval" ? "requires_human_approval" : "blocked_review";
      this.db.run("UPDATE planner_instructions SET status=@status, data_json=@data_json WHERE id=@id", {
        id: instructionId,
        status,
        data_json: JSON.stringify(instruction)
      });
      this.writeInstructionLoopStatus({ status: "REVIEW_INSTRUCTION_BLOCKED", last_execution_utc: nowIso(), last_instruction_id: instructionId });
      return;
    }
    const results = [];
    const actions = Array.isArray(instruction.actions) ? instruction.actions : [];
    actions.forEach((action) => {
      results.push(this.executePlannerAction(instructionId, instruction, action));
    });
    const finalStatus = results.every((result) => result.status === "PASS") ? "executed" : "review_action_failed";
    this.recordSafeInstructionOutcome(instructionId, finalStatus, results);
    this.db.run(
      "UPDATE planner_instructions SET status=@status, data_json=@data_json WHERE id=@id",
      {
        id: instructionId,
        status: finalStatus,
        data_json: JSON.stringify(Object.assign({}, instruction, {
          orchestrator_results: results,
          executed_utc: nowIso(),
          final_status: finalStatus
        }))
      }
    );
    appendJsonl(path.join(STATE, "grok_instruction_results.jsonl"), {
      updated_utc: nowIso(),
      instruction_id: instructionId,
      status: finalStatus,
      results
    });
    this.writeInstructionLoopStatus({ status: finalStatus === "executed" ? "PASS_EXECUTED" : "REVIEW_ACTION_FAILED", last_execution_utc: nowIso(), last_instruction_id: instructionId });
  }

  instructionLoopSummary() {
    const rows = this.db.all("SELECT id,created_utc,expires_utc,source,risk_level,approved,requires_user_decision,status,data_json FROM planner_instructions ORDER BY created_utc DESC LIMIT 50");
    const classificationCounts = { Safe: 0, Review: 0, "Requires Human Approval": 0 };
    const statusCounts = {};
    const recent = rows.map((row) => {
      let data = {};
      try { data = JSON.parse(row.data_json || "{}"); } catch (_) {}
      const classification = data.safety_classification || this.classifyPlannerInstruction(this.normalizePlannerInstruction(data), this.validatePlannerInstruction(this.normalizePlannerInstruction(data)));
      const name = classification.classification || "Review";
      classificationCounts[name] = (classificationCounts[name] || 0) + 1;
      statusCounts[row.status] = (statusCounts[row.status] || 0) + 1;
      return {
        instruction_id: row.id,
        created_utc: row.created_utc,
        expires_utc: row.expires_utc,
        source: row.source,
        risk_level: row.risk_level,
        status: row.status,
        classification: name,
        reasons: classification.reasons || [],
        action_count: Array.isArray(data.actions) ? data.actions.length : 0,
        summary: data.summary || data.title || ""
      };
    });
    const last = recent.length ? recent[0] : {};
    return {
      component: "jasonos_prime_instruction_loop",
      status: rows.length ? "PASS_TRACKING" : "REVIEW_NO_INSTRUCTIONS",
      updated_utc: nowIso(),
      instruction_count: rows.length,
      classification_counts: classificationCounts,
      status_counts: Object.assign({ executed: 0, safe_queued: 0, blocked_review: 0, requires_human_approval: 0, review_action_failed: 0 }, statusCounts),
      blocked_or_review_count: recent.filter((item) => item.classification !== "Safe" || item.status === "blocked_review" || item.status === "requires_human_approval" || item.status === "review_action_failed").length,
      last_instruction_id: last.instruction_id || "",
      last_instruction_status: last.status || "",
      last_ingest_utc: "",
      last_execution_utc: "",
      recent_instructions: recent
    };
  }

  writeInstructionLoopStatus(extra) {
    const summary = Object.assign(this.instructionLoopSummary(), extra || {});
    writeJson(INSTRUCTION_LOOP_STATUS, summary);
    writeText(INSTRUCTION_LOOP_STATUS_MD, [
      "# JasonOS Prime Instruction Loop Status",
      "",
      "- Updated UTC: " + summary.updated_utc,
      "- Status: " + summary.status,
      "- Instructions tracked: " + summary.instruction_count,
      "- Safe: " + summary.classification_counts.Safe,
      "- Review: " + summary.classification_counts.Review,
      "- Requires Human Approval: " + summary.classification_counts["Requires Human Approval"],
      "- Executed: " + summary.status_counts.executed,
      "- Blocked/review count: " + summary.blocked_or_review_count,
      "- Last instruction: " + summary.last_instruction_id,
      "- Last instruction status: " + summary.last_instruction_status,
      "",
      "Safety: only Safe, approved, low/medium-risk, non-expired, allowlisted instructions execute autonomously."
    ].join("\r\n"));
  }

  generateCommandCenter() {
    const script = "D:/PlexTools/Foundry/workers/JasonOS_Prime_CommandCenterDashboard_v1.js";
    if (!fs.existsSync(script)) return;
    this.runDetachedNode(script, "command_center_generator");
  }

  syncPublicStatus() {
    const status = this.status();
    writeJson(STATUS_PATH, status);
    this.writeTaskOwnershipManifest();
    this.writeLegacyRetirementManifest();
  }

  runDetachedNode(script, name) {
    const pause = this.pauseState();
    if (pause.safe_mode || pause.pause_all) return;
    if (!this.launchAllowed("detached", name, false)) {
      this.recordManagedJob(name, "HELD_LAUNCH_BUDGET", { script, pause, launch_health: this.launchHealthSummary() });
      return;
    }
    const child = childProcess.spawn(process.execPath, [script], {
      detached: true,
      stdio: "ignore",
      windowsHide: true
    });
    const childRecord = { pid: child.pid || null, name, script, started_utc: nowIso(), critical: false };
    if (childRecord.pid) this.trackedChildren.push(childRecord);
    this.recordLaunch("spawn_detached", name, { script, pid: child.pid || null, parent_job_class: "detached", critical: false, launch_latency_ms: 0, process_runtime_ms: null });
    child.unref();
    log("info", "detached_node_started", { name, script, pid: child.pid });
  }
}

process.on("uncaughtException", (error) => {
  log("error", "uncaught_exception", { error: String(error && error.stack ? error.stack : error) });
});

process.on("unhandledRejection", (error) => {
  log("error", "unhandled_rejection", { error: String(error && error.stack ? error.stack : error) });
});

const orchestrator = new Orchestrator();
orchestrator.start();
