"use client";

import { UsesEntry } from "@/types/uses";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";

interface EntryDetailsProps {
  entry: UsesEntry | null;
  isOpen: boolean;
  onClose: () => void;
  sectionIcon?: string;
  descriptionJSX?: React.ReactNode; // Pre-rendered MDX content from server
  sectionTitle?: string;
  sectionColor?: string;
}

export function EntryDetails({
  entry,
  isOpen,
  onClose,
  sectionIcon,
  descriptionJSX,
  sectionTitle,
  sectionColor,
}: EntryDetailsProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!entry) return null;

  const hasAnyMedia = entry.photo || entry.logo || entry.icon;
  // Landscape: prefer measured result, fall back to photo presence
  const photoW = entry.photo?.width;
  const photoH = entry.photo?.height;
  const metaLandscape = photoW && photoH ? photoW > photoH : undefined;
  const isLandscape =
    metaLandscape ?? !!(entry.photo);

  const renderImage = () => {
    if (entry.photo) {
      return (
        <Image
          src={entry.photo.src}
          alt={entry.title}
          width={entry.photo.width}
          height={entry.photo.height}
          blurDataURL={entry.photo.blurDataURL}
          className={cn(
            "rounded-xl w-full h-auto",
            isLandscape ? "object-cover" : "object-contain"
          )}
        />
      );
    }

    if (entry.logo) {
      return (
        <div className="flex justify-center items-center bg-muted/50 p-6 rounded-xl w-full max-w-60 h-auto object-contain aspect-square">
          <Image
            src={entry.logo.src}
            alt={entry.title}
            width={entry.logo.width}
            height={entry.logo.height}
            blurDataURL={entry.logo.blurDataURL}
            className="w-auto max-h-24"
        />
        </div>
      );
    }

    if (entry.icon || sectionIcon) {
      return (
        <div className="flex justify-center items-center bg-muted/60 p-6 ring-border/50 rounded-xl ring-1 w-full max-w-60 aspect-square">
          <div className={cn(entry.icon || sectionIcon, "text-8xl text-muted-foreground")} />
        </div>
      );
    }

    return null;
  };

  // Subtitle with optional icon from section, style via section color if provided
  const Subtitle = (
    <div
      className={cn(
        "flex items-center gap-2 mb-1 font-semibold text-xs uppercase tracking-widest",
        sectionColor ?? "text-muted-foreground"
      )}
    >
      {sectionIcon && <span className={cn(sectionIcon, "text-base")} />}
      <span>{sectionTitle ?? "Section"}</span>
    </div>
  );

  const Links = entry.links && entry.links.length > 0 && (
    <div className="flex flex-row flex-wrap items-start gap-2 -mx-2.5">
      {entry.links.map((link, index) => (
        <Button
          key={index}
          variant="ghost"
          size="sm"
          asChild
          className="px-3 h-8"
        >
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1"
          >
            {link.title}
            <ExternalLink className="w-3 h-3" />
          </a>
        </Button>
      ))}
    </div>
  );

  const Metadata = entry.metadata && entry.metadata.length > 0 && (
    <dl className="gap-x-6 gap-y-2 grid grid-cols-[auto_2fr] text-sm">
      {entry.metadata.map((item, idx) => (
        <React.Fragment key={idx}>
          <dt className="font-medium text-muted-foreground">{item.key}</dt>
          <dd className="text-foreground break-words">{item.value}</dd>
        </React.Fragment>
      ))}
    </dl>
  );

  const content = (
    <div className="space-y-6">
      {isLandscape ? (
        <div className="space-y-6">
          {hasAnyMedia && (
            <div className="rounded-xl overflow-hidden">{renderImage()}</div>
          )}
          <div className="space-y-4">
            <div>
              {Subtitle}
              <h3 className="font-bold text-2xl">{entry.title}</h3>
              {Links}
            </div>
            {descriptionJSX && (
              <div className="dark:prose-invert text-foreground leading-relaxed prose prose-sm">
                {descriptionJSX}
              </div>
            )}
            {Metadata && <div className="pt-2">{Metadata}</div>}
          </div>
        </div>
      ) : (
        <div className="gap-6 grid md:grid-cols-[minmax(160px,1fr)_2fr]">
          {hasAnyMedia && (
            <div className="w-full max-w-[60%] md:max-w-none">
              {renderImage()}
            </div>
          )}
          <div className={cn("space-y-4", !hasAnyMedia && "md:col-span-2")}>
            <div>
              {Subtitle}
              <h3 className="font-bold text-2xl">{entry.title}</h3>
              {Links}
            </div>
            {descriptionJSX && (
              <div className="dark:prose-invert text-foreground leading-relaxed prose prose-sm">
                {descriptionJSX}
              </div>
            )}
            {Metadata && <div className="pt-2">{Metadata}</div>}
          </div>
        </div>
      )}
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="md:w-3xl md:max-w-[calc(100vw_-_32px)] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">{entry.title}</DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="sr-only">{entry.title}</SheetTitle>
        </SheetHeader>
        <div className="mx-8 my-6">{content}</div>
      </SheetContent>
    </Sheet>
  );
}
