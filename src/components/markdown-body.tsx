import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownBody({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="mt-10 border-t border-neutral-200 pt-8 text-2xl font-semibold text-neutral-950">
            {children}
          </h2>
        ),
        h3: ({ children }) => <h3 className="mt-7 text-lg font-semibold text-neutral-950">{children}</h3>,
        p: ({ children }) => <p className="mt-4 leading-8 text-neutral-700">{children}</p>,
        ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-700">{children}</ul>,
        ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-neutral-700">{children}</ol>,
        li: ({ children }) => <li className="leading-7">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-neutral-950">{children}</strong>,
        code: ({ children }) => (
          <code className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-sm text-neutral-900">{children}</code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

