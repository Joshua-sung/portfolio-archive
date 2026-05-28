import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { navItems } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-5">
          <Link href="/" className="flex min-w-0 flex-col leading-tight">
            <span className="text-sm font-semibold text-neutral-950">Joshua Portfolio</span>
            <span className="text-xs text-neutral-500">Operations + Data PM Archive</span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/resume"
            className="hidden items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-950 sm:inline-flex"
          >
            Resume
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-neutral-200 py-2 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => (
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
