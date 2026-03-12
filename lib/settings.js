const defaultOptions = {
  scrollStepSize: 60,
  smoothScroll: true,
};

const Settings = {
  _settings: globalThis.structuredClone(defaultOptions),
  _chromeStorageListenerInstalled: false,

  defaultOptions,

  async onLoaded() {
    if (!this.isLoaded()) {
      await this.load();
    }
  },

  async load() {
    if (!this._chromeStorageListenerInstalled) {
      this._chromeStorageListenerInstalled = true;
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area == "sync") {
          this.load();
          this.dispatchEvent("change");
        }
      });
    }

    let result = await chrome.storage.sync.get(null);
    this._settings = Object.assign(globalThis.structuredClone(defaultOptions), result);
  },

  isLoaded() {
    return this._settings != null;
  },

  get(key) {
    if (!this.isLoaded()) {
      throw new Error(`Getting the setting ${key} before settings have been loaded.`);
    }
    return globalThis.structuredClone(this._settings[key]);
  },

  async set(key, value) {
    if (!this.isLoaded()) {
      throw new Error(`Writing the setting ${key} before settings have been loaded.`);
    }
    this._settings[key] = value;
    await chrome.storage.sync.set(this._settings);
  },
};

Object.assign(Settings, EventDispatcher);

globalThis.Settings = Settings;
