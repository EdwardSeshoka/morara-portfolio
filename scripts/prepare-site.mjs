#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const sourceDir = path.join(process.cwd(), "site");
const destinationDir = path.join(process.cwd(), "dist", "site");
const indexPath = path.join(sourceDir, "index.html");

if (!fs.existsSync(indexPath)) {
  throw new Error("site/index.html is required.");
}

fs.cpSync(sourceDir, destinationDir, {
  recursive: true,
  filter: (source) => !source.includes(`${path.sep}.DS_Store`)
});

process.stdout.write(`Prepared portfolio site at ${path.relative(process.cwd(), destinationDir)}\n`);
