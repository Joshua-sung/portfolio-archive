"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import {
  detectLocaleFromPath,
  getLocalizedNavItems,
  languageSwitchCopy,
  localizePath,
  type Locale,
} from "@/lib/i18n";

export function SiteHeader() {
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const copy = languageSwitchCopy[locale];
  const localizedNavItems = getLocalizedNavItems(locale);
  const resumeHref = localizePath("/resume", locale);
  const languageOptions: { locale: Locale; label: string }[] = [
    { locale: "en", label: "EN" },
    { locale: "ko", label: "한글" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link href={localizePath("/", locale)} className="flex min-w-[150px] flex-col leading-tight">
            <span className="text-sm font-semibold text-neutral-950">Joshua Portfolio</span>
            <span className="text-xs text-neutral-500">{copy.subtitle}</span>
          </Link>
          <nav data-layout="desktop-nav" className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
            {localizedNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-md px-2.5 py-2 text-sm leading-none text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950 xl:px-3"
              >
                {item.shortLabel}
              </Link>
            ))}
          </nav>
          <div
            data-layout="language-switcher"
            className="flex shrink-0 items-center rounded-md border border-neutral-400 bg-white p-1 shadow-sm shadow-neutral-950/10"
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
                    "rounded px-2.5 py-1.5 text-xs font-semibold leading-none transition",
                    isActive
                      ? "bg-neutral-950 text-white"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950",
                  ].join(" ")}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
          <Link
            href={resumeHref}
            className="hidden shrink-0 items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-950 sm:inline-flex"
          >
            {copy.resume}
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-neutral-200 py-2 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
          {localizedNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-md px-3 py-2 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
