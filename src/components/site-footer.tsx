"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/container";
import { detectLocaleFromPath, localizePath } from "@/lib/i18n";
import { githubUrl } from "@/lib/brand-assets";

const footerCopy = {
  en: {
    description: "Public-safe work archive for operational, growth, and data PM capability.",
    links: [
      { href: "/work-archive", label: "Archive" },
      { href: "/case-studies", label: "Cases" },
      { href: "/collaboration", label: "Collaboration" },
    ],
    github: "GitHub",
  },
  ko: {
    description: "운영, 성장, 데이터 PM 역량을 공개 가능한 범위에서 정리한 작업 아카이브.",
    links: [
      { href: "/work-archive", label: "아카이브" },
      { href: "/case-studies", label: "케이스" },
      { href: "/collaboration", label: "협업" },
    ],
    github: "깃허브",
  },
};

export function SiteFooter() {
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const copy = footerCopy[locale];

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <Container>
        <div className="flex flex-col gap-3 py-8 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <p>{copy.description}</p>
          <div className="flex gap-4">
            {copy.links.map((link) => (
              <Link key={link.href} href={localizePath(link.href, locale)} className="hover:text-neutral-950">
                {link.label}
              </Link>
            ))}
            <Link href={githubUrl} target="_blank" rel="noreferrer" className="font-medium text-neutral-900 hover:text-neutral-950">
              {copy.github}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
