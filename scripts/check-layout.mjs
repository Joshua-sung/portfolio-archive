import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";

const baseUrl = process.env.LAYOUT_BASE_URL ?? "http://localhost:3000";
const chromePath =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const routes = ["/", "/companies", "/companies/woowa-brothers", "/work-archive"];
const debuggingPort = Number(process.env.CHROME_DEBUG_PORT ?? 9455);
const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-layout-"));

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
      const desktopNav = document.querySelector('[data-layout="desktop-nav"]');
      const links = desktopNav ? Array.from(desktopNav.querySelectorAll('a')).map((link) => {
        const rect = link.getBoundingClientRect();
        return {
          text: link.textContent.trim(),
          height: Math.round(rect.height),
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom)
        };
      }) : [];
      const linkTops = Array.from(new Set(links.map((link) => link.top)));
      return {
        route: "${route}",
        viewportWidth: ${viewport.width},
        clientWidth: root.clientWidth,
        scrollWidth: root.scrollWidth,
        links,
        desktopNavRows: linkTops.length
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

  const mobileResults = [];
  for (const route of routes) {
    mobileResults.push(await inspectRoute(client, route, { width: 390, height: 1200, mobile: true }));
  }

  const desktopResult = await inspectRoute(client, "/", { width: 1440, height: 1000, mobile: false });
  client.close();

  for (const result of mobileResults) {
    assert.equal(
      result.scrollWidth,
      result.clientWidth,
      `${result.route} should not create page-level horizontal overflow at 390px`,
    );
  }

  assert.equal(desktopResult.desktopNavRows, 1, "desktop nav should stay on one row at 1440px");
  assert.ok(
    desktopResult.links.every((link) => link.height <= 38),
    `desktop nav links should not wrap: ${JSON.stringify(desktopResult.links)}`,
  );

  console.log(`layout ok: ${routes.length} mobile routes and desktop nav`);
} finally {
  chrome.kill("SIGTERM");
  await wait(500);
  fs.rmSync(userDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
