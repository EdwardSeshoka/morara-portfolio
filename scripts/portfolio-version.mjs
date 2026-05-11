#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const packageJsonPath = path.join(process.cwd(), "package.json");
const semverRegex =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

function readPackageVersion() {
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error("package.json not found. Cannot resolve portfolio version.");
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const version = packageJson.version;

  if (typeof version !== "string" || !semverRegex.test(version)) {
    throw new Error(`Invalid portfolio version '${version}'. Expected semantic version.`);
  }

  return version;
}

function main() {
  const command = process.argv[2] ?? "get";
  const version = readPackageVersion();

  switch (command) {
    case "get":
      process.stdout.write(`${version}\n`);
      return;
    case "tag":
      process.stdout.write(`v${version}\n`);
      return;
    case "validate":
      process.stdout.write(`Portfolio version is valid: ${version}\n`);
      return;
    default:
      throw new Error(`Unknown command '${command}'. Use one of: get, tag, validate.`);
  }
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown error";
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
