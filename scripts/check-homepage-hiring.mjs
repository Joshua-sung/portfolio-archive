import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";

const baseUrl = process.env.LAYOUT_BASE_URL ?? "http://localhost:3000";
function findChromePath() {
  if (process.env.CHROME_PATH) {
    return process.env.CHROME_PATH;
  }

  const candidates =
    process.platform === "win32"
      ? [
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
          "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
          "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
          "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
        ]
      : [
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
          "/usr/bin/google-chrome",
          "/usr/bin/chromium",
          "/usr/bin/chromium-browser",
        ];

  const chrome = candidates.find((candidate) => fs.existsSync(candidate));
  if (!chrome) {
    throw new Error("Chrome was not found. Set CHROME_PATH to a Chrome or Edge executable.");
  }
  return chrome;
}

const chromePath = findChromePath();
const debuggingPort = Number(process.env.CHROME_DEBUG_PORT ?? 9465);
const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-homepage-"));

const homepageRequirements = [
  {
    route: "/",
    roleNeedles: ["Growth PM", "Operations PM"],
    navLabels: ["Home", "Cases", "Companies", "Resume"],
    bodyNeedles: ["Business impact", "Problem, solution, execution results", "Project Experience"],
    metricValues: ["78.6x increase", "252h/year", "4.21x increase", "-14.8%", "+4.6%p", "+7%"],
    forbiddenImpactMetricValues: ["21h/month"],
    firstMetricValue: "78.6x increase",
    spotlightValue: "252h/yr",
    forbiddenBodyNeedles: [
      "Business impact, not just activity logs",
      "Case studies that connect context, execution, and result",
      "Experience contexts",
    ],
    forbiddenHeroNeedles: ["Archive system", "Markdown-first", "Publishing unit"],
  },
  {
    route: "/ko",
    roleNeedles: ["Growth PM", "Operations PM", "운영"],
    navLabels: ["홈", "케이스", "회사", "경력"],
    bodyNeedles: ["비즈니스 임팩트", "문제 파악, 해결 방법, 실행 결과", "업무 성과 사례"],
    metricValues: ["78.6배 증가", "연 252시간", "4.21배 증가", "-14.8%", "+4.6%포인트", "+7%"],
    forbiddenImpactMetricValues: ["21h/month"],
    firstMetricValue: "78.6배 증가",
    spotlightValue: "연 252시간",
    forbiddenBodyNeedles: [
      "업무 기록보다 먼저 보여줘야 할 비즈니스 임팩트",
      "맥락, 실행, 결과가 한눈에 연결되는 케이스",
      "경험 맥락",
    ],
    forbiddenHeroNeedles: ["아카이브 시스템", "Markdown 기반", "발행 단위"],
  },
];

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
      const companyArrows = Array.from(document.querySelectorAll('[data-company-arrow-direction]'));
      const primaryCta = document.querySelector('[data-homepage="primary-cta"]');
      const spotlight = document.querySelector('[data-homepage="spotlight-card"]');
      const heroStyles = hero ? getComputedStyle(hero) : null;
      const primaryCtaStyles = primaryCta ? getComputedStyle(primaryCta) : null;
      const bodyText = document.body.textContent.replace(/\\s+/g, " ").trim();
      const heroText = hero ? hero.textContent.replace(/\\s+/g, " ").trim() : "";

      return {
        route: "${route}",
        bodyText,
        heroText,
        hasHero: Boolean(hero),
        heroBackground: heroStyles ? heroStyles.backgroundColor : "",
        primaryCtaRadius: primaryCtaStyles ? primaryCtaStyles.borderRadius : "",
        primaryCtaBackground: primaryCtaStyles ? primaryCtaStyles.backgroundColor : "",
        hasSpotlight: Boolean(spotlight),
        spotlightText: spotlight ? spotlight.textContent.replace(/\\s+/g, " ").trim() : "",
        metricValues: metricNodes.map((node) => node.textContent.replace(/\\s+/g, " ").trim()),
        firstMetricText: metricNodes[0] ? metricNodes[0].textContent.replace(/\\s+/g, " ").trim() : "",
        metricBackgrounds: metricNodes.map((node) => getComputedStyle(node).backgroundColor),
        metricsNearFold: metricNodes.filter((node) => node.getBoundingClientRect().top < 900).length,
        companyArrowDirections: companyArrows.map((node) => node.getAttribute("data-company-arrow-direction")),
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
    assert.ok(
      ["rgb(9, 9, 9)", "rgb(10, 10, 10)", "rgb(11, 11, 11)", "rgb(12, 12, 12)"].includes(result.heroBackground),
      `${requirement.route} hero should use a Framer-inspired near-black canvas, saw ${result.heroBackground}`,
    );
    assert.ok(result.hasSpotlight, `${requirement.route} should include a contained gradient spotlight card`);
    assert.ok(result.spotlightText.includes(requirement.spotlightValue), `${requirement.route} spotlight should lead with automation capacity returned`);
    assert.ok(!result.spotlightText.includes("78.6x"), `${requirement.route} spotlight should not lead with view lift`);
    assert.ok(
      Number.parseFloat(result.primaryCtaRadius) >= 40,
      `${requirement.route} primary CTA should be pill-shaped, saw ${result.primaryCtaRadius}`,
    );
    assert.equal(
      result.primaryCtaBackground,
      "rgb(255, 255, 255)",
      `${requirement.route} primary CTA should be white on dark canvas`,
    );
    assert.ok(
      result.metricBackgrounds.every((background) => background === "rgb(20, 20, 20)" || background === "rgb(28, 28, 28)"),
      `${requirement.route} impact metrics should use charcoal surfaces: ${JSON.stringify(result.metricBackgrounds)}`,
    );
    for (const needle of requirement.roleNeedles) {
      assert.ok(result.heroText.includes(needle), `${requirement.route} hero should include ${needle}`);
    }

    for (const needle of requirement.forbiddenHeroNeedles) {
      assert.ok(!result.heroText.includes(needle), `${requirement.route} hero should not lead with ${needle}`);
    }

    for (const needle of requirement.bodyNeedles) {
      assert.ok(result.bodyText.includes(needle), `${requirement.route} should include improved copy: ${needle}`);
    }

    for (const needle of requirement.forbiddenBodyNeedles) {
      assert.ok(!result.bodyText.includes(needle), `${requirement.route} should remove old copy: ${needle}`);
    }

    assert.deepEqual(result.navLabels, requirement.navLabels, `${requirement.route} desktop nav should be simplified`);
    assert.ok(result.metricsNearFold >= 5, `${requirement.route} should show at least 5 impact metrics near the fold`);
    assert.ok(
      result.firstMetricText.includes(requirement.firstMetricValue),
      `${requirement.route} should lead measurable outcomes with clear view lift copy`,
    );
    assert.ok(!result.firstMetricText.includes("KRW 6.68M"), `${requirement.route} should not lead measurable outcomes with payment amount`);
    assert.ok(result.companyArrowDirections.length >= 5, `${requirement.route} should expose company strip arrow direction markers`);
    assert.ok(
      result.companyArrowDirections.every((direction) => direction === "toward-latest"),
      `${requirement.route} company strip arrows should point toward the latest company`,
    );

    for (const metricValue of requirement.metricValues) {
      assert.ok(result.bodyText.includes(metricValue), `${requirement.route} should keep ${metricValue} visible`);
      assert.ok(
        result.metricValues.some((metricText) => metricText.includes(metricValue)),
        `${requirement.route} should show ${metricValue} inside the impact metric cards`,
      );
    }

    for (const metricValue of requirement.forbiddenImpactMetricValues) {
      assert.ok(
        result.metricValues.every((metricText) => !metricText.includes(metricValue)),
        `${requirement.route} should not show duplicate impact metric ${metricValue}`,
      );
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
