#!/usr/bin/env bun

const { spawn } = require("child_process");
const { promisify } = require("util");
const { rm, mkdir } = require("fs/promises");
const { existsSync } = require("fs");
const path = require("path");

const exec = promisify(spawn);

// Colors for terminal output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
};

function log(message: string, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

async function main() {
  const args = process.argv.slice(2);
  const projectName = args[0] || "my-yuv-app";
  const targetDir = path.resolve(process.cwd(), projectName);

  log(
    `\n🚀 Creating your Next.js + Bun project...`,
    colors.bright + colors.cyan,
  );
  log(`📁 Project name: ${projectName}\n`, colors.cyan);

  // Check if directory exists
  if (existsSync(targetDir)) {
    log(`❌ Error: Directory "${projectName}" already exists!`, colors.red);
    process.exit(1);
  }

  try {
    // Clone the repository
    log("📦 Downloading template...", colors.yellow);
    const gitClone = spawn(
      "git",
      [
        "clone",
        "--depth=1",
        "https://github.com/di-huynh-dev/nextjs16-starter.git",
        projectName,
      ],
      { stdio: "inherit" },
    );

    await new Promise((resolve, reject) => {
      gitClone.on("close", (code: number | null) => {
        if (code === 0) resolve(null);
        else reject(new Error("Git clone failed"));
      });
    });

    // Remove .git directory
    log("🧹 Cleaning up...", colors.yellow);
    await rm(path.join(targetDir, ".git"), { recursive: true, force: true });

    // Install dependencies
    log("\n📚 Installing dependencies with Bun...", colors.yellow);
    const bunInstall = spawn("bun", ["install"], {
      cwd: targetDir,
      stdio: "inherit",
    });

    await new Promise((resolve, reject) => {
      bunInstall.on("close", (code: number | null) => {
        if (code === 0) resolve(null);
        else reject(new Error("Bun install failed"));
      });
    });

    // Success message
    log(
      `\n✅ Success! Your project is ready at: ${projectName}`,
      colors.green + colors.bright,
    );
    log(`\n📝 Next steps:`, colors.cyan);
    log(`   1. cd ${projectName}`, colors.reset);
    log(
      `   2. Copy .env.example to .env.local and add your credentials`,
      colors.reset,
    );
    log(`   3. bun run dev`, colors.reset);
  } catch (error: any) {
    log(`\n❌ Error: ${error.message}`, colors.red);
    process.exit(1);
  }
}

main();
