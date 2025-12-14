"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import justifiedLayout from "justified-layout";
import { UsesEntry } from "@/types/uses";
import { EntryMasonryItem } from "./entry-masonry-item";

interface EntriesContainerMasonryProps {
  entries: UsesEntry[];
  sectionIcon?: string;
  onEntryClick: (entry: UsesEntry) => void;
  showHidden?: boolean;
}

// The masonry here is a horizontally-justified rows layout (Flickr-style) with
// a uniform height per row. We use the `justified-layout` algorithm to compute
// box sizes based on media aspect ratios, then absolutely place the tiles.
export function EntriesContainerMasonry({
  entries,
  sectionIcon,
  onEntryClick,
  showHidden = false,
}: EntriesContainerMasonryProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Compute the ordered entries array: visible first, then hidden when expanded
  const orderedEntries = useMemo(() => {
    const visible = entries.filter((e) => !e.hidden);
    const hidden = entries.filter((e) => !!e.hidden);
    return showHidden ? [...visible, ...hidden] : visible;
  }, [entries, showHidden]);

  // Measure container width responsively
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (cr) setContainerWidth(Math.floor(cr.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // No client-side image measurement: rely on server-provided metadata.

  // Decide media type and aspect ratio for each tile.
  const aspectRatios = useMemo(() => {
    return orderedEntries.map((e) => {
      if (e.photo?.width && e.photo?.height) {
        return e.photo.width / e.photo.height;
      }
      if (e.logo?.width && e.logo?.height) {
        return e.logo.width / e.logo.height;
      }
      // Icons or unknown sizes default to square
      return 1;
    }).map((ar) => 
      // Limit aspect ratio to max landscape 16:9
      Math.min(ar, (4 / 3))
    );
  }, [orderedEntries]);

  // Compute layout geometry only when we have some width.
  const geometry = useMemo(() => {
    if (!containerWidth) return null;
    // Prefer shorter row height on small screens
    const rowH = containerWidth < 640 ? 160 : containerWidth < 1024 ? 200 : 240;
    return justifiedLayout(aspectRatios, {
      containerWidth,
      boxSpacing: { horizontal: 16, vertical: 16 + 36 },
      targetRowHeight: rowH,
      targetRowHeightTolerance: 0.25,
      maxNumRows: Number.POSITIVE_INFINITY,
      showWidows: true,
      fullWidthBreakoutRowCadence: false,
      containerPadding: { left: 0, right: 0, top: 0, bottom: 36 },
    });
  }, [aspectRatios, containerWidth]);

  // Geometry values when available
  const boxes = useMemo(
    () =>
      (geometry?.boxes as Array<{
        left: number;
        top: number;
        width: number;
        height: number;
      }>) || [],
    [geometry]
  );
  const containerHeight = useMemo(
    () => geometry?.containerHeight || 0,
    [geometry]
  );

  // Apply dynamic sizing without JSX style props to satisfy lint rules
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.style.height = `${Math.ceil(containerHeight)}px`;
    }
    if (!boxes.length) return;
    boxes.forEach((b, i) => {
      const node = itemRefs.current[i];
      if (!node) return;
      node.style.left = `${b.left}px`;
      node.style.top = `${b.top}px`;
      node.style.width = `${b.width}px`;
      node.style.height = `${b.height + 36}px`;
      node.style.position = "absolute";
    });
  }, [boxes, containerHeight]);

  return (
    <div ref={containerRef} className="relative w-full transition-all">
      {boxes.length ? (
        boxes.map((_, idx) => (
          <div
            key={`masonry-${idx}`}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
          >
            <EntryMasonryItem
              entry={orderedEntries[idx]}
              sectionIcon={sectionIcon}
              onClick={() => onEntryClick(orderedEntries[idx])}
            />
          </div>
        ))
      ) : (
        <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 transition-all">
          {orderedEntries.map((entry, idx) => (
            <EntryMasonryItem
              key={`masonry-fallback-${idx}`}
              entry={entry}
              sectionIcon={sectionIcon}
              onClick={() => onEntryClick(entry)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
