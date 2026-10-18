"use strict";

if (typeof CRG === "undefined") {
  throw new Error("CRG_Core is required");
}

if (!CRG.minVer("1.0.0")) {
  throw new Error("CRG_Core must be version 1.0.0 or higher");
}

import { samplePluginMetadata } from "../metadata";

const PLUGIN_NAME = "SamplePlugin";
const parameters = CRG.parameters(
  PLUGIN_NAME,
  samplePluginMetadata.params,
  samplePluginMetadata.structs,
);

console.log(parameters);
