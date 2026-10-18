import type { CRG as CRGType } from "./src/index";

declare global {
  const CRG: typeof CRGType;

  interface Window {
    CRG: typeof CRGType;
  }
}

export {};
