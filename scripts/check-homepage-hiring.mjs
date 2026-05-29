import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";

const baseUrl = process.env.LAYOUT_BASE_URL ?? "http://localhost:3000";
const chromePath =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const debuggingPort = Number(process.env.CHROME_DEBUG_PORT ?? 9465);
const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-homepage-"));

const homepageRequirements = [
  {
    route: "/",
    roleNeedles: ["Growth PM", "Operations PM"],
    navLabels: ["Home", "Cases", "Companies", "Resume"],
    forbiddenHeroNeedles: ["Archive system", "Markdown-first", "Publishing unit"],
  },
  {
    route: "/ko",
    roleNeedles: ["Growth PM", "Operations PM", "운영"],
    navLabels: ["홈", "케이스", "회사", "경력"],
    forbiddenHeroNeedles: ["아카이브 시스템", "Markdown 기반", "발행 단위"],
  },
];

const requiredMetricValues = ["KRW 6.68M", "252h/year", "21h/month", "-14.8%", "+4.6%p", "+7%"];

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

async function inspectHomepage(client, route) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await client.send("Page.navigate", { url: `${baseUrl}${route}` });
  await wait(1200);

  const result = await client.send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const hero = document.querySelector('[data-homepage="hiring-hero"]');
      const metricNodes = Array.from(document.querySelectorAll('[data-homepage="impact-metric"]'));
      const desktopNav = document.querySelector('[data-layout="desktop-nav"]');
      const caseCards = Array.from(document.querySelectorAll('[data-case-card]'));
      const bodyText = document.body.textContent.replace(/\\s+/g, " ").trim();
      const heroText = hero ? hero.textContent.replace(/\\s+/g, " ").trim() : "";

      return {
        route: "${route}",
        bodyText,
        heroText,
        hasHero: Boolean(hero),
        metricValues: metricNodes.map((node) => node.textContent.replace(/\\s+/g, " ").trim()),
        metricsNearFold: metricNodes.filter((node) => node.getBoundingClientRect().top < 900).length,
        navLabels: desktopNav ? Array.from(desktopNav.querySelectorAll("a")).map((link) => link.textContent.trim()) : [],
        caseCardCount: caseCards.length,
        caseCardSections: caseCards.slice(0, 6).map((card) =>
          Array.from(card.querySelectorAll("[data-case-card-section]")).map((section) =>
            section.getAttribute("data-case-card-section")
          )
        )
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

  for (const requirement of homepageRequirements) {
    const result = await inspectHomepage(client, requirement.route);

    assert.ok(result.hasHero, `${requirement.route} should render a hiring-focused hero`);
    for (const needle of requirement.roleNeedles) {
      assert.ok(result.heroText.includes(needle), `${requirement.route} hero should include ${needle}`);
    }

    for (const needle of requirement.forbiddenHeroNeedles) {
      assert.ok(!result.heroText.includes(needle), `${requirement.route} hero should not lead with ${needle}`);
    }

    assert.deepEqual(result.navLabels, requirement.navLabels, `${requirement.route} desktop nav should be simplified`);
    assert.ok(result.metricsNearFold >= 5, `${requirement.route} should show at least 5 impact metrics near the fold`);

    for (const metricValue of requiredMetricValues) {
      assert.ok(result.bodyText.includes(metricValue), `${requirement.route} should keep ${metricValue} visible`);
    }

    assert.ok(result.caseCardCount >= 3, `${requirement.route} should render representative case cards`);
    for (const sections of result.caseCardSections) {
      assert.deepEqual(
        sections,
        ["context", "problem", "action", "result", "role"],
        `${requirement.route} case cards should follow context/problem/action/result/role`,
      );
    }
  }

  client.close();
  console.log("homepage hiring ok: positioning, metrics, nav, and case-card structure");
} finally {
  chrome.kill("SIGTERM");
  await wait(500);
  fs.rmSync(userDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
