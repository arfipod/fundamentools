/* ── content.js ── ISOLATED world ── ULTRA VERBOSE ───────────── */
(() => {
  const NS = "TIKR-AI";
  const ts = () => new Date().toISOString();
  const log  = (...a) => console.log(`[${NS}][CONTENT]`, ts(), ...a);
  const warn = (...a) => console.warn(`[${NS}][CONTENT]`, ts(), ...a);
  const err  = (...a) => console.error(`[${NS}][CONTENT]`, ts(), ...a);

  window.addEventListener("unhandledrejection", (e) => err("UNHANDLED REJECTION", e.reason));
  window.addEventListener("error", (e) => err("ERROR EVENT", e.message, e.filename, e.lineno, e.colno));

  log("content.js injected", { href: location.href, readyState: document.readyState });

  const esc  = (s) => (s == null ? "" : String(s)).replace(/[|]/g, "\\|").trim();
  const norm = (s) => esc((s == null ? "" : String(s)).replace(/\s+/g, " ").trim());

  function tableToMd(table) {
    const rows = [];
    const trs = table.querySelectorAll("tr");
    for (let i = 0; i < trs.length; i++) {
      const cells = Array.from(trs[i].querySelectorAll("th,td")).map((c) => norm(c.innerText));
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
    setTimeout(() => t.remove(), 2200);
  }

  function relay(msg) {
    log("relay -> chrome.runtime.sendMessage", msg);
    chrome.runtime.sendMessage(msg).catch((e) => {
      warn("chrome.runtime.sendMessage rejected", String(e));
    });
  }

  /* ════════════ pick mode ════════════ */
  let picking = false, highlighted = null;

  function highlight(el) {
    if (highlighted) highlighted.style.outline = "";
    highlighted = el;
    el.style.outline = "3px solid #00aaff";
  }

  function cleanPick() {
    picking = false;
    document.removeEventListener("mousemove", onMove, true);
    document.removeEventListener("click", onPick, true);
    document.removeEventListener("keydown", onEsc, true);
    if (highlighted) highlighted.style.outline = "";
    highlighted = null;
    log("pick mode cleaned");
  }

  function onMove(e) {
    if (!picking) return;
    const t = e.target ? e.target.closest("table") : null;
    if (t) highlight(t);
  }

  function onPick(e) {
    if (!picking) return;
    const t = e.target ? e.target.closest("table") : null;
    if (!t) return;

    e.preventDefault();
    e.stopPropagation();

    const md = tableToMd(t);
    log("picked table", { rows: t.querySelectorAll("tr").length, mdLen: md.length });

    cleanPick();
    relay({ type: "MD_RESULT", markdown: md });

    navigator.clipboard.writeText(md).then(
      () => toast("✅ Table copied as Markdown"),
      () => toast("⚠ Could not copy (open side-panel?)")
    );
  }

  function onEsc(e) {
    if (e.key === "Escape" && picking) {
      log("pick cancelled via ESC");
      cleanPick();
      toast("Cancelled");
    }
  }

  /* ════════════ bridge: MAIN -> ISOLATED ════════════ */
  if (window.__tikrBridgeHandler) {
    document.removeEventListener("__tikr_to_bg", window.__tikrBridgeHandler);
    log("removed previous __tikr_to_bg listener");
  }

  window.__tikrBridgeHandler = (e) => {
    const raw = e?.detail;
    log("bridge MAIN->CONTENT event __tikr_to_bg", { rawPreview: String(raw).slice(0, 200) });
    try {
      const msg = JSON.parse(raw);
      if (!msg || typeof msg !== "object" || typeof msg.type !== "string") {
        warn("__tikr_to_bg: ignoring message with invalid shape", { raw });
        return;
      }
      relay(msg);
    } catch (ex) {
      err("failed parsing __tikr_to_bg.detail", String(ex));
    }
  };

  document.addEventListener("__tikr_to_bg", window.__tikrBridgeHandler);

  /* ════════════ commands from background ════════════ */
  if (window.__tikrOnMessage) {
    chrome.runtime.onMessage.removeListener(window.__tikrOnMessage);
    log("removed previous onMessage listener");
  }

  window.__tikrOnMessage = (msg, sender, sendResponse) => {
    log("chrome.runtime.onMessage (to content)", msg);

    try {
      if (msg?.type === "ENABLE_PICK_MODE") {
        cleanPick();
        picking = true;
        document.addEventListener("mousemove", onMove, true);
        document.addEventListener("click", onPick, true);
        document.addEventListener("keydown", onEsc, true);
        toast("Click any table (Esc to cancel)");
        sendResponse?.({ ok: true });
        return false;
      }

      if (msg?.type === "SCRAPE_CMD") {
        log("forwarding SCRAPE_CMD to MAIN via __tikr_to_main", {
          jobs: msg.jobs,
          period: msg.period,
          runId: msg.runId,
          href: location.href
        });

        document.dispatchEvent(new CustomEvent("__tikr_to_main", {
          detail: JSON.stringify(msg)
        }));

        sendResponse?.({ ok: true });
        return false;
      }

      sendResponse?.({ ok: true, ignored: true });
      return false;

    } catch (ex) {
      err("onMessage handler exception", String(ex));
      try { sendResponse?.({ ok: false, error: String(ex) }); } catch (_) {}
      return false;
    }
  };

  chrome.runtime.onMessage.addListener(window.__tikrOnMessage);

  /* ════════════ signal ready ════════════ */
  chrome.runtime.sendMessage({ type: "CONTENT_READY" }).then(() => {
    log("sent CONTENT_READY");
  }).catch((e) => {
    warn("failed sending CONTENT_READY", String(e));
  });
})();
