import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { CompanyCard } from "@/components/company-card";
import { getCompanyGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: "Companies",
  description: "Company and organization-based portfolio groups for operational PM work.",
};

export default function CompaniesPage() {
  const companies = getCompanyGroups();
  const caseCount = companies.reduce((total, company) => total + company.entries.length, 0);

  return (
    <Container>
      <div className="grid gap-8 border-b border-neutral-200 py-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end lg:py-16">
        <PageHeader
          eyebrow="Company Portfolio"
          title="Work grouped by company, organization, and operating context."
          description="A first-pass portfolio view that shows how each role produced concrete operating systems, data decisions, collaboration loops, and measurable outcomes."
        />
        <dl className="grid gap-5 border-t border-neutral-200 pt-6 text-sm sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div>
            <dt className="text-neutral-500">Company groups</dt>
            <dd className="mt-1 text-2xl font-semibold text-neutral-950">{companies.length}</dd>
          </div>
          <div>
            <dt className="text-neutral-500">Published work entries</dt>
            <dd className="mt-1 text-2xl font-semibold text-neutral-950">{caseCount}</dd>
          </div>
          <div>
            <dt className="text-neutral-500">Publishing model</dt>
            <dd className="mt-1 text-2xl font-semibold text-neutral-950">MDX</dd>
          </div>
        </dl>
      </div>
      <section className="grid min-w-0 gap-5 py-10 lg:grid-cols-2">
        {companies.map((company) => (
          <CompanyCard key={company.slug} company={company} />
        ))}
      </section>
    </Container>
  );
}
