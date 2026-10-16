"use strict";

const PLUGIN_NAME = "CRG_VideoSplash";
const parameters = PluginManager.parameters(PLUGIN_NAME);

const splashes = JSON.parse(parameters["splashes"] || "[]").map((splash: any) =>
  JSON.parse(splash),
);
const skippable = parameters["skippable"] || "all";
const skipDetectionJs =
  parameters["skipDetectionJs"] ||
  'return Input.isTriggered("ok") || Input.isTriggered("escape") || Input.isTriggered("cancel") || TouchInput.isTriggered();';

interface Scene_Splash {
  _splashIndex: number;
  _splashesFinished: boolean;
  _splashesStarted: boolean;

  nextSplash: () => void;
  finishSplashes: () => void;
}

Scene_Splash.prototype.create = function () {
  Scene_Base.prototype.create.call(this);

  this._splashIndex = 0;
  this._splashesFinished = false;
  this._splashesStarted = false;
};

Scene_Splash.prototype.start = function () {
  Scene_Base.prototype.start.call(this);
  if (!this.isEnabled() || splashes.length === 0) {
    this.gotoTitle();
    return;
  }

  this._splashesStarted = true;
  this.nextSplash();
};

Scene_Splash.prototype.nextSplash = function () {
  if (this._splashIndex >= splashes.length) {
    this.finishSplashes();
    return;
  }

  const splash = splashes[this._splashIndex];
  const file = splash.file;
  const hasExtension = file.includes(".");
  const ext = Utils.canPlayWebm() ? ".webm" : ".mp4";
  if (splash.type === "video") {
    Video.play(hasExtension ? file : file + ext);
  } else {
    console.warn("Unsupported splash type:", splash.type);
  }

  this._splashIndex++;
};

Scene_Splash.prototype.update = function () {
  Scene_Base.prototype.update.call(this);

  if (!this._splashesStarted || this._splashesFinished) {
    return;
  }

  const detectSkip = Function(skipDetectionJs);

  if (skippable !== "false" && detectSkip()) {
    if (skippable === "all") {
      this.finishSplashes();
    } else if (skippable === "current") {
      this.nextSplash();
    }
    return;
  }

  if (!Video.isPlaying()) {
    this.nextSplash();
  }
};

Scene_Splash.prototype.finishSplashes = function () {
  if (this._splashesFinished) return;

  this._splashesFinished = true;

  if (Video.isPlaying()) {
    Video._element.pause();
    Video._element.removeAttribute("src");
    Video._element.load();
  }

  Video._updateVisibility(false);

  SceneManager.goto(Scene_Title);
};

Scene_Splash.prototype.stop = function () {
  Scene_Base.prototype.stop.call(this);
};
