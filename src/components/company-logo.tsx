import Image from "next/image";
import { Building2 } from "lucide-react";
import { getCompanyBrand } from "@/lib/brand-assets";

type CompanyLogoProps = {
  slug: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClass = {
  sm: "h-11 w-16",
  md: "h-14 w-20",
  lg: "h-16 w-24",
};

export function CompanyLogo({ slug, size = "md", className = "" }: CompanyLogoProps) {
  const brand = getCompanyBrand(slug);

  return (
    <div
      className={[
        "flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-neutral-200 ring-1 ring-white",
        sizeClass[size],
        brand.backgroundClass,
        className,
      ].join(" ")}
      title={brand.sourceLabel}
    >
      {brand.logoSrc ? (
        <Image
          src={brand.logoSrc}
          alt={brand.logoAlt}
          width={96}
          height={96}
          className="max-h-[82%] w-[88%] object-contain"
        />
      ) : (
        <span className={`flex items-center gap-1 text-sm font-semibold tracking-normal ${brand.accentClass}`}>
          <Building2 size={14} aria-hidden="true" />
          {brand.initials}
        </span>
      )}
    </div>
  );
}
