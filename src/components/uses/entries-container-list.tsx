"use client";

import { UsesEntry } from "@/types/uses";
import { EntryListItem } from "./entry-list-item";

interface EntriesContainerListProps {
  entries: UsesEntry[];
  sectionIcon?: string;
  onEntryClick: (entry: UsesEntry) => void;
  showHidden?: boolean;
}

export function EntriesContainerList({
  entries,
  sectionIcon,
  onEntryClick,
  showHidden = false,
}: EntriesContainerListProps) {
  return (
    <div className="flex flex-col items-stretch">
      {entries.map((entry, idx) => {
        const isHidden = !!entry.hidden;
        return (
          <EntryListItem
            key={`list-${idx}`}
            open={!isHidden || showHidden}
            className="transition-all duration-300"
            entry={entry}
            sectionIcon={sectionIcon}
            onClick={() => onEntryClick(entry)}
            descriptionJSX={entry.cardDescriptionJSX}
          />
        );
      })}
    </div>
  );
}
