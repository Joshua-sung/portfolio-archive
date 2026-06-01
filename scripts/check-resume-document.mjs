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
const debuggingPort = Number(process.env.CHROME_DEBUG_PORT ?? 9485);
const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-resume-"));
const completedExperienceMonths = 12 + 4 + 14 + 27 + 28;
const currentRoleStart = { year: 2026, month: 4 };
const experienceTimeZone = "Asia/Seoul";

function getInclusiveMonthSpan(start, end) {
  return (end.year - start.year) * 12 + (end.month - start.month) + 1;
}

function getYearMonthInExperienceTimeZone(asOf = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: experienceTimeZone,
    year: "numeric",
    month: "numeric",
  }).formatToParts(asOf);

  return {
    year: Number(parts.find((part) => part.type === "year")?.value),
    month: Number(parts.find((part) => part.type === "month")?.value),
  };
}

function getTotalExperienceLabel(locale) {
  const currentRoleMonths = getInclusiveMonthSpan(currentRoleStart, getYearMonthInExperienceTimeZone());
  const totalMonths = completedExperienceMonths + Math.max(0, currentRoleMonths);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (locale === "ko") {
    return `총 ${years}년 ${months}개월+`;
  }

  const yearLabel = years === 1 ? "year" : "years";
  const monthLabel = months === 1 ? "month" : "months";
  return `${years} ${yearLabel} ${months} ${monthLabel}+`;
}

const requirements = [
  {
    route: "/resume",
    title: "Career Description",
    total: getTotalExperienceLabel("en"),
    labels: ["Project / Work", "Period", "Outcome", "Role", "Tools"],
    projectNeedles: [
      "Eoding",
      "Apr 2026 - Present",
      "KRW 6.68M",
      "Ministry of National Defense",
      "Travel app data build",
      "Jun 2024 - Sep 2024 (4 months)",
      "Woowahan Brothers",
      "Nov 2022 - Dec 2023 (14 months)",
      "Shakespeare Hophouse",
      "Military officer",
    ],
    firstProjectNeedles: ["B2B SaaS channeling service", "Operations, Growth PM", "AI agent usage"],
    forbiddenFirstProject: [
      "execution support",
      "revenue-adjacent",
      "achieving them together",
      "URL identifier matching",
      "Google Sheets",
      "Gmail drafts",
      "AI insight drafts",
    ],
    forbidden: ["Selected quantified outcomes", "Profile summary"],
  },
  {
    route: "/ko/resume",
    title: "경력기술서",
    total: getTotalExperienceLabel("ko"),
    labels: ["프로젝트명 / 업무명", "기간", "성과", "역할", "기술"],
    projectNeedles: [
      "어딩",
      "2026.04 ~ 현재",
      "6,677,950원",
      "국방부 AI 학습용 데이터 구축",
      "데이터 바우처 사업",
      "2024.06 ~ 2024.09 (4개월)",
      "우아한형제들",
      "2022.11 ~ 2023.12 (14개월)",
      "Shakespeare hophouse",
      "직업군인",
    ],
    firstProjectNeedles: ["B2B SaaS 채널링 서비스", "운영, Growth PM", "AI 에이전트 활용"],
    forbiddenFirstProject: [
      "실행 지원",
      "매출 인접",
      "함께 달성",
      "URL 식별자 매칭",
      "Google Sheets",
      "Gmail 임시보관함",
      "AI 인사이트 초안",
    ],
    forbidden: ["선택된 정량 성과", "프로필 요약"],
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

async function inspectResume(client, route, viewport) {
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
      const documentNode = document.querySelector('[data-resume-document]');
      const projects = Array.from(document.querySelectorAll('[data-resume-project]'));
      const bodyText = document.body.textContent.replace(/\\s+/g, " ").trim();
      return {
        route: "${route}",
        viewport: "${viewport.name}",
        bodyText,
        firstProjectText: projects[0] ? projects[0].textContent.replace(/\\s+/g, " ").trim() : "",
        hasDocument: Boolean(documentNode),
        projectCount: projects.length,
        labels: Array.from(document.querySelectorAll('[data-resume-row-label]')).map((node) =>
          node.textContent.replace(/\\s+/g, " ").trim()
        ),
        clientWidth: root.clientWidth,
        scrollWidth: root.scrollWidth,
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

  const viewports = [
    { name: "mobile", width: 390, height: 1200, mobile: true },
    { name: "desktop", width: 1440, height: 1000, mobile: false },
  ];

  for (const requirement of requirements) {
    for (const viewport of viewports) {
      const result = await inspectResume(client, requirement.route, viewport);

      assert.ok(result.hasDocument, `${requirement.route} should render a resume document`);
      assert.equal(
        result.scrollWidth,
        result.clientWidth,
        `${requirement.route} should not overflow horizontally on ${viewport.name}`,
      );
      assert.ok(result.bodyText.includes(requirement.title), `${requirement.route} should show ${requirement.title}`);
      assert.ok(result.bodyText.includes(requirement.total), `${requirement.route} should show total experience`);
      assert.equal(result.projectCount, 6, `${requirement.route} should render 6 career entries`);

      for (const label of requirement.labels) {
        assert.ok(result.labels.includes(label), `${requirement.route} should include row label ${label}`);
      }

      for (const needle of requirement.projectNeedles) {
        assert.ok(result.bodyText.includes(needle), `${requirement.route} should include ${needle}`);
      }

      for (const needle of requirement.firstProjectNeedles) {
        assert.ok(result.firstProjectText.includes(needle), `${requirement.route} first career entry should include ${needle}`);
      }

      for (const forbidden of requirement.forbiddenFirstProject) {
        assert.ok(
          !result.firstProjectText.includes(forbidden),
          `${requirement.route} first career entry should remove ${forbidden}`,
        );
      }

      for (const forbidden of requirement.forbidden) {
        assert.ok(!result.bodyText.includes(forbidden), `${requirement.route} should remove ${forbidden}`);
      }
    }
  }

  client.close();
  console.log("resume document ok: PDF-style career entries render without old metric rail");
} finally {
  chrome.kill("SIGTERM");
  await wait(500);
  fs.rmSync(userDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
