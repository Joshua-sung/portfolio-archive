"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { Container } from "@/components/container";
import {
  detectLocaleFromPath,
  getLocalizedNavItems,
  languageSwitchCopy,
  localizePath,
  type Locale,
} from "@/lib/i18n";
import { githubUrl } from "@/lib/brand-assets";

export function SiteHeader() {
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const copy = languageSwitchCopy[locale];
  const localizedNavItems = getLocalizedNavItems(locale);
  const languageOptions: { locale: Locale; label: string }[] = [
    { locale: "en", label: "EN" },
    { locale: "ko", label: "한글" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-portfolio-canvas/95 text-white backdrop-blur print:hidden">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link href={localizePath("/", locale)} className="flex min-w-[150px] flex-col leading-tight">
            <span className="text-sm font-semibold text-white">Joshua Portfolio</span>
            <span className="text-xs text-brand-green">{copy.subtitle}</span>
          </Link>
          <nav data-layout="desktop-nav" className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
            {localizedNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full px-2.5 py-2 text-sm leading-none text-neutral-300 transition hover:bg-white/10 hover:text-white xl:px-3"
              >
                {item.shortLabel}
              </Link>
            ))}
          </nav>
          <div
            data-layout="language-switcher"
            className="flex shrink-0 items-center rounded-full border border-white/15 bg-portfolio-surface p-1 shadow-sm shadow-black/20"
            aria-label={copy.label}
          >
            {languageOptions.map((option) => {
              const isActive = option.locale === locale;

              return (
                <Link
                  key={option.locale}
                  href={localizePath(pathname, option.locale)}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "rounded-full px-2.5 py-1.5 text-xs font-semibold leading-none transition",
                    isActive
                      ? "bg-brand-green text-white"
                      : "text-neutral-300 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
          <Link
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Joshua Sung GitHub profile"
            className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-portfolio-surface px-2.5 text-neutral-100 transition hover:border-brand-blue hover:text-white sm:px-3"
          >
            <GitBranch size={17} aria-hidden="true" />
            <span className="hidden text-sm font-medium sm:inline">{copy.resume}</span>
            <ArrowUpRight className="hidden sm:block" size={15} aria-hidden="true" />
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-white/10 py-2 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
          {localizedNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full px-3 py-2 text-sm text-neutral-300 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
