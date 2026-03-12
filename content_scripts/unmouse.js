// Unmouse — Keyboard text selection extension.
// Content script entry point.

(function () {
  // Initialize core systems.
  Scroller.init();

  // Listen for activation message from the background service worker.
  chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    if (message.command === "enterVisualMode") {
      // Enter caret mode first (user will press v to go to visual mode).
      const mode = new CaretMode();
      mode.init({ userLaunchedMode: true });
    }
  });
})();
