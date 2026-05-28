export type CompanyBrand = {
  slug: string;
  name: string;
  logoAlt: string;
  logoSrc?: string;
  initials: string;
  homepageUrl?: string;
  sourceLabel: string;
  sourceUrl?: string;
  accentClass: string;
  backgroundClass: string;
};

export const githubUrl = "https://github.com/Joshua-sung/portfolio-archive";

export const companyBrands: CompanyBrand[] = [
  {
    slug: "eoding",
    name: "어딩 / Eoding",
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
    name: "우아한형제들",
    logoAlt: "우아한형제들 logo",
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
    name: "크라우드웍스",
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
    logoAlt: "Dublin Pub Operations portfolio mark",
    initials: "DP",
    sourceLabel: "Generalized identity",
    accentClass: "text-amber-950",
    backgroundClass: "bg-amber-50",
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
  {
    slug: "public-sector-consortium",
    name: "Public-sector Consortium",
    logoAlt: "Public-sector Consortium portfolio mark",
    initials: "PMO",
    sourceLabel: "Generalized identity",
    accentClass: "text-cyan-950",
    backgroundClass: "bg-cyan-50",
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
