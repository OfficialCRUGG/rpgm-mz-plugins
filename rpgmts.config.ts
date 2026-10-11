import { type RpgmtsConfig } from "rpgmts";
import { videoSplashMetadata } from "./plugins/CRG_VideoSplash/metadata";

export default {
  plugins: [
    {
      entrypoint: "plugins/CRG_VideoSplash/src/index.ts",
      target: "dist/CRG_VideoSplash.js",
      minify: false,
      metadata: videoSplashMetadata,
    },
  ],
} satisfies RpgmtsConfig;
