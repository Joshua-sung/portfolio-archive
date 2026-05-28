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
    <div className="max-w-3xl py-12 sm:py-16">
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase text-emerald-700">{eyebrow}</p>
      ) : null}
      <h1 className="break-words text-4xl font-semibold leading-tight text-neutral-950 sm:text-5xl">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-neutral-700">{description}</p>
    </div>
  );
}
