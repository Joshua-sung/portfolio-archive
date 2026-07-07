"use client";

import { Download } from "lucide-react";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:border-brand-blue hover:text-brand-blue print:hidden"
    >
      <Download size={16} aria-hidden="true" />
      {label}
    </button>
  );
}
