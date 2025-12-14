import { MDXRemote } from 'next-mdx-remote/rsc';
import * as runtime from 'react/jsx-runtime'

interface ServerMDXProps {
  source: string;
  className?: string;
}

// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

// This is a server component that handles MDX rendering
export function ServerMDX({ source, className }: ServerMDXProps) {
  const Component = useMDXComponent(source)
  return <Component components={{ }} className={className} />;
  return className ? (
    <div className={className}>
      <MDXRemote source={source} />
    </div>
  ) : (
    <MDXRemote source={source} />
  );
}
