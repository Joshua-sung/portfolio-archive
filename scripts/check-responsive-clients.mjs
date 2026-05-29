import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";

const baseUrl = process.env.LAYOUT_BASE_URL ?? "http://localhost:3000";
const chromePath =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const debuggingPort = Number(process.env.CHROME_DEBUG_PORT ?? 9475);
const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-responsive-"));

const viewports = [
  { name: "iPhone SE", width: 375, height: 667, mobile: true },
  { name: "iPhone standard", width: 390, height: 844, mobile: true },
  { name: "Galaxy standard", width: 412, height: 915, mobile: true },
  { name: "iPhone large", width: 430, height: 932, mobile: true },
  { name: "iPad portrait", width: 768, height: 1024, mobile: true },
  { name: "laptop", width: 1366, height: 768, mobile: false },
  { name: "desktop", width: 1440, height: 900, mobile: false },
  { name: "full HD", width: 1920, height: 1080, mobile: false },
];

const routes = [
  "/",
  "/ko",
  "/case-studies",
  "/ko/case-studies",
  "/companies",
  "/ko/companies",
  "/resume",
  "/ko/resume",
  "/work-archive/growth-program-conversion-diagnosis",
  "/ko/work-archive/growth-program-conversion-diagnosis",
];

const expectedPalette = {
  "--brand-green": "#468E36",
  "--brand-orange": "#FE5B2C",
  "--brand-blue": "#262DA9",
  "--brand-bg": "#F5F7FC",
};

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForBrowser() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const targets = await fetch(`http://127.0.0.1:${debuggingPort}/json`).then((res) => res.json());
      const page = targets.find((target) => target.type === "page");
      if (page) {
        return page;
      }
    } catch {
      await wait(250);
    }
  }

  throw new Error("Chrome debugging endpoint did not become available");
}

function createDevtoolsClient(webSocketDebuggerUrl) {
  const ws = new WebSocket(webSocketDebuggerUrl);
  let nextId = 1;

  const opened = new Promise((resolve) => {
    ws.addEventListener("open", resolve, { once: true });
  });

  function send(method, params = {}) {
    const id = nextId;
    nextId += 1;
    ws.send(JSON.stringify({ id, method, params }));

    return new Promise((resolve, reject) => {
      const listener = (event) => {
        const message = JSON.parse(event.data);
        if (message.id !== id) {
          return;
        }

        ws.removeEventListener("message", listener);
        if (message.error) {
          reject(new Error(`${method}: ${message.error.message}`));
          return;
        }
        resolve(message.result);
      };

      ws.addEventListener("message", listener);
    });
  }

  return { opened, send, close: () => ws.close() };
}

