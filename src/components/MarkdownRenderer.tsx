import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
  activeExpansions?: string[];
}

export function MarkdownRenderer({ content, activeExpansions = [] }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground prose-p:text-muted-foreground">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 border-b border-border pb-2" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
          li: ({ node, ...props }) => <li className="" {...props} />,
          p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
          div: ({ node, ...props }) => {
            // Check if it's an expansion block
            const dataExpansion = (props as any)['data-expansion'];
            if (dataExpansion) {
              const expId = String(dataExpansion);
              if (!activeExpansions.includes(expId)) return null;
              
              return (
                <div className="relative p-5 bg-primary/10 border-l-4 border-primary rounded-r-lg my-6 not-prose text-foreground" {...props}>
                  {props.children}
                </div>
              );
            }
            return <div {...props} />;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
