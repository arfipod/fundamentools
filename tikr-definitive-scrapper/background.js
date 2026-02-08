/* ── background.js ── service-worker (ULTRA VERBOSE) ───────────────── */

const NS = "TIKR-AI";
const ts = () => new Date().toISOString();
const log  = (...a) => console.log(`[${NS}][BG]`, ts(), ...a);
const warn = (...a) => console.warn(`[${NS}][BG]`, ts(), ...a);
const err  = (...a) => console.error(`[${NS}][BG]`, ts(), ...a);

self.addEventListener("unhandledrejection", (e) => {
  err("UNHANDLED REJECTION", e.reason);
});
self.addEventListener("error", (e) => {
  err("ERROR EVENT", e.message, e.filename, e.lineno, e.colno);
});

chrome.action.onClicked.addListener((tab) => {
  log("action.onClicked", { tabId: tab?.id, windowId: tab?.windowId, url: tab?.url });
  chrome.sidePanel.open({ windowId: tab.windowId });
});

const pending = {}; // pending[tabId] = cmd

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const tabId = sender?.tab?.id ?? msg?.tabId;
  log("onMessage", {
    type: msg?.type,
    tabId,
    senderTab: sender?.tab?.id,
    senderUrl: sender?.tab?.url,
    msgKeys: msg ? Object.keys(msg) : null,
  });

  try {
    if (msg?.type === "START_PICK") {
      pending[msg.tabId] = { type: "ENABLE_PICK_MODE", runId: msg.runId || null };
      log("pending set", { tabId: msg.tabId, cmd: pending[msg.tabId] });
      injectAll(msg.tabId, msg.runId);
      sendResponse?.({ ok: true });
      return false;
    }

    if (msg?.type === "SCRAPE_START") {
      pending[msg.tabId] = {
        type: "SCRAPE_CMD",
        jobs: msg.jobs,
        period: msg.period,
        runId: msg.runId || null,
      };
      log("pending set", { tabId: msg.tabId, cmd: pending[msg.tabId] });
      injectAll(msg.tabId, msg.runId);
      sendResponse?.({ ok: true });
      return false;
    }

    if (msg?.type === "CONTENT_READY" && sender?.tab) {
      const tId = sender.tab.id;
      const cmd = pending[tId];

      log("CONTENT_READY", { tabId: tId, hasPending: !!cmd, url: sender.tab.url });

      if (cmd) {
        delete pending[tId];
        log("sending cmd to tab", { tabId: tId, cmdType: cmd.type, runId: cmd.runId });

        chrome.tabs.sendMessage(tId, cmd).then((resp) => {
          log("tabs.sendMessage resolved", { tabId: tId, resp });
        }).catch((e) => {
          err("tabs.sendMessage FAILED", { tabId: tId, error: String(e) });
        });
      }

      sendResponse?.({ ok: true });
      return false;
    }

    // Relay to side-panel/popup listeners
    if (msg?.type === "MD_RESULT" || msg?.type === "SCRAPE_PROGRESS" || msg?.type === "SCRAPE_DONE") {
      chrome.runtime.sendMessage(msg).catch((e) => {
        // if nobody listening (panel closed), it rejects; that's ok but log once.
        warn("relay runtime.sendMessage rejected (panel closed?)", String(e));
      });
      sendResponse?.({ ok: true });
      return false;
    }

    sendResponse?.({ ok: true, ignored: true });
    return false;
  } catch (e) {
    err("onMessage exception", e);
    try { sendResponse?.({ ok: false, error: String(e) }); } catch (_) {}
    return false;
  }
});

function injectAll(tabId, runId) {
  log("injectAll begin", { tabId, runId });

  // 1) content.js (ISOLATED)
  chrome.scripting.executeScript({
    target: { tabId },
    files: ["content.js"],
  }).then(() => {
    log("content.js injected", { tabId, runId });

    // 2) tikr_scraper.js (MAIN)
    return chrome.scripting.executeScript({
      target: { tabId },
      files: ["tikr_scraper.js"],
      world: "MAIN",
    });
  }).then(() => {
    log("tikr_scraper.js injected (MAIN)", { tabId, runId });
  }).catch((e) => {
    err("injectAll FAILED", { tabId, runId, error: String(e) });
  });
}
