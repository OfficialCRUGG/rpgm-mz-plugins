import { type RpgmtsConfig } from "rpgmts";
import { coreMetadata } from "./plugins/CRG_Core/metadata";
import { videoSplashMetadata } from "./plugins/CRG_VideoSplash/metadata";
import { samplePluginMetadata } from "./plugins/SamplePlugin/metadata";

export default {
  plugins: [
    {
      entrypoint: "plugins/CRG_Core/src/index.ts",
      target: "dist/CRG_Core.js",
      minify: false,
      metadata: coreMetadata,
    },
    {
      entrypoint: "plugins/CRG_VideoSplash/src/index.ts",
      target: "dist/CRG_VideoSplash.js",
      minify: false,
      metadata: videoSplashMetadata,
    },
    {
      entrypoint: "plugins/SamplePlugin/src/index.ts",
      target: "dist/SamplePlugin.js",
      minify: false,
      metadata: samplePluginMetadata,
    },
  ],
} satisfies RpgmtsConfig;
