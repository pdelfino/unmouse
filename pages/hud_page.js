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

let searchCleanup = null;

export const handlers = {
  show(data) {
    const el = document.querySelector("#hud");
    const container = document.querySelector("#search-container");
    container.style.display = "none";
    el.style.display = "";
    el.textContent = data.text;
    el.classList.add("vimium-ui-component-visible");
    el.classList.remove("vimium-ui-component-hidden");
  },

  hidden() {
    const el = document.querySelector("#hud");
    const container = document.querySelector("#search-container");
    el.textContent = "";
    el.classList.add("vimium-ui-component-hidden");
    el.classList.remove("vimium-ui-component-visible");
    container.style.display = "none";
    el.style.display = "";
    if (searchCleanup) {
      searchCleanup();
      searchCleanup = null;
    }
  },

  showSearchMode() {
    const hud = document.querySelector("#hud");
    const container = document.querySelector("#search-container");
    const input = document.querySelector("#search-input");
    const countEl = document.querySelector("#search-count");

    hud.style.display = "none";
    container.style.display = "flex";
    input.value = "";
    countEl.textContent = "";
    input.focus();

    const onInput = () => {
      UIComponentMessenger.postMessage({ name: "searchUpdate", text: input.value });
    };

    const onKeydown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        cleanup();
        UIComponentMessenger.postMessage({ name: "searchConfirm" });
      } else if (event.key === "Escape") {
        event.preventDefault();
        cleanup();
        UIComponentMessenger.postMessage({ name: "searchCancelled" });
      } else if (event.key === "ArrowDown" || (event.ctrlKey && event.key === "n")) {
        event.preventDefault();
        UIComponentMessenger.postMessage({ name: "searchNext" });
      } else if (event.key === "ArrowUp" || (event.ctrlKey && event.key === "p")) {
        event.preventDefault();
        UIComponentMessenger.postMessage({ name: "searchPrev" });
      }
    };

    const cleanup = () => {
      input.removeEventListener("input", onInput);
      input.removeEventListener("keydown", onKeydown);
      container.style.display = "none";
      hud.style.display = "";
      searchCleanup = null;
    };

    searchCleanup = cleanup;
    input.addEventListener("input", onInput);
    input.addEventListener("keydown", onKeydown);
  },

  updateSearchCount(data) {
    const countEl = document.querySelector("#search-count");
    const input = document.querySelector("#search-input");
    if (data.total > 0) {
      countEl.textContent = `${data.current} of ${data.total}`;
      countEl.style.color = "";
    } else if (input.value.length > 0) {
      countEl.textContent = "No matches";
      countEl.style.color = "#d44";
    } else {
      countEl.textContent = "";
    }
    input.focus();
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
