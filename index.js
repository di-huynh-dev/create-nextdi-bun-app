#!/usr/bin/env bun
import { createRequire } from "node:module";
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = /* @__PURE__ */ createRequire(import.meta.url);

// index.ts
var require_create_nextdi_bun_app = __commonJS(() => {
  var { spawn } = __require("child_process");
  var { promisify } = __require("util");
  var { rm, mkdir } = __require("fs/promises");
  var { existsSync } = __require("fs");
  var path = __require("path");
  var exec = promisify(spawn);
  var colors = {
    reset: "\x1B[0m",
    bright: "\x1B[1m",
    cyan: "\x1B[36m",
    green: "\x1B[32m",
    yellow: "\x1B[33m",
    red: "\x1B[31m"
  };
  function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
  }
  async function main() {
    const args = process.argv.slice(2);
    const projectName = args[0] || "my-yuv-app";
    const targetDir = path.resolve(process.cwd(), projectName);
    log(`
\uD83D\uDE80 Creating your Next.js + Bun project...`, colors.bright + colors.cyan);
    log(`\uD83D\uDCC1 Project name: ${projectName}
`, colors.cyan);
    if (existsSync(targetDir)) {
      log(`❌ Error: Directory "${projectName}" already exists!`, colors.red);
      process.exit(1);
    }
    try {
      log("\uD83D\uDCE6 Downloading template...", colors.yellow);
      const gitClone = spawn("git", [
        "clone",
        "--depth=1",
        "https://github.com/hoodini/nextjs-bun-starter.git",
        projectName
      ], { stdio: "inherit" });
      await new Promise((resolve, reject) => {
        gitClone.on("close", (code) => {
          if (code === 0)
            resolve(null);
          else
            reject(new Error("Git clone failed"));
        });
      });
      log("\uD83E\uDDF9 Cleaning up...", colors.yellow);
      await rm(path.join(targetDir, ".git"), { recursive: true, force: true });
      log(`
\uD83D\uDCDA Installing dependencies with Bun...`, colors.yellow);
      const bunInstall = spawn("bun", ["install"], {
        cwd: targetDir,
        stdio: "inherit"
      });
      await new Promise((resolve, reject) => {
        bunInstall.on("close", (code) => {
          if (code === 0)
            resolve(null);
          else
            reject(new Error("Bun install failed"));
        });
      });
      log(`
✅ Success! Your project is ready at: ${projectName}`, colors.green + colors.bright);
      log(`
\uD83D\uDCDD Next steps:`, colors.cyan);
      log(`   1. cd ${projectName}`, colors.reset);
      log(`   2. Copy .env.example to .env.local and add your credentials`, colors.reset);
      log(`   3. bun run dev`, colors.reset);
      log(`
\uD83C\uDF1F Happy coding!
`, colors.yellow);
    } catch (error) {
      log(`
❌ Error: ${error.message}`, colors.red);
      process.exit(1);
    }
  }
  main();
});
export default require_create_nextdi_bun_app();
