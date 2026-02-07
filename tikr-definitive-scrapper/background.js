/* ── background.js ── service-worker ────────────────────────── */

chrome.action.onClicked.addListener((tab) =>
  chrome.sidePanel.open({ windowId: tab.windowId })
);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  /* ── pick mode ── */
  if (msg.type === "START_PICK") {
    injectThen(msg.tabId, () =>
      chrome.tabs.sendMessage(msg.tabId, { type: "ENABLE_PICK_MODE" })
    );
  }

  /* ── full auto-scrape ── */
  if (msg.type === "SCRAPE_START") {
    injectThen(msg.tabId, () =>
      chrome.tabs.sendMessage(msg.tabId, {
        type: "SCRAPE_CMD",
        jobs: msg.jobs,
        period: msg.period,
      })
    );
  }

  /* ── relay any result to the side-panel ── */
  if (["MD_RESULT", "SCRAPE_PROGRESS", "SCRAPE_DONE"].includes(msg.type)) {
    chrome.runtime.sendMessage(msg).catch(() => {});
  }
});

/** Inject content.js + tikr_scraper.js once, then call `cb` */
function injectThen(tabId, cb) {
  chrome.scripting.executeScript(
    { target: { tabId }, files: ["content.js", "tikr_scraper.js"] },
    () => cb()
  );
}