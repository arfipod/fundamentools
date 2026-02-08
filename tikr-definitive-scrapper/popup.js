const NS = "TIKR-AI";
const ts = () => new Date().toISOString();
const log = (...a) => console.log(`[${NS}][PANEL]`, ts(), ...a);

const scrapeBtn = document.getElementById("scrape");
const pickBtn = document.getElementById("pick");
const copyBtn = document.getElementById("copy");
const out = document.getElementById("out");
const statusEl = document.getElementById("status");
const periodSel = document.getElementById("period");

function setStatus(s) {
  statusEl.textContent = s;
}

async function getActiveTabId() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) throw new Error("No active tab");
  return tab.id;
}

function selectedJobs() {
  const checks = [...document.querySelectorAll(".jobCheck")];
  return checks.filter(c => c.checked).map(c => c.value);
}

function updateScrapeButtonLabel() {
  const jobs = selectedJobs();
  scrapeBtn.textContent = `Scrape (${jobs.length})`;
}

document.querySelectorAll(".jobCheck").forEach((el) => {
  el.addEventListener("change", updateScrapeButtonLabel);
});
updateScrapeButtonLabel();

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(out.value || "");
    setStatus("✅ Copied to clipboard");
  } catch (e) {
    setStatus("⚠ Copy failed (browser permissions?)");
  }
});

function setBusy(busy) {
  scrapeBtn.disabled = busy;
  pickBtn.disabled = busy;
}

pickBtn.addEventListener("click", async () => {
  try {
    out.value = "";
    copyBtn.disabled = true;

    const tabId = await getActiveTabId();
    const runId = `run_${Date.now()}`;

    log("START_PICK", { tabId, runId });
    setStatus("Pick mode: click a table in TIKR…");

    chrome.runtime.sendMessage({ type: "START_PICK", tabId, runId });
  } catch (e) {
    setStatus("⚠ " + (e.message || "Failed to start pick mode"));
  }
});

scrapeBtn.addEventListener("click", async () => {
  try {
    out.value = "";
    copyBtn.disabled = true;
    setBusy(true);

    const jobs = selectedJobs();
    const period = periodSel.value || "annual";
    const tabId = await getActiveTabId();
    const runId = `run_${Date.now()}`;

    log("SCRAPE_START", { tabId, runId, jobs, period });
    setStatus(`Starting scrape (${jobs.length})…`);

    chrome.runtime.sendMessage({
      type: "SCRAPE_START",
      tabId,
      jobs,
      period,
      runId
    });
  } catch (e) {
    setBusy(false);
    setStatus("⚠ " + (e.message || "Failed to start scrape"));
  }
});

chrome.runtime.onMessage.addListener((msg) => {
  if (!msg?.type) return;

  if (msg.type === "SCRAPE_PROGRESS") {
    setStatus(`(${msg.done}/${msg.total}) ${msg.current}`);
    return;
  }

  if (msg.type === "SCRAPE_DONE") {
    out.value = msg.text || "";
    copyBtn.disabled = !out.value;
    setBusy(false);
    setStatus("✅ Done (result in textarea)");
    return;
  }

  if (msg.type === "MD_RESULT") {
    out.value = msg.markdown || "";
    copyBtn.disabled = !out.value;
    setBusy(false);
    setStatus(out.value ? "✅ Picked table (Markdown ready)" : "Pick cancelled/empty");
    return;
  }
});
