#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const distPath = path.join(process.cwd(), "dist");

fs.rmSync(distPath, { force: true, recursive: true });
