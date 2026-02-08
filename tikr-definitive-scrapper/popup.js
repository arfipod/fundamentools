/* popup.js */

const DBG = true;
const TAG = "[TIKR-AI][PANEL]";
const ts  = () => new Date().toISOString();
const log = (...a) => DBG && console.log(TAG, ts(), ...a);

const $  = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const goBtn   = $("#goBtn");
const pickBtn = $("#pickBtn");
const copyBtn = $("#copyBtn");
const dlBtn   = $("#dlBtn");
const out     = $("#out");
const prog    = $("#prog");
const period  = $("#period");

log("popup loaded");

pickBtn.addEventListener("click", async () => {
  log("pick clicked");
  out.value = "";
  copyBtn.disabled = true;
  dlBtn.disabled = true;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  log("active tab", tab?.id, tab?.url);
  chrome.runtime.sendMessage({ type: "START_PICK", tabId: tab.id });
});

goBtn.addEventListener("click", async () => {
  const jobs = $$(".chks input:checked").map((cb) => cb.value);
  log("go clicked", { jobs, period: period.value });

  if (!jobs.length) { prog.textContent = "⚠ Select at least one section"; return; }

  out.value = "";
  copyBtn.disabled = true;
  dlBtn.disabled = true;
  goBtn.disabled = true;
  goBtn.textContent = "⏳ Scraping…";
  prog.textContent = "Starting…";

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  log("active tab", tab?.id, tab?.url);

  chrome.runtime.sendMessage({
    type: "SCRAPE_START",
    tabId: tab.id,
    jobs,
    period: period.value,
  });
});

chrome.runtime.onMessage.addListener((msg) => {
  log("runtime.onMessage", msg);

  if (msg.type === "SCRAPE_PROGRESS") {
    prog.textContent = `(${msg.done}/${msg.total}) ${msg.current}…`;
  }

  if (msg.type === "SCRAPE_DONE") {
    out.value = msg.text || "(empty)";
    copyBtn.disabled = false;
    dlBtn.disabled = false;
    goBtn.disabled = false;
    goBtn.textContent = "🚀 Scrape selected";
    prog.textContent = `✅ Done – ${(msg.text || "").length.toLocaleString()} chars`;
  }

  if (msg.type === "MD_RESULT") {
    out.value = msg.markdown || "";
    copyBtn.disabled = !msg.markdown;
    dlBtn.disabled = !msg.markdown;
  }

  return false;
});

copyBtn.addEventListener("click", async () => {
  log("copy clicked", { len: out.value.length });
  await navigator.clipboard.writeText(out.value);
  copyBtn.textContent = "✅ Copied!";
  setTimeout(() => (copyBtn.textContent = "📋 Copy all"), 1200);
});

dlBtn.addEventListener("click", () => {
  log("download clicked", { len: out.value.length });
  const blob = new Blob([out.value], { type: "text/markdown" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `tikr-data-${Date.now()}.md`;
  a.click();
  URL.revokeObjectURL(url);
});

chrome.storage.sync.get({ period: "annual" }, (d) => {
  period.value = d.period;
  log("loaded period from storage", d.period);
});
period.addEventListener("change", () => {
  log("period changed", period.value);
  chrome.storage.sync.set({ period: period.value });
});
