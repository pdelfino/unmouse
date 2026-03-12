// Unmouse background service worker
// Handles the keyboard shortcut command and provides browser info to content scripts.

// This MUST run at the top level on every service worker start — not just onInstalled/onStartup.
// Content scripts need access to session storage, and setAccessLevel resets when the worker restarts.
async function initSessionStorage() {
  await chrome.storage.session.setAccessLevel({
    accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS",
  });

  // Generate a secret for secure iframe communication (if not already set).
  const existing = await chrome.storage.session.get("vimiumSecret");
  if (!existing.vimiumSecret) {
    const secret = Math.random().toString(36).substring(2);
    await chrome.storage.session.set({ vimiumSecret: secret });
  }

  // Cache the CSS in session storage for UIComponent to use.
  const existingCSS = await chrome.storage.session.get("vimiumCSSInChromeStorage");
  if (!existingCSS.vimiumCSSInChromeStorage) {
    try {
      const cssUrl = chrome.runtime.getURL("content_scripts/unmouse.css");
      const response = await fetch(cssUrl);
      const css = await response.text();
      await chrome.storage.session.set({ vimiumCSSInChromeStorage: css });
    } catch (e) {
      console.error("Unmouse: Failed to cache CSS", e);
    }
  }
}

initSessionStorage();

// Handle the keyboard shortcut command.
chrome.commands.onCommand.addListener((command) => {
  if (command === "activate-unmouse") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { command: "enterVisualMode" })
          .catch(() => {
            // Content script not loaded on this tab yet — inject it.
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              files: [
                "lib/utils.js",
                "lib/keyboard_utils.js",
                "lib/dom_utils.js",
                "lib/rect.js",
                "lib/handler_stack.js",
                "lib/settings.js",
                "content_scripts/mode.js",
                "content_scripts/ui_component.js",
                "content_scripts/scroller.js",
                "content_scripts/mode_key_handler.js",
                "content_scripts/mode_visual.js",
                "content_scripts/hud.js",
                "content_scripts/unmouse.js",
              ],
            }).then(() => {
              chrome.tabs.sendMessage(tabs[0].id, { command: "enterVisualMode" });
            });
          });
      }
    });
  }
});

