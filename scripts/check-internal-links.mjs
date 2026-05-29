import assert from "node:assert/strict";

const baseUrl = process.env.LAYOUT_BASE_URL ?? "http://localhost:3000";
const origin = new URL(baseUrl).origin;
const seedRoutes = ["/", "/ko"];
const ignoredPrefixes = ["/_next/", "/favicon.ico"];

function extractInternalLinks(html) {
  const matches = html.matchAll(/\s(?:href)=["']([^"']+)["']/g);
  const links = [];

  for (const match of matches) {
    const href = match[1];
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      continue;
    }

    const url = new URL(href, origin);
    if (url.origin !== origin) {
      continue;
    }

    const pathname = url.pathname;
    if (ignoredPrefixes.some((prefix) => pathname.startsWith(prefix))) {
      continue;
    }

    links.push(pathname);
  }

  return Array.from(new Set(links)).sort();
}

async function fetchRoute(route) {
  const response = await fetch(`${baseUrl}${route}`, {
    headers: { "Cache-Control": "no-cache" },
    redirect: "manual",
  });
  const html = await response.text();

  return {
    route,
    status: response.status,
    bodyText: html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]*>/g, " "),
    links: extractInternalLinks(html),
  };
}

const queue = [...seedRoutes];
const visited = new Set();
const failures = [];

while (queue.length > 0) {
  const route = queue.shift();
  if (!route || visited.has(route)) {
    continue;
  }

  visited.add(route);
  const result = await fetchRoute(route);
  if (result.status !== 200 || /\b404\b/.test(result.bodyText)) {
    failures.push(`${route} returned ${result.status}`);
    continue;
  }

  for (const link of result.links) {
    if (!visited.has(link) && !queue.includes(link)) {
      queue.push(link);
    }
  }
}

assert.deepEqual(failures, [], `Internal link failures: ${failures.join(", ")}`);
assert.ok(visited.size >= 50, `Expected to crawl a broad portfolio surface, saw ${visited.size} routes`);

console.log(`internal links ok: ${visited.size} routes crawled`);
