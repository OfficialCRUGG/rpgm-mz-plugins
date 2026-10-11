require("dotenv").config();
const fs = require("fs");
const path = require("path");

if (!process.env.RPGM_DEV_PROJECT) {
  console.error("Please set a valid RPGM_DEV_PROJECT environment variable");
  process.exit(1);
}

const files = fs.readdirSync("dist");

for (const file of files) {
  if (!file.endsWith(".js")) continue;
  fs.copyFileSync(
    path.join("dist", file),
    path.join(process.env.RPGM_DEV_PROJECT, "js", "plugins", file),
  );
}
