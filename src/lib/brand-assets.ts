export type CompanyBrand = {
  slug: string;
  name: string;
  logoAlt: string;
  logoSrc?: string;
  initials: string;
  flagVariant?: "ireland";
  homepageUrl?: string;
  sourceLabel: string;
  sourceUrl?: string;
  accentClass: string;
  backgroundClass: string;
};

export const githubUrl = "https://github.com/Joshua-sung";
export const contactEmail = "krjoshua21@gmail.com";
export const contactUrl = `mailto:${contactEmail}`;

export const companyBrands: CompanyBrand[] = [
  {
    slug: "eoding",
    name: "Eoding",
    logoAlt: "Eoding logo",
    logoSrc: "/logos/eoding.svg",
    initials: "EO",
    homepageUrl: "https://hi.eoding.com/",
    sourceLabel: "Official website logo asset",
    sourceUrl: "https://hi.eoding.com/",
    accentClass: "text-blue-950",
    backgroundClass: "bg-white",
  },
  {
    slug: "woowa-brothers",
    name: "Woowa Brothers",
    logoAlt: "Woowa Brothers logo",
    logoSrc: "/logos/woowahan-brothers.jpg",
    initials: "WB",
    homepageUrl: "https://www.woowahan.com/",
    sourceLabel: "Official website Open Graph image",
    sourceUrl: "https://www.woowahan.com/",
    accentClass: "text-neutral-950",
    backgroundClass: "bg-white",
  },
  {
    slug: "crowdworks",
    name: "CrowdWorks",
    logoAlt: "Crowdworks logo",
    logoSrc: "/logos/crowdworks.png",
    initials: "CW",
    homepageUrl: "https://www.crowdworkscorp.kr/old-home",
    sourceLabel: "Official site asset",
    sourceUrl: "https://www.crowdworkscorp.kr/old-home",
    accentClass: "text-indigo-950",
    backgroundClass: "bg-white",
  },
  {
    slug: "dublin-pub-operations",
    name: "Dublin Pub Operations",
    logoAlt: "Ireland flag mark for Dublin Pub Operations",
    initials: "IE",
    flagVariant: "ireland",
    sourceLabel: "Ireland flag mark",
    accentClass: "text-emerald-950",
    backgroundClass: "bg-white",
  },
  {
    slug: "republic-of-korea-army",
    name: "Republic of Korea Army",
    logoAlt: "Republic of Korea Army seal",
    logoSrc: "/logos/republic-of-korea-army.svg",
    initials: "ROKA",
    homepageUrl: "https://www.army.mil.kr/sites/army/index.do",
    sourceLabel: "Wikimedia Commons public domain file",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Coat_of_arms_of_the_Republic_of_Korea_Army.svg",
    accentClass: "text-red-950",
    backgroundClass: "bg-white",
  },
];

export function getCompanyBrand(slug: string): CompanyBrand {
  return (
    companyBrands.find((brand) => brand.slug === slug) ?? {
      slug,
      name: slug,
      logoAlt: `${slug} portfolio mark`,
      initials: slug.slice(0, 2).toUpperCase(),
      sourceLabel: "Portfolio identity",
      accentClass: "text-neutral-950",
      backgroundClass: "bg-neutral-50",
    }
  );
}
