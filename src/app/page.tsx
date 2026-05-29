import { HomepageLanding } from "@/components/homepage-landing";
import { capabilityMap } from "@/lib/site-data";
import { getCompanyGroups, getFeaturedEntries, getWorkEntries } from "@/lib/content";

export default function Home() {
  const featuredEntries = getFeaturedEntries();
  const allEntries = getWorkEntries();
  const companies = getCompanyGroups();

  return (
    <HomepageLanding
      featuredEntries={featuredEntries}
      allEntries={allEntries}
      companies={companies}
      capabilities={capabilityMap}
    />
  );
}
