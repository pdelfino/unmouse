import "../lib/utils.js";
import "../lib/dom_utils.js";
import "../lib/settings.js";
import "../lib/keyboard_utils.js";
import * as UIComponentMessenger from "./ui_component_messenger.js";

// Chrome creates a unique port for each MessageChannel, so there's a race condition between
// JavaScript messages and browser messages during style recomputation.
const TIME_TO_WAIT_FOR_IPC_MESSAGES = 17;

// Navigator.clipboard is only available in secure contexts.
function ensureClipboardIsAvailable() {
  if (!navigator.clipboard) {
    UIComponentMessenger.postMessage({ name: "showClipboardUnavailableMessage" });
    return false;
  }
  return true;
}

export const handlers = {
  show(data) {
    const el = document.querySelector("#hud");
    el.textContent = data.text;
    el.classList.add("vimium-ui-component-visible");
    el.classList.remove("vimium-ui-component-hidden");
  },

  hidden() {
    const el = document.querySelector("#hud");
    el.textContent = "";
    el.classList.add("vimium-ui-component-hidden");
    el.classList.remove("vimium-ui-component-visible");
  },

  copyToClipboard(message) {
    if (!ensureClipboardIsAvailable()) return;
    Utils.setTimeout(TIME_TO_WAIT_FOR_IPC_MESSAGES, async function () {
      const focusedElement = document.activeElement;
      globalThis.focus();

      const value = message.data.replace(/\xa0/g, " ");
      await navigator.clipboard.writeText(value);

      if (focusedElement != null) focusedElement.focus();
      globalThis.parent.focus();
      UIComponentMessenger.postMessage({ name: "unfocusIfFocused" });
    });
  },
};

function init() {
  document.addEventListener("DOMContentLoaded", async () => {
    await Settings.onLoaded();
  });

  UIComponentMessenger.init();
  UIComponentMessenger.registerHandler(async function (event) {
    await Utils.populateBrowserInfo();
    const handler = handlers[event.data.name];
    if (handler) {
      return handler(event.data);
    }
  });
}

const testEnv = globalThis.window == null;
if (!testEnv) {
  init();
}
