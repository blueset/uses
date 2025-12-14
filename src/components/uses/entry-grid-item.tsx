'use client';

import { UsesEntry } from '@/types/uses';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface EntryGridItemProps {
  entry: UsesEntry;
  sectionIcon?: string;
  onClick: () => void;
  descriptionJSX?: React.ReactNode;
}

export function EntryGridItem({ entry, sectionIcon, onClick, descriptionJSX }: EntryGridItemProps) {
  const renderPlaceholder = () => {
    if (entry.photo) {
      return (
        <Image
          src={entry.photo.src}
          alt={entry.title}
          width={300}
          height={300}
          blurDataURL={entry.photo.blurDataURL}
          className="bg-muted dark:bg-muted/50 p-2 w-full object-contain aspect-square"
        />
      );
    }

    if (entry.logo) {
      return (
        <div className="flex justify-center items-center bg-muted dark:bg-muted/50 group-hover:bg-muted/40 group-hover:dark:bg-muted/30 p-4 w-full aspect-square transition-colors">
          <Image
            src={entry.logo.src}
            alt={entry.title}
            width={entry.logo.width}
            height={entry.logo.height}
            blurDataURL={entry.logo.blurDataURL}
            className="max-w-full max-h-12 object-contain"
          />
        </div>
      );
    }

    if (entry.icon || sectionIcon) {
      return (
        <div className="flex justify-center items-center w-full aspect-square">
          <div className="flex justify-center items-center bg-muted dark:bg-muted/50 group-hover:bg-muted/30 group-hover:dark:bg-muted/30 p-6 ring-border/50 rounded-md ring-1 w-full h-full transition-colors">
            <div className={cn(entry.icon || sectionIcon, 'text-5xl text-muted-foreground')} />
          </div>
        </div>
      );
    }

    return null;
  };

  const renderDescription = () => {
    if (!descriptionJSX) return null;
    return (
      <div className="text-muted-foreground text-sm line-clamp-3">
        {descriptionJSX}
      </div>
    );
  };

  return (
    <div
      className="group space-y-3 p-0 transition-all hover:-translate-y-0.5 cursor-pointer"
      onClick={onClick}
    >
      <div className="rounded-md overflow-hidden">
        {renderPlaceholder()}
      </div>
      <div>
        <h3 className="mb-1 font-semibold truncate">{entry.title}</h3>
        {renderDescription()}
      </div>
    </div>
  );
}
