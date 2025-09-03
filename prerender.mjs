import puppeteer from "puppeteer";
import fs from "fs-extra";
import path from "path";
import { spawn, execSync } from "child_process";
import chalk from "chalk";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

// 动态引入 CJS 模块
const allPaths =
  require("./getRoutesAllPath.cjs").default ||
  require("./getRoutesAllPath.cjs");

console.log("allPaths", allPaths);

fs.copySync("public/assets", "dist/assets");

const ROUTES = allPaths;
const OUT_DIR = path.resolve("./dist");
const PREVIEW_PORT = 4173; // vite preview 默认端口
const APP_URL = `http://localhost:${PREVIEW_PORT}`;
const WAIT_TIMEOUT = 30000; // 30 秒

function killPort(port) {
  try {
    const result = execSync(`lsof -i :${port} -t || true`).toString().trim();
    if (result) {
      const pids = result.split("\n");
      for (const pid of pids) {
        console.log(chalk.yellow(`⚠️ Killing process ${pid} on port ${port}`));
        execSync(`kill -9 ${pid}`);
      }
    } else {
      console.log(chalk.green(`✅ No process on port ${port}`));
    }
  } catch (err) {
    console.error(chalk.red(`❌ Error killing port ${port}:`), err);
  }
}

killPort(PREVIEW_PORT);

async function waitForRender(page, route) {
  try {
    await page.waitForSelector("#app", { timeout: WAIT_TIMEOUT });
    await page.waitForFunction(
      () => document.readyState === "complete" && window.__APP_READY__ === true,
      { timeout: WAIT_TIMEOUT }
    );
    console.log("\n" + `✅ Render ready for route: ${route}` + "\n");
  } catch (err) {
    console.warn(`⚠️ waitForRender timeout or failed for route: ${route}`, err);
  }
}

// 启动 vite preview 并等待服务 ready
function startVitePreview() {
  return new Promise((resolve, reject) => {
    const preview = spawn("npx", ["vite", "preview", "--port", PREVIEW_PORT], {
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    });

    let buffer = [];

    preview.stdout.on("data", (data) => {
      const text = data.toString();
      process.stdout.write(chalk.cyan(text));

      if (text.includes("Local:") || text.includes("Network:")) {
        buffer.push(text.trim());
      }

      if (text.includes("Network:")) {
        const line = "*".repeat(70);

        console.log("\n" + chalk.cyan(line) + "\n");

        console.log(chalk.green(`* 🚀  Starting Vite preview...`));
        buffer.forEach((lineText) => {
          console.log(chalk.cyan(`*  ${lineText}`));
        });

        console.log("\n" + chalk.cyan(line) + "\n");

        resolve(preview);
      }
    });

    preview.on("error", (err) => reject(err));
  });
}

async function prerender() {
  const previewProcess = await startVitePreview();

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // 捕获页面 console 输出
  page.on("console", (msg) => {
    const type = msg.type();
    const text = msg.text();
    switch (type) {
      case "log":
        console.log(`ℹ️ Page log: ${text}`);
        break;
      case "warning":
        console.warn(chalk.yellow(`⚠️ Page warn: ${text}`));
        break;
      case "error":
        console.error(chalk.red(`🛑 Page error: ${text}`));
        break;
      default:
        console.log(chalk.gray(`ℹ️ Page ${type}: ${text}`));
    }
  });

  // 捕获页面 JS 错误
  page.on("pageerror", (err) => {
    console.error(chalk.red(`🛑 Page JS error: ${err.message}`));
  });

  await page.setRequestInterception(true);

  page.on("request", (req) => {
    const url = req.url();
    if (
      url.includes("tawk.to") ||
      url.includes("facebook") ||
      url.includes("youtube")
    ) {
      if (!req.isInterceptResolutionHandled()) {
        req.abort(); // 忽略第三方脚本
      }
    } else {
      if (!req.isInterceptResolutionHandled()) {
        req.continue();
      }
    }
  });

  // 捕获请求失败
  page.on("requestfailed", (request) => {
    console.warn(
      chalk.yellow(
        `⚠️ Request failed: ${request.url()} (${request.failure()?.errorText})`
      )
    );
  });

  for (const route of ROUTES) {
    const url = `${APP_URL}${route}`;

    console.log(
      "\n" +
        chalk.blue(
          "****************************************************************"
        )
    );
    console.log(chalk.blue(`🔄 Prerendering: ${url}`));
    console.log(
      chalk.blue(
        "****************************************************************"
      ) + "\n"
    );

    try {
      await page.goto(url, { waitUntil: "networkidle2" });
      await waitForRender(page, route);

      const html = await page.content();
      const routePath = route === "/" ? "" : route;
      const outPath = path.join(OUT_DIR, routePath);
      await fs.ensureDir(outPath);
      await fs.writeFile(path.join(outPath, "index.html"), html);

      console.log(chalk.green(`✅ Saved: ${path.join(outPath, "index.html")}`));
    } catch (err) {
      console.error(
        chalk.red(`❌ Error prerendering ${route}:`),
        chalk.red(err)
      );
    } finally {
      console.log("\n\n");
    }
  }

  await browser.close();

  process.kill(previewProcess.pid, "SIGKILL");

  console.log(chalk.magenta("🎉 Prerendering finished."));
}

prerender().catch((err) => {
  console.error(chalk.red("❌ Prerender script failed:"), err);
  process.exit(1);
});
