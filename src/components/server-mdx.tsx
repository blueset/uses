import { MDXRemote } from 'next-mdx-remote/rsc';

interface ServerMDXProps {
  source: string;
  className?: string;
}

// This is a server component that handles MDX rendering
export async function ServerMDX({ source, className }: ServerMDXProps) {
  
  return className ? (
    <div className={className}>
      <MDXRemote source={source} />
    </div>
  ) : (
    <MDXRemote source={source} />
  );
}
