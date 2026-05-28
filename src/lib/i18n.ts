import { navItems } from "@/lib/site-data";

export const locales = ["en", "ko"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function detectLocaleFromPath(pathname: string): Locale {
  return pathname === "/ko" || pathname.startsWith("/ko/") ? "ko" : defaultLocale;
}

export function stripLocale(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "/";
  }

  if (pathname === "/ko") {
    return "/";
  }

  if (pathname.startsWith("/ko/")) {
    return pathname.slice(3) || "/";
  }

  return pathname;
}

export function localizePath(pathname: string, locale: Locale): string {
  const [pathWithQuery, hash = ""] = pathname.split("#");
  const [path, query = ""] = pathWithQuery.split("?");
  const basePath = stripLocale(path || "/");
  const localizedPath = locale === "ko" ? (basePath === "/" ? "/ko" : `/ko${basePath}`) : basePath;
  const queryString = query ? `?${query}` : "";
  const hashString = hash ? `#${hash}` : "";

  return `${localizedPath}${queryString}${hashString}`;
}

const navTranslations: Record<Locale, Record<string, { label: string; shortLabel: string }>> = {
  en: {},
  ko: {
    "/": { label: "홈", shortLabel: "홈" },
    "/about": { label: "소개", shortLabel: "소개" },
    "/work-archive": { label: "작업 아카이브", shortLabel: "아카이브" },
    "/companies": { label: "회사별", shortLabel: "회사별" },
    "/case-studies": { label: "케이스 스터디", shortLabel: "케이스" },
    "/systems-built": { label: "구축 시스템", shortLabel: "시스템" },
    "/collaboration": { label: "협업 방식", shortLabel: "협업" },
    "/resume": { label: "경력 요약", shortLabel: "경력" },
    "/writing": { label: "글", shortLabel: "글" },
  },
};

export function getLocalizedNavItems(locale: Locale) {
  return navItems.map((item) => {
    const translation = navTranslations[locale][item.href];

    return {
      ...item,
      href: localizePath(item.href, locale),
      label: translation?.label ?? item.label,
      shortLabel: translation?.shortLabel ?? item.shortLabel,
    };
  });
}

export const languageSwitchCopy: Record<Locale, { label: string; resume: string; subtitle: string }> = {
  en: {
    label: "Language",
    resume: "Resume",
    subtitle: "Operations + Data PM Archive",
  },
  ko: {
    label: "언어",
    resume: "경력",
    subtitle: "운영 + 데이터 PM 아카이브",
  },
};
