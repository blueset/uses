import type { ISizeCalculationResult } from "image-size/types/interface";
import type { ReactNode } from "react";
import { data } from "../../.velite"

export type UsesConfig = typeof data;

export interface UsesLink {
  title: string;
  url: string;
}

export interface UsesMetadata {
  key: string;
  value: string;
}

export interface ImageMetadata {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  blurWidth: number;
  blurHeight: number;
}

export interface UsesEntry {
  title: string;
  description?: string;
  descriptionSummary?: string;
  photo?: ImageMetadata;
  logo?: ImageMetadata;
  icon?: string;
  links?: UsesLink[];
  hidden?: boolean;
  metadata?: UsesMetadata[];
  // Pre-rendered on the server: short card summary (e.g., first paragraph)
  cardDescriptionJSX?: ReactNode;
  // Pre-rendered on the server: full description for details view
  fullDescriptionJSX?: ReactNode;
}

export interface UsesSection {
  title: string;
  color?: string;
  icon?: string;
  type: "software" | "hardware";
  defaultLayout: "grid" | "list" | "masonry";
  entries: UsesEntry[];
}

// export interface UsesConfig extends UsesData {
//   // sections: UsesSection[];
  
// }

export interface MDXComponentProps {
  children: ReactNode;
}
