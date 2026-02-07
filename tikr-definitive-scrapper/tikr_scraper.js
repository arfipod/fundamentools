/* ── tikr_scraper.js ── auto-scrape engine ─────────────────── */
(() => {
  if (window.__tikrScraper) return;

  /* ═══════════════════ constants ═══════════════════ */

  /**
   * Master map of every scrape-able view.
   *   key   → unique job id (used in popup checkboxes)
   *   section / tab → build the URL
   *   label → human-readable name shown in output
   */
  const JOBS = {
    // ── Financials ──
    incomeStatement : { section: "financials", tab: "is",   label: "Income Statement" },
    balanceSheet    : { section: "financials", tab: "bs",   label: "Balance Sheet" },
    cashFlow        : { section: "financials", tab: "cf",   label: "Cash Flow" },
    ratios          : { section: "financials", tab: "r",    label: "Ratios" },
    segments        : { section: "financials", tab: "seg",  label: "Segments" },
    // ── Valuation ──
    multiples       : { section: "multiples",  tab: "multi",  label: "Valuation Multiples" },
    analystTargets  : { section: "multiples",  tab: "street", label: "Analyst Price Targets" },
    competitors     : { section: "multiples",  tab: "comp",   label: "Competitors" },
    // ── Estimates ──
    estimates       : { section: "estimates",  tab: "est",  label: "Consensus Estimates" },
    guidance        : { section: "estimates",  tab: "mgmt", label: "Management Guidance" },
    earningsReview  : { section: "estimates",  tab: "er",   label: "Earnings Review" },
    beatsMisses     : { section: "estimates",  tab: "bm",   label: "Beats & Misses" },
    estBreakdown    : { section: "estimates",  tab: "eb",   label: "Estimates Breakdown" },
  };

  /* ═══════════════════ helpers ═══════════════════ */

  const sleep   = (ms) => new Promise((r) => setTimeout(r, ms));
  const esc     = (s) => (s ?? "").replace(/\\|/g, "\\\\|");
  const norm    = (s) => esc((s ?? "").replace(/\\s+/g, " ").trim());

  function relay(msg) {
    chrome.runtime.sendMessage(msg).catch(() => {});
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

  /** Parse the current URL to get cid, tid, ref */
  function getIds() {
    const u = new URL(location.href);
    return {
      cid: u.searchParams.get("cid") || "",
      tid: u.searchParams.get("tid") || "",
      ref: u.searchParams.get("ref") || "vx95f7",
    };
  }

  /** Parse company name + ticker from <title> */
  function getMeta() {
    // title format: "US$108.70 The Walt Disney Company (DIS) - Terminal TIKR"
    const t = document.title;
    const ticker = t.match(/\\(([A-Z0-9.]+)\\)/)?.[1] || "";
    const name = t.match(/(?:US\\$[\\d.,]+\\s+)?(.+?)\\s*\\(/)?.[1] || "";
    const price = t.match(/US\\$([\\d.,]+)/)?.[1] || "";
    return { ticker, name, price };
  }

  /** Build path for a job */
  function buildPath(job, ids) {
    return `/stock/${job.section}?cid=${ids.cid}&tid=${ids.tid}&tab=${job.tab}&ref=${ids.ref}`;
  }

  /* ═══════════════════ navigation ═══════════════════ */

  /**
   * Navigate by pushing the Vue-router path.
   * Falls back to location.href if router isn't available.
   * Returns once URL has changed.
   */
  async function navigateTo(path) {
    const target = location.origin + path;
    if (location.href === target) return;  // already there

    // Try Vue router first (SPA-friendly, no full reload)
    const router = document.querySelector("#app")?.__vue_app__?.config?.globalProperties?.$router
                ?? document.querySelector("#app")?.__vue__?.$router;
    if (router) {
      try { await router.push(path); } catch (_) { location.href = target; }
    } else {
      location.href = target;
    }

    // Wait until URL matches
    const t0 = Date.now();
    while (Date.now() - t0 < 8000) {
      if (location.href === target) break;
      await sleep(150);
    }
  }

  /* ═══════════════════ period selector ═══════════════════ */

  /**
   * Click the Anual / Trimestral button.
   * Works on Financials & Estimates pages.
   */
  async function setPeriod(period /* "annual" | "quarterly" */) {
    const wanted = period === "quarterly"
      ? /^(trimestral|quarterly)$/i
      : /^(anual|annual)$/i;

    const btn = [...document.querySelectorAll("button")].find((b) =>
      wanted.test(b.innerText.trim())
    );
    if (!btn) return;

    // Already active?
    if (btn.classList.contains("primaryAction") || btn.classList.contains("v-btn--active")) return;

    btn.click();
    await sleep(1800);   // wait for table re-render
  }

  /* ═══════════════════ table extraction ═══════════════════ */

  /**
   * Wait until at least one <table> with >2 rows appears.
   * Returns the best (largest) table on the page.
   */
  async function waitForTable(timeout = 20000) {
    const t0 = Date.now();
    while (Date.now() - t0 < timeout) {
      const tables = [...document.querySelectorAll("table")];
      // pick the one with most rows
      let best = null, bestR = 0;
      for (const t of tables) {
        const r = t.querySelectorAll("tr").length;
        if (r > bestR) { bestR = r; best = t; }
      }
      if (best && bestR > 2) return best;
      await sleep(300);
    }
    return null;
  }

  /**
   * Convert any TIKR <table> into a Markdown string.
   * Handles: table.fintab, table.guidance, un-classed tables, multi-tables.
   */
  function tableToMarkdown(table) {
    const rows = [];
    for (const tr of table.querySelectorAll("tr")) {
      const cells = [...tr.querySelectorAll("th,td")].map((c) => norm(c.innerText));
      if (cells.length && cells.some((c) => c !== "")) rows.push(cells);
    }
    if (!rows.length) return "";

    const w = Math.max(...rows.map((r) => r.length));
    const pad = (r) => r.concat(Array(w - r.length).fill(""));
    const hdr = pad(rows[0]);
    const sep = hdr.map(() => "---");
    const body = rows.slice(1).map(pad);
    return [hdr, sep, ...body].map((r) => `| ${r.join(" | ")} |`).join("\\n");
  }

  /**
   * Scrape ALL tables visible on the current page (some views have 2+).
   * Returns them concatenated with a blank line separator.
   */
  function scrapeAllTablesOnPage() {
    const tables = [...document.querySelectorAll("table")];
    if (!tables.length) return "";
    return tables.map(tableToMarkdown).filter(Boolean).join("\\n\\n");
  }

  /* ═══════════════════ main runner ═══════════════════ */

  /**
   * @param {string[]} jobKeys  – subset of JOBS keys the user chose
   * @param {"annual"|"quarterly"} period
   */
  async function run(jobKeys, period) {
    const ids  = getIds();
    const meta = getMeta();
    const total = jobKeys.length;
    let done = 0;

    // Header
    const chunks = [];
    chunks.push(`# ${meta.ticker} – ${meta.name}`);
    chunks.push(`Price: US$${meta.price}  |  Extracted: ${new Date().toISOString()}`);
    chunks.push(`Period: ${period}  |  Sections: ${total}`);
    chunks.push("---\\n");

    for (const key of jobKeys) {
      const job = JOBS[key];
      if (!job) continue;

      done++;
      relay({ type: "SCRAPE_PROGRESS", done, total, current: job.label });
      toast(`(${done}/${total}) ${job.label}…`);

      // Navigate
      const path = buildPath(job, ids);
      await navigateTo(path);
      await sleep(1500);          // let Vue render

      // Wait for table
      const table = await waitForTable();
      if (!table) {
        chunks.push(`## ${job.label}\\n\\n_No data available._\\n`);
        continue;
      }

      // Set period (only relevant for financials & estimates, harmless elsewhere)
      if (["financials", "estimates"].includes(job.section)) {
        await setPeriod(period);
        // Re-wait in case period change triggered a re-render
        await waitForTable();
      }

      // Extract
      const md = scrapeAllTablesOnPage();
      chunks.push(`## ${job.label}\\n\\n${md}\\n`);
    }

    // Done – assemble
    const fullText = chunks.join("\\n");

    relay({ type: "SCRAPE_DONE", text: fullText, meta });
    toast("✅ All done!");

    // Also copy to clipboard
    try { await navigator.clipboard.writeText(fullText); } catch (_) {}
  }

  /* ═══════════════════ expose ═══════════════════ */

  window.__tikrScraper = { run, JOBS };
})();