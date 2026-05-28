import Link from "next/link";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <Container>
        <div className="flex flex-col gap-3 py-8 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <p>Public-safe work archive for operational, growth, and data PM capability.</p>
          <div className="flex gap-4">
            <Link href="/work-archive" className="hover:text-neutral-950">
              Archive
            </Link>
            <Link href="/case-studies" className="hover:text-neutral-950">
              Cases
            </Link>
            <Link href="/collaboration" className="hover:text-neutral-950">
              Collaboration
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

