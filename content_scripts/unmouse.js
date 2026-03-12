// Unmouse — Keyboard text selection extension.
// Content script entry point.

(function () {
  // Wire up DOM events to the handler stack. Without this, no key events reach any mode.
  const events = ["keydown", "keypress", "keyup", "click", "focus", "blur", "mousedown", "scroll"];
  for (const type of events) {
    globalThis.addEventListener(
      type,
      forTrusted((event) => handlerStack.bubbleEvent(type, event)),
      true,
    );
  }
  document.addEventListener(
    "DOMActivate",
    forTrusted((event) => handlerStack.bubbleEvent("DOMActivate", event)),
    true,
  );

  // Base indicator handler: when no mode is active, hide the HUD.
  // This sits at the bottom of the handler stack, so it only runs if no mode handled the
  // indicator event above it.
  handlerStack.push({
    _name: "unmouse/base-indicator",
    indicator: () => {
      HUD.hide(true, false);
      return handlerStack.passEventToPage;
    },
  });

  // Initialize core systems.
  Scroller.init();

  // Listen for activation message from the background service worker.
  chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    if (message.command === "enterVisualMode") {
      const mode = new CaretMode();
      mode.init({ userLaunchedMode: true });
    }
  });
})();
