/* ── background.js ── service-worker (MV3) ───────────────── */

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

// (Opcional) Hace que al clickar el icono se abra el side panel automáticamente
(async () => {
  try {
    if (chrome.sidePanel?.setPanelBehavior) {
      await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
      log("sidePanel.setPanelBehavior(openPanelOnActionClick=true) OK");
    }
  } catch (e) {
    warn("sidePanel.setPanelBehavior failed", String(e));
  }
})();

// Si NO usas setPanelBehavior o quieres forzarlo igual por código, deja esto:
if (chrome.action?.onClicked?.addListener) {
  chrome.action.onClicked.addListener(async (tab) => {
    try {
      log("action.onClicked", { tabId: tab?.id, windowId: tab?.windowId, url: tab?.url });
      if (tab?.windowId != null && chrome.sidePanel?.open) {
        await chrome.sidePanel.open({ windowId: tab.windowId });
      }
    } catch (e) {
      err("sidePanel.open failed", String(e));
    }
  });
} else {
  warn("chrome.action.onClicked.addListener not available (unexpected in MV3)");
}

// Guardamos el último comando por tab hasta que el content.js diga CONTENT_READY
const pendingByTabId = new Map(); // tabId -> cmd

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const tabIdFromSender = sender?.tab?.id;
  const tabId = msg?.tabId ?? tabIdFromSender;

  log("onMessage", {
    type: msg?.type,
    tabId,
    senderTab: tabIdFromSender,
    senderUrl: sender?.tab?.url,
    msgKeys: msg ? Object.keys(msg) : null
  });

  try {
    if (msg?.type === "START_PICK") {
      if (!tabId) throw new Error("START_PICK without tabId");
      pendingByTabId.set(tabId, { type: "ENABLE_PICK_MODE", runId: msg.runId || null });
      log("pending set", { tabId, pendingType: "ENABLE_PICK_MODE", runId: msg.runId || null });
      injectAll(tabId, msg.runId || null);
      sendResponse?.({ ok: true });
      return false;
    }

    if (msg?.type === "SCRAPE_START") {
      if (!tabId) throw new Error("SCRAPE_START without tabId");
      const cmd = {
        type: "SCRAPE_CMD",
        jobs: msg.jobs || [],
        period: msg.period || "annual",
        runId: msg.runId || null
      };
      pendingByTabId.set(tabId, cmd);
      log("pending set", { tabId, pendingType: "SCRAPE_CMD", runId: cmd.runId, jobs: cmd.jobs, period: cmd.period });
      injectAll(tabId, cmd.runId);
      sendResponse?.({ ok: true });
      return false;
    }

    // ── NEW: Add all table rows to chart ──
    if (msg?.type === "TABLE_ADD_ALL") {
      if (!tabId) throw new Error("TABLE_ADD_ALL without tabId");
      const cmd = {
        type:  "TABLE_ADD_ALL_CMD",
        runId: msg.runId || null,
      };
      pendingByTabId.set(tabId, cmd);
      log("pending set", { tabId, pendingType: cmd.type, runId: cmd.runId });
      injectAll(tabId, cmd.runId);
      sendResponse?.({ ok: true });
      return false;
    }

    if (msg?.type === "CONTENT_READY") {
      const tId = tabIdFromSender ?? tabId;
      const cmd = tId ? pendingByTabId.get(tId) : null;

      log("CONTENT_READY", { tabId: tId, hasPending: !!cmd });

      if (tId && cmd) {
        pendingByTabId.delete(tId);
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

    // Relay de resultados/progreso hacia el sidepanel (popup.js escucha runtime.onMessage)
    if (
      msg?.type === "MD_RESULT"            ||
      msg?.type === "SCRAPE_PROGRESS"      ||
      msg?.type === "SCRAPE_DONE"          ||
      msg?.type === "TABLE_ADD_ALL_RESULT"
    ) {
      chrome.runtime.sendMessage(msg).catch((e) => {
        // Si el panel está cerrado, no pasa nada
        warn("relay runtime.sendMessage rejected (panel closed?)", String(e));
      });
      sendResponse?.({ ok: true });
      return false;
    }

    sendResponse?.({ ok: true, ignored: true });
    return false;

  } catch (e) {
    err("onMessage exception", String(e));
    try { sendResponse?.({ ok: false, error: String(e) }); } catch (_) {}
    return false;
  }
});

function injectAll(tabId, runId) {
  log("injectAll begin", { tabId, runId });

  // ✅ CAMBIO MÍNIMO: primero MAIN (tikr_scraper) y después ISOLATED (content)
  // para que el listener __tikr_to_main exista antes de que content lo dispare.

  // 1) tikr_scraper.js (MAIN)
  chrome.scripting.executeScript({
    target: { tabId },
    files: ["tikr_scraper.js"],
    world: "MAIN"
  }).then(() => {
    log("tikr_scraper.js injected (MAIN)", { tabId, runId });

    // 2) content.js (ISOLATED)
    return chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"]
    });
  }).then(() => {
    log("content.js injected", { tabId, runId });
  }).catch((e) => {
    err("injectAll FAILED", { tabId, runId, error: String(e) });
  });
}
