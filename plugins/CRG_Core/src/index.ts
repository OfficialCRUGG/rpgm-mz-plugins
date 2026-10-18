"use strict";

import { parameters, parseParam, parseParams } from "./utils/params";
import { compareSemver, minVer } from "./utils/semver";

export const VERSION = "1.0.0";

class CRG {}

Object.assign(CRG, {
  parameters,
  parseParams,
  parseParam,

  compareSemver,
  minVer,
});

window.CRG = CRG;
