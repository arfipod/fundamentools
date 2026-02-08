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

  const JOBS = {
    incomeStatement : { section: "financials", tab: "is",    label: "Income Statement" },
    balanceSheet    : { section: "financials", tab: "bs",    label: "Balance Sheet" },
    cashFlow        : { section: "financials", tab: "cf",    label: "Cash Flow" },
    ratios          : { section: "financials", tab: "r",     label: "Ratios" },
    segments        : { section: "financials", tab: "seg",   label: "Segments" },
    multiples       : { section: "multiples",  tab: "multi", label: "Valuation Multiples" },
    analystTargets  : { section: "multiples",  tab: "street",label: "Analyst Price Targets" },
    competitors     : { section: "multiples",  tab: "comp",  label: "Competitors" },
    estimates       : { section: "estimates",  tab: "est",   label: "Consensus Estimates" },
    guidance        : { section: "estimates",  tab: "mgmt",  label: "Management Guidance" },
    earningsReview  : { section: "estimates",  tab: "er",    label: "Earnings Review" },
    beatsMisses     : { section: "estimates",  tab: "bm",    label: "Beats & Misses" },
    estBreakdown    : { section: "estimates",  tab: "eb",    label: "Estimates Breakdown" },
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const esc   = (s) => (s ?? "").replace(/[|]/g, "\\|");
  const norm  = (s) => esc((s ?? "").replace(/\s+/g, " ").trim());

  /* ══════ Comunicación con content.js (ISOLATED) via CustomEvent ══════ */
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
      ref: u.searchParams.get("ref") || "vx95f7",
    };
  }

  function getMeta() {
    const t = document.title || "";
    const close = t.lastIndexOf(")");
    const open  = close > 0 ? t.lastIndexOf("(", close) : -1;
    const ticker = (open > 0 && close > open) ? t.substring(open + 1, close) : "";
    const nameStart = ticker ? t.indexOf(" ") + 1 : 0;
    const price = nameStart > 1 ? t.substring(0, nameStart).trim() : "";
    const nameEnd = open > 0 ? open : t.length;
    const name = t.substring(nameStart, nameEnd).trim();
    return { ticker, name, price, title: t };
  }

  /* ══════ Navegación via Vue Router (MAIN world) ══════ */
  function getRouter() {
    const app = document.querySelector("#app");
    const r =
      app?.__vue__?.$router ||
      app?.__vue_app__?.config?.globalProperties?.$router ||
      null;
    return r;
  }

  function describeRouter(router) {
    try {
      const cr = router?.currentRoute?.value || router?.currentRoute;
      return {
        hasRouter: !!router,
        hasPush: typeof router?.push === "function",
        current: cr?.fullPath || cr?.path || null,
      };
    } catch (e) {
      return { hasRouter: !!router, error: String(e) };
    }
  }

  async function navigateTo(section, tab, ids, runId) {
    const path  = "/stock/" + section;
    const query = { cid: ids.cid, tid: ids.tid, tab: tab, ref: ids.ref };

    const target =
      location.origin + path +
      "?cid=" + encodeURIComponent(ids.cid) +
      "&tid=" + encodeURIComponent(ids.tid) +
      "&tab=" + encodeURIComponent(tab) +
      "&ref=" + encodeURIComponent(ids.ref);

    log("navigateTo(begin)", { runId, from: location.href, target, section, tab });

    if (location.href === target) {
      log("navigateTo(skip already at target)", { runId });
      return true;
    }

    const router = getRouter();
    log("router", { runId, ...describeRouter(router) });

    if (router) {
      try {
        router.push({ path, query });
        log("router.push called", { runId, path, query });
      } catch (e) {
        err("router.push threw", { runId, error: String(e) });
      }
    } else {
      warn("router not found - cannot SPA navigate", { runId });
    }

    // Esperar a que la URL cambie
    const t0 = Date.now();
    let lastHref = location.href;
    while (Date.now() - t0 < 12000) {
      if (location.href === target) {
        log("navigateTo(done)", { runId, ms: Date.now() - t0 });
        return true;
      }
      if (location.href !== lastHref) {
        log("navigateTo(progress href changed)", { runId, href: location.href });
        lastHref = location.href;
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
    const texts = buttons.map(b => (b.innerText || "").trim().toLowerCase()).filter(Boolean);
    log("setPeriod(scan)", { runId, period, buttonTextSample: texts.slice(0, 40) });

    const btn = buttons.find((b) => wanted((b.innerText || "").trim().toLowerCase()));
    if (!btn) {
      warn("setPeriod: button not found", { runId, period });
      return false;
    }

    const isActive =
      btn.classList.contains("primaryAction") ||
      btn.classList.contains("v-btn--active");

    log("setPeriod(found)", { runId, label: btn.innerText?.trim(), isActive });

    if (isActive) return true;

    btn.click();
    log("setPeriod(clicked)", { runId, label: btn.innerText?.trim() });
    await sleep(1800);
    return true;
  }

  async function setDatasetMorningstar(runId) {
    const datasetSelect = document.querySelector(".select-set");
    if (!datasetSelect) {
      warn("setDatasetMorningstar: .select-set not found", { runId });
      return false;
    }
    const current = datasetSelect.querySelector(".v-select__selection")?.innerText?.trim() || "";
    log("setDatasetMorningstar(current)", { runId, current });
    if (current === "Morningstar") return true;

    const slot = datasetSelect.querySelector(".v-input__slot");
    if (!slot) {
      warn("setDatasetMorningstar: slot not found", { runId });
      return false;
    }

    slot.click();
    await sleep(400);

    const items = [...document.querySelectorAll(".v-list-item__title")];
    const options = items.map(i => i.innerText?.trim()).filter(Boolean);
    log("setDatasetMorningstar(options)", { runId, options });

    const ms = items.find((i) => i.innerText.trim() === "Morningstar");
    if (ms) {
      ms.click();
      log("setDatasetMorningstar(clicked Morningstar)", { runId });
      await sleep(2000);
      return true;
    }

    warn("setDatasetMorningstar: Morningstar not in list", { runId });
    return false;
  }

  async function waitForTable(timeoutMs, runId) {
    const timeout = timeoutMs ?? 20000;
    const t0 = Date.now();
    let iter = 0;

    while (Date.now() - t0 < timeout) {
      iter++;

      const tables = [...document.querySelectorAll("table")];
      let best = null, bestR = 0;

      for (let i = 0; i < tables.length; i++) {
        const r = tables[i].querySelectorAll("tr").length;
        if (r > bestR) { bestR = r; best = tables[i]; }
      }

      // log cada ~1s
      if (iter % 4 === 0) {
        log("waitForTable(tick)", { runId, ms: Date.now() - t0, tables: tables.length, bestRows: bestR });
      }

      if (best && bestR > 2) {
        log("waitForTable(found)", { runId, ms: Date.now() - t0, tables: tables.length, bestRows: bestR });
        return best;
      }

      await sleep(250);
    }

    warn("waitForTable(timeout)", { runId, timeout });
    return null;
  }

  function tableToMarkdown(table) {
    const rows = [];
    const trs = table.querySelectorAll("tr");
    for (let i = 0; i < trs.length; i++) {
      const cells = [...trs[i].querySelectorAll("th,td")].map((c) => norm(c.innerText));
      if (cells.length && cells.some((c) => c !== "")) rows.push(cells);
    }
    if (!rows.length) return "";
    const w   = Math.max(...rows.map((r) => r.length));
    const pad = (r) => r.concat(Array(w - r.length).fill(""));
    const hdr  = pad(rows[0]);
    const sep  = hdr.map(() => "---");
    const body = rows.slice(1).map(pad);
    return [hdr, sep, ...body].map((r) => `| ${r.join(" | ")} |`).join("\n"); // <-- FIX
  }

  function scrapeAllTablesOnPage(runId) {
    const tables = [...document.querySelectorAll("table")];
    log("scrapeAllTablesOnPage", { runId, tables: tables.length });

    if (!tables.length) return "";
    const parts = tables.map(tableToMarkdown).filter(Boolean);

    log("scrapeAllTablesOnPage(result)", {
      runId,
      tablesWithData: parts.length,
      totalChars: parts.reduce((a, s) => a + s.length, 0),
    });

    return parts.join("\n\n"); // <-- FIX
  }

  /* ══════ MAIN RUNNER ══════ */
  async function run(jobKeys, period, runId) {
    const ids   = getIds();
    const meta  = getMeta();
    const total = jobKeys.length;
    let done    = 0;

    log("RUN START", { runId, href: location.href, ids, meta, total, period, jobKeys });

    const chunks = [];
    chunks.push(`# ${meta.ticker} \u2013 ${meta.name}`); // <-- FIX
    chunks.push(`Price: ${meta.price}  |  Extracted: ${new Date().toISOString()}`);
    chunks.push(`Period: ${period}  |  Sections: ${total}`);
    chunks.push("---\n"); // <-- FIX

    for (let k = 0; k < jobKeys.length; k++) {
      const key = jobKeys[k];
      const job = JOBS[key];
      if (!job) {
        warn("Unknown job key", { runId, key });
        continue;
      }

      done++;
      relay({ type: "SCRAPE_PROGRESS", done, total, current: job.label, runId });
      toast(`(${done}/${total}) ${job.label}…`);

      const okNav = await navigateTo(job.section, job.tab, ids, runId);
      await sleep(1200);

      if (!okNav) {
        chunks.push(`## ${job.label}\n\n_Navigation failed (timeout)._ \n`);
        continue;
      }

      if (job.tab === "seg") {
        await setDatasetMorningstar(runId);
      }

      if (job.section === "financials" || job.section === "estimates") {
        await setPeriod(period, runId);
        await sleep(400);
      }

      const table = await waitForTable(25000, runId);
      if (!table) {
        chunks.push(`## ${job.label}\n\n_No data available (no table found)._ \n`);
        continue;
      }

      const md = scrapeAllTablesOnPage(runId);
      chunks.push(`## ${job.label}\n\n${md}\n`);
      log("section extracted", { runId, label: job.label, chars: md.length });
    }

    const fullText = chunks.join("\n"); // <-- FIX
    relay({ type: "SCRAPE_DONE", text: fullText, meta, runId });
    toast("✅ All done!");
    log("RUN END", { runId, chars: fullText.length });

    try { await navigator.clipboard.writeText(fullText); }
    catch (e) { warn("clipboard write failed", { runId, error: String(e) }); }
  }

  /* ══════ Escuchar comandos desde content.js (ISOLATED) ══════ */
  document.addEventListener("__tikr_to_main", (e) => {
    const raw = e?.detail;
    log("__tikr_to_main event", { rawPreview: String(raw).slice(0, 200) });
    try {
      const msg = JSON.parse(raw);
      if (msg.type === "SCRAPE_CMD") {
        run(msg.jobs, msg.period, msg.runId || null);
      }
    } catch (ex) {
      err("failed parsing __tikr_to_main.detail", ex);
    }
  });

  window.__tikrScraper = { run, JOBS };
  log("tikr_scraper ready", { href: location.href });
})();
