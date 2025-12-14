"use client";

import { UsesEntry } from "@/types/uses";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface EntryListItemProps {
  entry: UsesEntry;
  sectionIcon?: string;
  onClick: () => void;
  descriptionJSX?: React.ReactNode;
  open?: boolean;
  className?: string;
}

export function EntryListItem({
  entry,
  sectionIcon,
  onClick,
  descriptionJSX,
  open,
  className,
}: EntryListItemProps) {
  const renderPlaceholder = () => {
    if (entry.logo) {
      return (
        <Image
          src={entry.logo.src}
          alt={entry.title}
          width={entry.logo.width}
          height={entry.logo.height}
          blurDataURL={entry.logo.blurDataURL}
          className="flex-shrink-0 w-auto h-5 object-contain"
        />
      );
    }

    if (entry.icon) {
      return (
        <span className="inline-flex flex-shrink-0 justify-center items-center text-muted-foreground">
          <span className={cn(entry.icon, "text-[1rem]")} />
        </span>
      );
    }

    if (sectionIcon) {
      return (
        <span className="inline-flex flex-shrink-0 justify-center items-center text-muted-foreground">
          <span className={cn(sectionIcon, "text-[1rem]")} />
        </span>
      );
    }

    return null;
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        "group flex justify-start items-center gap-3 hover:bg-muted/50 data-[open=false]:opacity-0 -mx-4 data-[open=false]:p-0 h-auto data-[open=false]:max-h-0 transition-colors data-[open=false]:pointer-events-none",
        className
      )}
      onClick={onClick}
      data-open={open}
    >
      {/* Mobile: two-line layout */}
      <div className="md:hidden space-y-0.5 py-2 w-full">
        <div className="flex items-center gap-2 min-w-0">
          {/* Mobile: inline icon + title */}
          <span className="shrink-0">{renderPlaceholder()}</span>
          <h3 className="font-semibold truncate">{entry.title}</h3>
        </div>
        <div className="[&>p]:contents text-muted-foreground text-sm text-start truncate line-clamp-1">
          {descriptionJSX}
        </div>
      </div>

      {/* Desktop: single-line row (title + description) */}
      <div className="hidden md:flex items-center gap-2 min-w-0">
        {renderPlaceholder()}
        <h3 className="font-semibold whitespace-nowrap">{entry.title}</h3>
        <span className="text-muted-foreground select-none">•</span>
        <div className="[&>p]:contents flex-1 text-muted-foreground text-sm text-start truncate line-clamp-1">
          {descriptionJSX}
        </div>
      </div>
    </Button>
  );
}
