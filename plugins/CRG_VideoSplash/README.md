# CRG_VideoSplash

This plugin allows you to replace the default splash screen with one or multiple videos.

##  Instructions
Using the "Splashes" parameter, you can define one or multiple video files to be played as splash screens.

Currently, only video files are supported. In the future, I hope to add support for images as well.

Additionally, using the "Skippable" parameter, you can also control whether the splashes are skippable and how they are skipped.
- By default, this is set to "All splashes at once", which makes one press of the skip button(s) skip the entire splash sequence.
- When set to "Current splash only", only one splash is skipped at a time.
- And lastly, "No" makes the splashes completely unskippable.

By default, splashes are skipped by:
- A click/touch on the screen.
- Pressing the "ok" input (Default: Enter, Space, Z on keyboard; A on gamepad)
- Pressing the "escape" input (Default: ESC on keyboard)
- Pressing the "cancel" input (Default: B on gamepad)

If you want to customize how the skip input is detected and know what you're doing, you can customize the detection function using the "JS: Skip Detection" parameter.

Make sure to leave the "return" statement intact and return a boolean value indicating whether the skip should be triggered.

## Compatibility
This plugin was developed for RPG Maker MZ with Corescript v1.10.0. Any older versions as well as RPG Maker MV may not be supported.

Furthermore, this plugin is likely not directly compatible with any plugins that modify the splash screen. If you are having trouble because of this, try placing this plugin below those plugins in the Plugin Manager. If the issue persists, disable the conflicting plugins and create a GitHub issue so we can check whether it can be solved in any way.

## Notices
This plugin was developed by CRUGG.
Found any issues or have suggestions? Create an issue on GitHub: https://github.com/OfficialCRUGG/rpgm-mz-plugins/issues
