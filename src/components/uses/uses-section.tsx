"use client";

import { useMemo, useState } from "react";
import { UsesSection as UsesSectionType, UsesEntry } from "@/types/uses";
import { Button } from "@/components/ui/button";
import { EntriesContainerList } from "./entries-container-list";
import { EntriesContainerGrid } from "./entries-container-grid";
import { EntriesContainerMasonry } from "./entries-container-masonry";
import { EntryDetails } from "./entry-details";
import {
  ChevronDown,
  ChevronUp,
  Grid2X2,
  List,
  PanelsTopLeft,
  Check,
  LayoutDashboard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface UsesSectionProps {
  section: UsesSectionType;
}

export function UsesSection({ section }: UsesSectionProps) {
  const [showHidden, setShowHidden] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<UsesEntry | null>(null);
  // View mode state: restrict to valid modes per section type
  const initialView = useMemo(() => {
    if (section.type === "hardware") {
      return section.defaultLayout === "list" ||
        section.defaultLayout === "masonry"
        ? section.defaultLayout
        : "masonry";
    }
    // software
    return section.defaultLayout === "list" || section.defaultLayout === "grid"
      ? section.defaultLayout
      : "grid";
  }, [section.defaultLayout, section.type]);
  const [viewLayout, setViewLayout] = useState<"grid" | "list" | "masonry">(
    initialView
  );
  const viewLabel = useMemo(
    () => (viewLayout === "grid" ? "Grid" : viewLayout === "list" ? "List" : "Masonry"),
    [viewLayout]
  );

  const visibleEntries = section.entries.filter((entry) => !entry.hidden);
  const hiddenEntries = section.entries.filter((entry) => entry.hidden);
  const allEntriesOrdered = [...visibleEntries, ...hiddenEntries];

  return (
    <section className="space-y-3 pt-6 sm:pt-10">
      {/* Section Header */}
      <div className="flex justify-between items-center">
        <div className={cn("flex items-center gap-2", section.color ?? "")}>
          {section.icon && <div className={cn(section.icon, "text-3xl")} />}
          <h2 className="font-semibold text-2xl tracking-tight">
            {section.title}
          </h2>
        </div>
        {/* View mode switch (valid modes only) */}
        <DropdownMenu>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {viewLayout === "grid" && <Grid2X2 className="w-5 h-5" />}
                    {viewLayout === "list" && <List className="w-5 h-5" />}
                    {viewLayout === "masonry" && (
                      <LayoutDashboard className="w-5 h-5 rotate-90 -scale-x-100" />
                    )}
                    <span className="sr-only">View mode: {viewLabel}</span>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">
                <span>View mode: {viewLabel}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent align="end" className="w-40">
            {section.type === "software" && (
              <>
                <DropdownMenuItem
                  onSelect={() => setViewLayout("grid")}
                  className="flex items-center gap-2"
                >
                  <Grid2X2 className="w-4 h-4" /> Grid
                  {viewLayout === "grid" && (
                    <Check className="ml-auto w-4 h-4" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setViewLayout("list")}
                  className="flex items-center gap-2"
                >
                  <List className="w-4 h-4" /> List
                  {viewLayout === "list" && (
                    <Check className="ml-auto w-4 h-4" />
                  )}
                </DropdownMenuItem>
              </>
            )}
            {section.type === "hardware" && (
              <>
                <DropdownMenuItem
                  onSelect={() => setViewLayout("masonry")}
                  className="flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 rotate-90 -scale-x-100" /> Masonry
                  {viewLayout === "masonry" && (
                    <Check className="ml-auto w-4 h-4" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setViewLayout("list")}
                  className="flex items-center gap-2"
                >
                  <List className="w-4 h-4" /> List
                  {viewLayout === "list" && (
                    <Check className="ml-auto w-4 h-4" />
                  )}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Entries Grid/List/Masonry */}
      {viewLayout === "list" && (
        <EntriesContainerList
          entries={allEntriesOrdered}
          sectionIcon={section.icon}
          onEntryClick={setSelectedEntry}
          showHidden={showHidden}
        />
      )}
      {viewLayout === "grid" && (
        <EntriesContainerGrid
          entries={allEntriesOrdered}
          sectionIcon={section.icon}
          onEntryClick={setSelectedEntry}
          showHidden={showHidden}
        />
      )}
      {viewLayout === "masonry" && (
        <EntriesContainerMasonry
          entries={allEntriesOrdered}
          sectionIcon={section.icon}
          onEntryClick={setSelectedEntry}
          showHidden={showHidden}
        />
      )}

      {/* View More Button */}
      {hiddenEntries.length > 0 && (
        <Button
          variant="ghost"
          onClick={() => setShowHidden(!showHidden)}
          aria-expanded={showHidden}
          className="flex items-center gap-2 -mx-3 min-w-none"
        >
          {showHidden ? (
            <>
              View less
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              View more
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </Button>
      )}

      {/* Entry Details Modal/Sheet */}
      <EntryDetails
        entry={selectedEntry}
        isOpen={selectedEntry !== null}
        onClose={() => setSelectedEntry(null)}
        sectionIcon={section.icon}
        sectionTitle={section.title}
        sectionColor={section.color}
        descriptionJSX={selectedEntry?.fullDescriptionJSX}
      />
    </section>
  );
}
