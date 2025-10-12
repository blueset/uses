import { MDXRemote } from 'next-mdx-remote/rsc';

interface MDXContentProps {
  source: string;
  className?: string;
}

export function MDXContent({ source, className }: MDXContentProps) {
  return (
    <div className={className}>
      <MDXRemote source={source} />
    </div>
  );
}
