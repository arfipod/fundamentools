/* ── content.js ── pick-mode + message router ──────────────── */
(() => {
  if (window.__tikrContentLoaded) return;
  window.__tikrContentLoaded = true;

  /* ════════════ helpers ════════════ */

  const esc = (s) => (s ?? "").replace(/\\|/g, "\\\\|").trim();
  const norm = (s) => esc((s ?? "").replace(/\\s+/g, " ").trim());

  function tableToMd(table) {
    const rows = [];
    for (const tr of table.querySelectorAll("tr")) {
      const cells = [...tr.querySelectorAll("th,td")].map((c) => norm(c.innerText));
      if (cells.length) rows.push(cells);
    }
    if (!rows.length) return "";
    const w = Math.max(...rows.map((r) => r.length));
    const pad = (r) => r.concat(Array(w - r.length).fill(""));
    const hdr = pad(rows[0]);
    const sep = hdr.map(() => "---");
    const body = rows.slice(1).map(pad);
    return [hdr, sep, ...body].map((r) => `| ${r.join(" | ")} |`).join("\\n");
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
  }

  function onMove(e) {
    if (!picking) return;
    const t = e.target?.closest("table");
    if (t) highlight(t);
  }

  function onPick(e) {
    if (!picking) return;
    const t = e.target?.closest("table");
    if (!t) return;
    e.preventDefault();
    e.stopPropagation();
    const md = tableToMd(t);
    cleanPick();
    relay({ type: "MD_RESULT", markdown: md });
    navigator.clipboard.writeText(md).then(
      () => toast("✅ Table copied as Markdown"),
      () => toast("⚠ Open side-panel to copy")
    );
  }

  function onEsc(e) {
    if (e.key === "Escape" && picking) {
      cleanPick();
      relay({ type: "MD_RESULT", markdown: "" });
      toast("Cancelled");
    }
  }

  function relay(msg) {
    chrome.runtime.sendMessage(msg).catch(() => {});
  }

  /* ════════════ message listener ════════════ */

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "ENABLE_PICK_MODE") {
      cleanPick();
      picking = true;
      document.addEventListener("mousemove", onMove, true);
      document.addEventListener("click", onPick, true);
      document.addEventListener("keydown", onEsc, true);
      toast("Click any table (Esc to cancel)");
    }

    if (msg.type === "SCRAPE_CMD" && window.__tikrScraper) {
      window.__tikrScraper.run(msg.jobs, msg.period);
    }
  });
})();