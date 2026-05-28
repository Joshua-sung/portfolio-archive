import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { defaultLocale, type Locale } from "@/lib/i18n";

export type Metric = {
  label: string;
  value: string;
  detail?: string;
};

export type WorkCompany = {
  name: string;
  slug: string;
  context?: string;
  role?: string;
  order: number;
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
  company: WorkCompany;
};

export type WorkEntry = WorkEntryMeta & {
  content: string;
};

export type CompanyGroup = WorkCompany & {
  entries: WorkEntry[];
  metrics: Metric[];
  tags: string[];
};

function getWorkDirectory(locale: Locale = defaultLocale): string {
  return locale === "ko"
    ? path.join(process.cwd(), "content", "ko", "work")
    : path.join(process.cwd(), "content", "work");
}

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

function toCompany(value: unknown): WorkCompany {
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const name = String(record.name ?? "Unassigned");
    const fallbackSlug = companyToSlug(name);

    return {
      name,
      slug: String(record.slug ?? fallbackSlug),
      context: record.context ? String(record.context) : undefined,
      role: record.role ? String(record.role) : undefined,
      order: Number(record.order ?? 99),
    };
  }

  if (typeof value === "string" && value.trim()) {
    return {
      name: value.trim(),
      slug: companyToSlug(value),
      order: 99,
    };
  }

  return {
    name: "Unassigned",
    slug: "unassigned",
    order: 99,
  };
}

function parseWorkEntry(fileName: string, locale: Locale): WorkEntry {
  const workDirectory = getWorkDirectory(locale);
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
    company: toCompany(data.company),
    content,
  };
}

export function getWorkEntries(locale: Locale = defaultLocale): WorkEntry[] {
  const workDirectory = getWorkDirectory(locale);

  if (!fs.existsSync(workDirectory)) {
    return [];
  }

  return fs
    .readdirSync(workDirectory)
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map((fileName) => parseWorkEntry(fileName, locale))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getFeaturedEntries(locale: Locale = defaultLocale): WorkEntry[] {
  return getWorkEntries(locale).filter((entry) => entry.featured);
}

export function getWorkEntryBySlug(slug: string, locale: Locale = defaultLocale): WorkEntry | undefined {
  return getWorkEntries(locale).find((entry) => entry.slug === slug);
}

export function companyToSlug(company: string): string {
  return company
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getAllTags(locale: Locale = defaultLocale): { label: string; slug: string; count: number }[] {
  const counts = new Map<string, number>();

  getWorkEntries(locale).forEach((entry) => {
    entry.tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, slug: tagToSlug(label), count }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function getEntriesByTagSlug(tagSlug: string, locale: Locale = defaultLocale): WorkEntry[] {
  return getWorkEntries(locale).filter((entry) =>
    entry.tags.some((tag) => tagToSlug(tag) === tagSlug),
  );
}

export function getCompanyGroups(locale: Locale = defaultLocale): CompanyGroup[] {
  const groups = new Map<string, CompanyGroup>();

  getWorkEntries(locale).forEach((entry) => {
    const existing = groups.get(entry.company.slug);

    if (existing) {
      existing.entries.push(entry);
      existing.metrics.push(...entry.metrics);
      entry.tags.forEach((tag) => {
        if (!existing.tags.includes(tag)) {
          existing.tags.push(tag);
        }
      });
      return;
    }

    groups.set(entry.company.slug, {
      ...entry.company,
      entries: [entry],
      metrics: [...entry.metrics],
      tags: [...entry.tags],
    });
  });

  return Array.from(groups.values()).sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }

    return a.name.localeCompare(b.name);
  });
}

export function getCompanyGroupBySlug(slug: string, locale: Locale = defaultLocale): CompanyGroup | undefined {
  return getCompanyGroups(locale).find((group) => group.slug === slug);
}
