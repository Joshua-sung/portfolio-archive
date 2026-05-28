import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Metric = {
  label: string;
  value: string;
  detail?: string;
};

export type WorkEntryMeta = {
  title: string;
  slug: string;
  summary: string;
  date: string;
  role: string;
  category: string;
  outcomeType: string;
  tags: string[];
  tools: string[];
  metrics: Metric[];
  featured: boolean;
  sensitive: string;
};

export type WorkEntry = WorkEntryMeta & {
  content: string;
};

const workDirectory = path.join(process.cwd(), "content", "work");

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function toMetrics(value: unknown): Metric[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "string") {
        return { label: "Outcome", value: item };
      }

      if (item && typeof item === "object") {
        const record = item as Record<string, unknown>;
        return {
          label: String(record.label ?? "Metric"),
          value: String(record.value ?? ""),
          detail: record.detail ? String(record.detail) : undefined,
        };
      }

      return null;
    })
    .filter((item): item is Metric => Boolean(item?.value));
}

function parseWorkEntry(fileName: string): WorkEntry {
  const filePath = path.join(workDirectory, fileName);
  const rawFile = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(rawFile);
  const fallbackSlug = fileName.replace(/\.mdx?$/, "");

  return {
    title: String(data.title ?? fallbackSlug),
    slug: String(data.slug ?? fallbackSlug),
    summary: String(data.summary ?? ""),
    date: String(data.date ?? ""),
    role: String(data.role ?? ""),
    category: String(data.category ?? "Work"),
    outcomeType: String(data.outcomeType ?? "Operational outcome"),
    tags: toStringArray(data.tags),
    tools: toStringArray(data.tools),
    metrics: toMetrics(data.metrics),
    featured: Boolean(data.featured),
    sensitive: String(data.sensitive ?? "Public-safe summary"),
    content,
  };
}

export function getWorkEntries(): WorkEntry[] {
  if (!fs.existsSync(workDirectory)) {
    return [];
  }

  return fs
    .readdirSync(workDirectory)
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map(parseWorkEntry)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getFeaturedEntries(): WorkEntry[] {
  return getWorkEntries().filter((entry) => entry.featured);
}

export function getWorkEntryBySlug(slug: string): WorkEntry | undefined {
  return getWorkEntries().find((entry) => entry.slug === slug);
}

export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getAllTags(): { label: string; slug: string; count: number }[] {
  const counts = new Map<string, number>();

  getWorkEntries().forEach((entry) => {
    entry.tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, slug: tagToSlug(label), count }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function getEntriesByTagSlug(tagSlug: string): WorkEntry[] {
  return getWorkEntries().filter((entry) =>
    entry.tags.some((tag) => tagToSlug(tag) === tagSlug),
  );
}

