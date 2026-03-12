//
// A heads-up-display (HUD) for showing Unmouse page operations.
//
const HUD = {
  tween: null,
  hudUI: null,
  abandon() {
    if (this.hudUI) {
      this.hudUI.hide(false);
    }
  },

  handleUIComponentMessage({ data }) {
    const handlers = {
      unfocusIfFocused: this.unfocusIfFocused,
      showClipboardUnavailableMessage: this.showClipboardUnavailableMessage,
    };
    const handler = handlers[data.name];
    if (handler) {
      return handler.bind(this)(data);
    }
  },

  async init(focusable) {
    await Settings.onLoaded();
    if (focusable == null) focusable = true;
    if (this.hudUI == null) {
      this.hudUI = new UIComponent();
      this.hudUI.load(
        "pages/hud_page.html",
        "unmouse-hud-frame",
        this.handleUIComponentMessage.bind(this),
      );
    }
    if (this.tween == null) {
      this.tween = new Tween(
        "iframe.unmouse-hud-frame.vimium-ui-component-visible",
        this.hudUI.shadowDOM,
      );
    }
    const classList = this.hudUI.iframeElement.classList;
    if (focusable) {
      classList.remove("vimium-non-clickable");
      classList.add("vimium-clickable");
      this.hudUI.setIframeVisible(true);
      getComputedStyle(this.hudUI.iframeElement).display;
    } else {
      classList.remove("vimium-non-clickable");
      classList.add("vimium-clickable");
    }
  },

  async show(text, duration) {
    await DomUtils.documentComplete();
    clearTimeout(this._showForDurationTimerId);
    await this.init(false);
    this.hudUI.show({ name: "show", text });
    this.tween.fade(1.0, 150);

    if (duration != null) {
      this._showForDurationTimerId = setTimeout(() => this.hide(), duration);
    }
  },

  hide(immediate, updateIndicator) {
    if (immediate == null) immediate = false;
    if (updateIndicator == null) updateIndicator = true;
    if ((this.hudUI != null) && (this.tween != null)) {
      clearTimeout(this._showForDurationTimerId);
      this.tween.stop();
      if (immediate) {
        if (updateIndicator) {
          Mode.setIndicator();
        } else {
          this.hudUI.hide();
        }
      } else {
        this.tween.fade(0, 150, () => this.hide(true, updateIndicator));
      }
    }
  },

  async copyToClipboard(text) {
    await DomUtils.documentComplete();
    await this.init();
    this.hudUI.postMessage({ name: "copyToClipboard", data: text });
  },

  unfocusIfFocused() {
    if (this.hudUI && this.hudUI.showing) {
      this.hudUI.iframeElement.blur();
      globalThis.focus();
    }
  },

  async showClipboardUnavailableMessage() {
    await DomUtils.documentComplete();
    await this.init();
    this.show("Clipboard actions available only on HTTPS sites", 4000);
  },
};

class Tween {
  constructor(cssSelector, insertionPoint) {
    this.opacity = 0;
    this.intervalId = -1;
    this.styleElement = null;
    this.cssSelector = cssSelector;
    if (insertionPoint == null) insertionPoint = document.documentElement;
    this.styleElement = DomUtils.createElement("style");

    if (!this.styleElement.style) {
      Tween.prototype.fade = Tween.prototype.stop = Tween.prototype.updateStyle = function () {};
      return;
    }

    this.styleElement.type = "text/css";
    this.styleElement.innerHTML = "";
    insertionPoint.appendChild(this.styleElement);
  }

  fade(toAlpha, duration, onComplete) {
    clearInterval(this.intervalId);
    const startTime = (new Date()).getTime();
    const fromAlpha = this.opacity;
    const alphaStep = toAlpha - fromAlpha;

    const performStep = () => {
      const elapsed = (new Date()).getTime() - startTime;
      if (elapsed >= duration) {
        clearInterval(this.intervalId);
        this.updateStyle(toAlpha);
        if (onComplete) onComplete();
      } else {
        const value = ((elapsed / duration) * alphaStep) + fromAlpha;
        this.updateStyle(value);
      }
    };

    this.updateStyle(this.opacity);
    this.intervalId = setInterval(performStep, 50);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  updateStyle(opacity) {
    this.opacity = opacity;
    this.styleElement.innerHTML = `\
${this.cssSelector} {
  opacity: ${this.opacity};
}\
`;
  }
}

globalThis.HUD = HUD;
