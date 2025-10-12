"use client";

import { UsesEntry } from "@/types/uses";
import { EntryGridItem } from "./entry-grid-item";
import { cn } from "@/lib/utils";

interface EntriesContainerGridProps {
  entries: UsesEntry[];
  sectionIcon?: string;
  onEntryClick: (entry: UsesEntry) => void;
  showHidden?: boolean;
}

export function EntriesContainerGrid({
  entries,
  sectionIcon,
  onEntryClick,
  showHidden = false,
}: EntriesContainerGridProps) {
  return (
    <div className="gap-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
      {entries.map((entry, idx) => (
        <div
          key={`grid-${idx}`}
          data-open={!entry.hidden || showHidden}
          className={cn(
            "overflow-hidden transition-all duration-300",
            entry.hidden &&
              "data-[open=false]:max-h-0 data-[open=false]:opacity-0"
          )}
        >
          <EntryGridItem
            entry={entry}
            sectionIcon={sectionIcon}
            onClick={() => onEntryClick(entry)}
            descriptionJSX={entry.cardDescriptionJSX}
          />
        </div>
      ))}
    </div>
  );
}
