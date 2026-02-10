/* ── tikr_scraper.js ── MAIN world ── ULTRA VERBOSE ───────────── */
(() => {
  const NS = "TIKR-AI";
  const ts = () => new Date().toISOString();
  const log  = (...a) => console.log(`[${NS}][MAIN]`, ts(), ...a);
  const warn = (...a) => console.warn(`[${NS}][MAIN]`, ts(), ...a);
  const err  = (...a) => console.error(`[${NS}][MAIN]`, ts(), ...a);

  window.addEventListener("unhandledrejection", (e) => err("UNHANDLED REJECTION", e.reason));
  window.addEventListener("error", (e) => err("ERROR EVENT", e.message, e.filename, e.lineno, e.colno));

  if (window.__tikrScraper) {
    log("Already present, skipping injection.");
    return;
  }

  // 7 jobs (los que tú ya sacaste):
  // Income Statement, Balance Sheet, Cash Flow, Ratios, Valuation Multiples, Analyst Price Targets, Consensus Estimates
  const JOBS = {
    incomeStatement: { section: "financials", tab: "is", label: "Income Statement" },
    balanceSheet:    { section: "financials", tab: "bs", label: "Balance Sheet" },
    cashFlow:        { section: "financials", tab: "cf", label: "Cash Flow" },
    ratios:          { section: "financials", tab: "r",  label: "Ratios" },
    multiples:       { section: "multiples",  tab: "multi",  label: "Valuation Multiples" },
    analystTargets:  { section: "multiples",  tab: "street", label: "Analyst Price Targets" },
    estimates:       { section: "estimates",  tab: "est",    label: "Consensus Estimates" }
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const esc   = (s) => (s ?? "").replace(/[|]/g, "\\|");
  const norm  = (s) => esc((s ?? "").replace(/\s+/g, " ").trim());

  function relay(msg) {
    log("relay -> __tikr_to_bg", msg);
    document.dispatchEvent(new CustomEvent("__tikr_to_bg", { detail: JSON.stringify(msg) }));
  }

  function toast(text) {
    let t = document.getElementById("__tikr_toast");
    if (t) t.remove();
    t = document.createElement("div");
    t.id = "__tikr_toast";
    t.textContent = text;
    t.style.cssText =
      "position:fixed;right:16px;bottom:16px;z-index:999999;" +
      "background:rgba(0,0,0,.85);color:#fff;padding:10px 14px;" +
      "border-radius:10px;font:13px/1.4 system-ui,sans-serif;" +
      "box-shadow:0 6px 18px rgba(0,0,0,.25);";
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
  }

  function getIds() {
    const u = new URL(location.href);
    return {
      cid: u.searchParams.get("cid") || "",
      tid: u.searchParams.get("tid") || "",
      ref: u.searchParams.get("ref") || ""
    };
  }

  function getMeta() {
    // Título típico: "US$278.12 Apple Inc. (AAPL) | TIKR"
    const t = document.title || "";
    const close = t.lastIndexOf(")");
    const open  = close > 0 ? t.lastIndexOf("(", close) : -1;
    const ticker = (open > 0 && close > open) ? t.substring(open + 1, close).trim() : "";
    const beforeParen = open > 0 ? t.substring(0, open).trim() : t.trim();

    // extrae precio si empieza con "US$..."
    let price = "";
    let name = beforeParen;
    const parts = beforeParen.split(" ");
    if (parts.length >= 2 && /[$€£]|US\$/i.test(parts[0])) {
      price = parts[0];
      name = beforeParen.substring(price.length).trim();
    }
    // limpia posible "| TIKR"
    name = name.replace(/\|\s*TIKR.*$/i, "").trim();

    return { ticker, name, price, title: t };
  }

  function getRouter() {
    const app = document.querySelector("#app");
    return (
      app?.__vue__?.$router ||
      app?.__vue_app__?.config?.globalProperties?.$router ||
      null
    );
  }

  function getStore() {
    const app = document.querySelector("#app");
    return (
      app?.__vue__?.$store ||
      app?.__vue_app__?.config?.globalProperties?.$store ||
      null
    );
  }

  function urlsMatch(a, b) {
    try {
      const ua = new URL(a);
      const ub = new URL(b);
      if (ua.origin !== ub.origin || ua.pathname !== ub.pathname) return false;
      const pa = ua.searchParams;
      const pb = ub.searchParams;
      for (const [k, v] of pa) { if (pb.get(k) !== v) return false; }
      for (const [k, v] of pb) { if (pa.get(k) !== v) return false; }
      return true;
    } catch { return a === b; }
  }

  async function navigateTo(section, tab, ids, runId) {
    const path = `/stock/${section}`;
    const query = { cid: ids.cid, tid: ids.tid, tab, ref: ids.ref };

    const target =
      location.origin + path +
      `?cid=${encodeURIComponent(ids.cid)}` +
      `&tid=${encodeURIComponent(ids.tid)}` +
      `&tab=${encodeURIComponent(tab)}` +
      `&ref=${encodeURIComponent(ids.ref)}`;

    log("navigateTo(begin)", { runId, from: location.href, target, section, tab });

    if (urlsMatch(location.href, target)) {
      log("navigateTo(skip already at target)", { runId });
      return true;
    }

    const router = getRouter();
    log("router", { runId, hasRouter: !!router, hasPush: typeof router?.push === "function" });

    try {
      if (router?.push) {
        router.push({ path, query });
      } else {
        warn("Vue router not found, using pushState + popstate fallback", { runId });
        history.pushState({}, "", target);
        window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
      }
    } catch (e) {
      err("navigateTo push threw", { runId, error: String(e) });
      try {
        history.pushState({}, "", target);
        window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
      } catch (_) {}
    }

    const t0 = Date.now();
    while (Date.now() - t0 < 12000) {
      if (urlsMatch(location.href, target)) {
        log("navigateTo(done)", { runId, ms: Date.now() - t0 });
        return true;
      }
      await sleep(150);
    }
    warn("navigateTo(timeout)", { runId, finalHref: location.href, target });
    return false;
  }

  async function setPeriod(period, runId) {
    const isQ = period === "quarterly";
    const wanted = isQ
      ? (txt) => txt === "trimestral" || txt === "quarterly"
      : (txt) => txt === "anual" || txt === "annual";

    const buttons = [...document.querySelectorAll("button")];
    const btn = buttons.find((b) => wanted((b.innerText || "").trim().toLowerCase()));

    if (!btn) {
      warn("setPeriod: button not found", { runId, period });
      return false;
    }

    const isActive =
      btn.classList.contains("primaryAction") ||
      btn.classList.contains("v-btn--active");

    log("setPeriod(found)", { runId, label: btn.innerText?.trim(), isActive });

    if (!isActive) {
      btn.click();
      log("setPeriod(clicked)", { runId, label: btn.innerText?.trim() });
      await sleep(1800);
    }
    return true;
  }

  async function waitForTable(runId, timeoutMs = 25000) {
    const t0 = Date.now();
    let ticks = 0;

    while (Date.now() - t0 < timeoutMs) {
      ticks++;
      const tables = [...document.querySelectorAll("table")];
      let best = null, bestR = 0;

      for (const t of tables) {
        const r = t.querySelectorAll("tr").length;
        if (r > bestR) { bestR = r; best = t; }
      }

      if (ticks % 4 === 0) log("waitForTable(tick)", { runId, ms: Date.now() - t0, tables: tables.length, bestRows: bestR });

      if (best && bestR > 2) return best;

      await sleep(250);
    }

    warn("waitForTable(timeout)", { runId, timeoutMs });
    return null;
  }

  function tableToMarkdown(table) {
    const rows = [];
    const trs = table.querySelectorAll("tr");
    for (const tr of trs) {
      const cells = [...tr.querySelectorAll("th,td")].map((c) => norm(c.innerText));
      if (cells.length && cells.some((x) => x !== "")) rows.push(cells);
    }
    if (!rows.length) return "";
    const w = Math.max(...rows.map((r) => r.length));
    const pad = (r) => r.concat(Array(w - r.length).fill(""));
    const hdr  = pad(rows[0]);
    const sep  = hdr.map(() => "---");
    const body = rows.slice(1).map(pad);
    return [hdr, sep, ...body].map((r) => `| ${r.join(" | ")} |`).join("\n"); // FIX
  }

  function scrapeAllTablesOnPage(runId) {
    const tables = [...document.querySelectorAll("table")]
      .filter((t) => t.querySelectorAll("tr").length > 2);
    log("scrapeAllTablesOnPage", { runId, tables: tables.length });

    const parts = tables.map(tableToMarkdown).filter(Boolean);
    return parts.join("\n\n"); // FIX
  }

  async function run(jobKeys, period, runId) {
    const ids = getIds();
    const meta = getMeta();
    const total = jobKeys.length;

    log("RUN START", { runId, href: location.href, ids, meta, total, period, jobKeys });

    const chunks = [];
    chunks.push(`# ${meta.ticker} \u2013 ${meta.name}`); // FIX \u2013
    chunks.push(`Price: ${meta.price}  |  Extracted: ${new Date().toISOString()}`);
    chunks.push(`Period: ${period}  |  Sections: ${total}`);
    chunks.push("---\n"); // FIX

    let done = 0;

    for (const key of jobKeys) {
      const job = JOBS[key];
      done++;

      if (!job) {
        warn("Unknown job key", { runId, key });
        continue;
      }

      relay({ type: "SCRAPE_PROGRESS", done, total, current: job.label, runId });
      toast(`(${done}/${total}) ${job.label}…`);

      const okNav = await navigateTo(job.section, job.tab, ids, runId);
      await sleep(1200);

      if (!okNav) {
        chunks.push(`## ${job.label}\n\n_Navigation failed (timeout)._ \n`);
        continue;
      }

      // solo en financials/estimates intentamos setear annual/quarterly
      if (job.section === "financials" || job.section === "estimates") {
        await setPeriod(period, runId);
        await sleep(400);
      }

      const table = await waitForTable(runId, 25000);
      if (!table) {
        chunks.push(`## ${job.label}\n\n_No data available (no table found)._ \n`);
        continue;
      }

      const md = scrapeAllTablesOnPage(runId);
      chunks.push(`## ${job.label}\n\n${md}\n`);
      log("section extracted", { runId, label: job.label, chars: md.length });
    }

    const fullText = chunks.join("\n"); // FIX
    relay({ type: "SCRAPE_DONE", text: fullText, meta, runId });
    toast("✅ All done!");
    log("RUN END", { runId, chars: fullText.length });

    try { await navigator.clipboard.writeText(fullText); }
    catch (e) { warn("clipboard write failed", { runId, error: String(e) }); }
  }

  /**
   * Adds ALL chartable rows from the current financial table to the Highchart.
   * Works on Financials tabs (IS, BS, CF) and Ratios.
   *
   * Row-ID patterns (reverse-engineered from TIKR's own click handlers):
   *   val  → "val-{name}  {dataitemid}"
   *   pct  → "pct-{name}  {dataitemid}"
   *   dxdt → "dxdt-{parentValName} {dataitemid[0]}"
   *   div  → "div-{nameA} {idA}-{nameB} {idB}"
   */
  async function tableAddAll(runId) {
    const store = getStore();
    if (!store) { err("tableAddAll: no store"); return; }

    const fin = store.state.ciq.financials?.a;
    if (!fin) { err("tableAddAll: no financials data"); return; }

    // ── Determine which data group to use based on the current tab ──
    const tab = new URL(location.href).searchParams.get("tab") || "is";
    const TAB_TO_GROUP = { is: 0, bs: 1, cf: 2, r: 3 };
    const groupIdx = TAB_TO_GROUP[tab];
    if (groupIdx == null) {
      warn("tableAddAll: unsupported tab", tab);
      relay({ type: "TABLE_ADD_ALL_RESULT", added: 0, error: `Tab "${tab}" not supported`, runId });
      return;
    }

    const rows = fin.financials?.[groupIdx];
    if (!rows?.length) {
      warn("tableAddAll: no rows in group", groupIdx);
      relay({ type: "TABLE_ADD_ALL_RESULT", added: 0, error: "No data rows", runId });
      return;
    }

    const period = store.state.ciq.financialsChart?.a ? "a" : "a"; // always annual for now
    const current = store.state.ciq.financialsChart?.a ?? {};

    // ── Build a map: dataitemid → lowercase name (val rows only) ──
    const idToName = {};
    for (const row of rows) {
      if (row.formula === "val" && typeof row.dataitemid === "number") {
        idToName[String(row.dataitemid)] = row.name.toLowerCase();
      }
    }

    // ── Track parent val name for dxdt rows ──
    let parentValName = "";
    let added = 0;
    const skipped = [];

    for (const row of rows) {
      const formula = row.formula;

      // Skip headers and rows without data
      if (formula === "h3") continue;
      const hasData = Object.keys(row).some((k) => k.includes("##"));
      if (!hasData) continue;

      // Update parent tracking
      if (formula === "val") {
        parentValName = row.name.toLowerCase();
      }

      // ── Build rowId ──
      let rowId;

      if (formula === "val") {
        rowId = `${formula}-${row.name.toLowerCase()} ${row.dataitemid}`;
      } else if (formula === "pct") {
        rowId = `${formula}-${row.name.toLowerCase()} ${row.dataitemid}`;
      } else if (formula === "dxdt" && Array.isArray(row.dataitemid)) {
        // Uses the parent val row's name
        rowId = `dxdt-${parentValName} ${row.dataitemid[0]}`;
      } else if (formula === "div" && Array.isArray(row.dataitemid) && row.dataitemid.length >= 2) {
        const nameA = idToName[row.dataitemid[0]] || row.dataitemid[0];
        const nameB = idToName[row.dataitemid[1]] || row.dataitemid[1];
        rowId = `div-${nameA} ${row.dataitemid[0]}-${nameB} ${row.dataitemid[1]}`;
      } else {
        // Fallback for any other formula
        const did = Array.isArray(row.dataitemid) ? row.dataitemid.join(",") : row.dataitemid;
        rowId = `${formula}-${row.name.toLowerCase()} ${did}`;
      }

      // Skip if already in chart
      if (rowId in current) {
        skipped.push(rowId);
        continue;
      }

      // ── Commit to chart ──
      try {
        store.commit("ciq/addToChart", {
          row:       row,
          rowId:     rowId,
          chartType: "financialsChart",
          period:    period,
        });
        added++;
      } catch (e) {
        warn("tableAddAll: commit failed", { rowId, error: String(e) });
      }

      await sleep(30); // small pause for Vue reactivity
    }

    const total = Object.keys(store.state.ciq.financialsChart?.a ?? {}).length;
    log("tableAddAll done", { runId, added, skipped: skipped.length, totalInChart: total });

    toast(`✅ Added ${added} metrics to chart (${total} total)`);

    relay({
      type:    "TABLE_ADD_ALL_RESULT",
      added,
      skipped: skipped.length,
      total,
      tab,
      runId,
    });
  }

  // Escucha SCRAPE_CMD desde content.js
  document.addEventListener("__tikr_to_main", (e) => {
    const raw = e?.detail;
    log("__tikr_to_main event", { rawPreview: String(raw).slice(0, 200) });

    try {
      const msg = JSON.parse(raw);
      if (!msg || typeof msg !== "object" || typeof msg.type !== "string") {
        warn("__tikr_to_main: ignoring message with invalid shape", { raw });
        return;
      }
      if (msg.type === "SCRAPE_CMD") {
        if (!Array.isArray(msg.jobs)) {
          warn("__tikr_to_main: SCRAPE_CMD with non-array jobs, ignoring", { raw });
          return;
        }
        run(msg.jobs, msg.period || "annual", msg.runId || null);
      }
      if (msg.type === "TABLE_ADD_ALL_CMD") {
        tableAddAll(msg.runId || null);
      }
    } catch (ex) {
      err("failed parsing __tikr_to_main.detail", String(ex));
    }
  });

  window.__tikrScraper = { run, JOBS, tableAddAll };
  log("tikr_scraper ready", { href: location.href });
})();
