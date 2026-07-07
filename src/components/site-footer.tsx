"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/container";
import { detectLocaleFromPath, localizePath } from "@/lib/i18n";
import { contactEmail, contactUrl, githubUrl } from "@/lib/brand-assets";

const footerCopy = {
  en: {
    description: "Growth PM / Operations PM portfolio focused on business impact and technical collaboration.",
    links: [
      { href: "/work-archive", label: "Archive" },
      { href: "/case-studies", label: "Cases" },
      { href: "/collaboration", label: "Collaboration" },
    ],
    contact: "Contact",
    github: "GitHub",
  },
  ko: {
    description: "성장, 운영, 데이터 PM 역량을 비즈니스 임팩트와 기술 협업 중심으로 보여주는 포트폴리오.",
    links: [
      { href: "/work-archive", label: "아카이브" },
      { href: "/case-studies", label: "케이스" },
      { href: "/collaboration", label: "협업" },
    ],
    contact: "Contact",
    github: "깃허브",
  },
};

export function SiteFooter() {
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const copy = footerCopy[locale];

  return (
    <footer className="border-t border-neutral-200 bg-brand-bg print:hidden">
      <Container>
        <div className="flex flex-col gap-3 py-8 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <p>{copy.description}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {copy.links.map((link) => (
              <Link key={link.href} href={localizePath(link.href, locale)} className="hover:text-brand-green">
                {link.label}
              </Link>
            ))}
            <Link href={contactUrl} className="font-medium text-brand-green hover:text-brand-orange">
              {contactEmail}
            </Link>
            <Link href={githubUrl} target="_blank" rel="noreferrer" className="font-medium text-brand-blue hover:text-brand-orange">
              {copy.github}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
