// Unmouse background service worker
// Handles the keyboard shortcut command and provides browser info to content scripts.

// Generate and store a secret for secure iframe communication.
chrome.runtime.onInstalled.addListener(async () => {
  const secret = Math.random().toString(36).substring(2);
  await chrome.storage.session.setAccessLevel({
    accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS",
  });
  await chrome.storage.session.set({ vimiumSecret: secret });
});

// Also set the secret on startup (in case of browser restart without reinstall).
chrome.runtime.onStartup.addListener(async () => {
  const secret = Math.random().toString(36).substring(2);
  await chrome.storage.session.setAccessLevel({
    accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS",
  });
  await chrome.storage.session.set({ vimiumSecret: secret });
});

// Cache the CSS in session storage for UIComponent to use.
(async () => {
  const cssUrl = chrome.runtime.getURL("content_scripts/unmouse.css");
  try {
    const response = await fetch(cssUrl);
    const css = await response.text();
    await chrome.storage.session.setAccessLevel({
      accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS",
    });
    await chrome.storage.session.set({ vimiumCSSInChromeStorage: css });
  } catch (e) {
    console.error("Unmouse: Failed to cache CSS", e);
  }
})();

// Handle the keyboard shortcut command.
chrome.commands.onCommand.addListener((command) => {
  if (command === "activate-unmouse") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { command: "enterVisualMode" });
      }
    });
  }
});

// Handle messages from content scripts.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.handler === "getBrowserInfo") {
    // Detect Firefox by checking the user agent on the service worker side.
    const isFirefox = typeof browser !== "undefined" &&
      typeof browser.runtime !== "undefined";
    sendResponse({ isFirefox: isFirefox, firefoxVersion: null });
    return false;
  }
  return false;
});
