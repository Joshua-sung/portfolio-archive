export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="w-full max-w-4xl py-12 sm:py-16">
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand-green-deep">{eyebrow}</p>
      ) : null}
      <h1 className="max-w-[15ch] break-keep break-words text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:max-w-4xl sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-[34ch] break-keep text-lg leading-8 text-neutral-700 sm:max-w-3xl">{description}</p>
    </div>
  );
}
