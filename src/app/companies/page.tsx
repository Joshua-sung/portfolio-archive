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
      <PageHeader
        eyebrow="Company Portfolio"
        title="Work grouped by company, organization, and operating context."
        description="A first-pass portfolio view that shows how each role produced concrete operating systems, data decisions, collaboration loops, and measurable outcomes."
      />
      <section className="border-y border-neutral-200 py-6">
        <dl className="grid gap-4 text-sm sm:grid-cols-3">
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
      </section>
      <section className="grid min-w-0 gap-5 py-10 lg:grid-cols-2">
        {companies.map((company) => (
          <CompanyCard key={company.slug} company={company} />
        ))}
      </section>
    </Container>
  );
}
