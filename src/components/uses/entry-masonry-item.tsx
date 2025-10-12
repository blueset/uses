"use client";

import Image from "next/image";
import { UsesEntry } from "@/types/uses";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EntryMasonryItemProps {
  entry: UsesEntry;
  sectionIcon?: string;
  onClick: () => void;
}

// Tile used by the justified masonry: fills the given width/height box.
export function EntryMasonryItem({
  entry,
  sectionIcon,
  onClick,
}: EntryMasonryItemProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className="group relative hover:bg-transparent dark:hover:bg-transparent w-full h-full text-left transition-all hover:-translate-y-0.5 select-none"
      aria-label={entry.title}
    >
      {/* Media area */}
      <div className="top-0 right-0 bottom-9 left-0 absolute bg-muted dark:bg-muted/50 group-hover:opacity-70 rounded-md transition-opacity">
        {entry.photo ? (
          <Image
            src={`.${entry.photo}`}
            alt={entry.title}
            width={entry.photoMetadata?.width}
            height={entry.photoMetadata?.height}
            className="bg-white rounded-md w-full h-full object-contain"
          />
        ) : entry.logo ? (
          <div className="flex justify-center items-center bg-muted dark:bg-muted/50 p-8 w-full h-full">
            <Image
              src={`./${entry.logo}`}
              alt={entry.title}
              width={entry.logoMetadata?.width}
              height={entry.logoMetadata?.height}
              className="rounded-md w-full h-full object-contain"
            />
          </div>
        ) : entry.icon || sectionIcon ? (
          <div className="flex justify-center items-center bg-muted dark:bg-muted/50 p-8 rounded-md w-full h-full">
            <div
              className={cn(
                entry.icon || sectionIcon,
                "text-3xl text-muted-foreground"
              )}
            />
          </div>
        ) : null}
      </div>

      {/* Caption */}
      <div className="right-0 bottom-0 left-0 absolute flex items-center px-0 h-9">
        <span className="font-medium truncate">{entry.title}</span>
      </div>
    </Button>
  );
}
