import { UsesConfig } from "@/types/uses";
import { UsesSection } from "./uses-section";
import { ThemeToggle } from "@/components/theme-toggle";
import { ServerMDX } from "@/components/server-mdx";
import path from "path";
import { imageSizeFromFile } from "image-size/fromFile";
import { Logo } from "./logo";
import { Button } from "../ui/button";

interface UsesPageProps {
  config: UsesConfig;
}

export async function UsesPage({ config }: UsesPageProps) {
  // Pre-render all MDX content and attach to entries directly
  const sectionsWithMDX = await Promise.all(
    config.sections.map(async (section) => {
      const enrichedEntries = await Promise.all(
        section.entries.map(async (entry) => {
          // Compute image metadata using absolute file paths; swallow errors if files are missing.
          const getSize = async (rel?: string) => {
            if (!rel) return undefined;
            try {
              const abs = path.join(
                process.cwd(),
                "public",
                rel.replace(/^\//, "")
              );
              return await imageSizeFromFile(abs);
            } catch {
              return undefined;
            }
          };

          const photoMetadata = await getSize(entry.photo);
          const logoMetadata = await getSize(entry.logo);

          // MDX pre-rendering (optional if description is present)
          const hasDesc = !!entry.description;
          const cardDescription = hasDesc
            ? section.defaultLayout === "grid"
              ? entry.description!.split("\n\n")[0]
              : entry.description!
            : undefined;

          return {
            ...entry,
            ...(hasDesc && {
              cardDescriptionJSX: <ServerMDX source={cardDescription!} />,
              fullDescriptionJSX: <ServerMDX source={entry.description!} />,
            }),
            ...(photoMetadata && { photoMetadata }),
            ...(logoMetadata && { logoMetadata }),
          };
        })
      );

      return {
        ...section,
        entries: enrichedEntries,
      };
    })
  );
  return (
    <div className="bg-background min-h-screen text-foreground">
      {/* Header */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur border-b border-border">
        <div className="mx-auto px-4 max-w-6xl">
          {/* Top nav row: logo + theme toggle */}
          <div className="flex justify-between items-center py-12">
            <div className="flex items-center gap-3">
              <Logo alt="1A23 Studio" className="w-auto h-8" />
              <span className="font-light text-4xl">/ uses</span>
            </div>
            <ThemeToggle />
          </div>

          {/* Hero section: single descriptive text row */}
          <div className="py-10 sm:py-15">
            <p className="max-w-[40ch] md:font-light text-muted-foreground text-lg sm:text-xl md:text-4xl lg:text-5xl text-balance leading-tight tracking-tight">
              What I use to code, create, and productivity.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        <div className="space-y-16">
          {sectionsWithMDX.map((section, index) => (
            <UsesSection key={index} section={section} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-border">
        <div className="flex justify-between items-center mx-auto px-4 py-8 max-w-6xl text-muted-foreground text-sm">
          <Button variant="link" className="p-0" asChild><a href="https://1a23.com/">1A23 Studio</a></Button>
          <div className="flex items-center gap-2 font-light text-xl">
            <Logo alt="1A23 Studio" className="w-auto h-4" />
            <span>/ uses</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