async function inspectRoute(client, route, viewport) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.mobile,
  });
  await client.send("Page.navigate", { url: `${baseUrl}${route}` });
  await wait(1200);

  const result = await client.send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const root = document.documentElement;
      const styles = getComputedStyle(root);
      const palette = {};
      for (const key of ${JSON.stringify(Object.keys(expectedPalette))}) {
        palette[key] = styles.getPropertyValue(key).trim();
      }
      const languageSwitcher = document.querySelector('[data-layout="language-switcher"]');
      const githubLink = document.querySelector('a[href="https://github.com/Joshua-sung/portfolio-archive"]');
      const hero = document.querySelector('[data-homepage="hiring-hero"]');
      const ctaLinks = Array.from(document.querySelectorAll('[data-homepage="hiring-hero"] a'));
      const inspected = Array.from(document.querySelectorAll('[data-homepage="impact-metric"], [data-case-card], [data-layout="language-switcher"]'));
      const overflowing = inspected
        .map((node) => {
          const rect = node.getBoundingClientRect();
          return {
            label: node.getAttribute("data-homepage") || node.getAttribute("data-case-card-section") || node.getAttribute("data-layout") || node.tagName,
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width)
          };
        })
        .filter((rect) => rect.left < -1 || rect.right > root.clientWidth + 1);
      const metricRects = Array.from(document.querySelectorAll('[data-homepage="impact-metric"]')).map((node) => {
        const rect = node.getBoundingClientRect();
        return { top: Math.round(rect.top), left: Math.round(rect.left), right: Math.round(rect.right), height: Math.round(rect.height) };
      });
      const ctaRects = ctaLinks.map((node) => {
        const rect = node.getBoundingClientRect();
        return { text: node.textContent.trim(), width: Math.round(rect.width), height: Math.round(rect.height), left: Math.round(rect.left), right: Math.round(rect.right) };
      });
      const languageRect = languageSwitcher ? languageSwitcher.getBoundingClientRect() : null;
      return {
        route: "${route}",
        viewport: "${viewport.name}",
        width: ${viewport.width},
        scrollWidth: root.scrollWidth,
        clientWidth: root.clientWidth,
        palette,
        hasHero: Boolean(hero),
        hasGithubLink: Boolean(githubLink),
        languageRect: languageRect ? {
          left: Math.round(languageRect.left),
          right: Math.round(languageRect.right),
          width: Math.round(languageRect.width),
          height: Math.round(languageRect.height)
        } : null,
        overflowing,
        metricRects,
        ctaRects,
      };
    })()`,
  });

  return result.result.value;
}

const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--disable-background-networking",
  "--disable-component-update",
  "--no-first-run",
  "--no-default-browser-check",
  `--user-data-dir=${userDataDir}`,
  `--remote-debugging-port=${debuggingPort}`,
  "about:blank",
]);

try {
  const page = await waitForBrowser();
  const client = createDevtoolsClient(page.webSocketDebuggerUrl);
  await client.opened;
  await client.send("Page.enable");
  await client.send("Runtime.enable");

  for (const viewport of viewports) {
    for (const route of routes) {
      const result = await inspectRoute(client, route, viewport);
      assert.ok(
        result.scrollWidth <= result.clientWidth + 1,
        `${result.viewport} ${result.route} should not create horizontal page overflow: ${result.scrollWidth}/${result.clientWidth}`,
      );
      assert.ok(result.hasGithubLink, `${result.viewport} ${result.route} should expose GitHub`);
      assert.ok(result.languageRect, `${result.viewport} ${result.route} should render language switcher`);
      assert.ok(
        result.languageRect.left >= 0 && result.languageRect.right <= result.clientWidth,
        `${result.viewport} ${result.route} language switcher should stay inside viewport: ${JSON.stringify(result.languageRect)}`,
      );
      assert.ok(result.languageRect.height >= 30, `${result.viewport} ${result.route} language switcher should be tappable`);
      assert.deepEqual(result.overflowing, [], `${result.viewport} ${result.route} should keep key UI inside viewport`);

      for (const [name, value] of Object.entries(expectedPalette)) {
        assert.equal(result.palette[name].toLowerCase(), value.toLowerCase(), `${result.route} should expose ${name}`);
      }

      if (route === "/" || route === "/ko") {
        assert.ok(result.hasHero, `${result.viewport} ${result.route} should render homepage hero`);
        assert.ok(result.metricRects.length >= 6, `${result.viewport} ${result.route} should render all impact metrics`);
        assert.ok(
          result.ctaRects.every((rect) => rect.height >= 44 && rect.left >= 0 && rect.right <= result.clientWidth),
          `${result.viewport} ${result.route} hero CTAs should stay tappable and in bounds: ${JSON.stringify(result.ctaRects)}`,
        );

        if (viewport.width >= 1366) {
          const uniqueMetricRows = new Set(result.metricRects.map((rect) => rect.top));
          assert.equal(uniqueMetricRows.size, 1, `${result.viewport} ${result.route} impact metrics should fit one desktop row`);
        }
      }
    }
  }

  client.close();
  console.log(`responsive clients ok: ${viewports.length} viewports across ${routes.length} routes`);
} finally {
  chrome.kill("SIGTERM");
  await wait(500);
  fs.rmSync(userDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
