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
    <div className="w-full max-w-3xl py-12 sm:py-16">
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase text-emerald-700">{eyebrow}</p>
      ) : null}
      <h1 className="max-w-[13ch] break-words text-3xl font-semibold leading-tight text-neutral-950 sm:max-w-3xl sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-[32ch] text-lg leading-8 text-neutral-700 sm:max-w-3xl">{description}</p>
    </div>
  );
}
