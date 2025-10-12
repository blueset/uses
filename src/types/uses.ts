import type { ISizeCalculationResult } from "image-size/types/interface";
import type { ReactNode } from "react";

export interface UsesLink {
  title: string;
  url: string;
}

export interface UsesMetadata {
  key: string;
  value: string;
}

export interface UsesEntry {
  title: string;
  description?: string;
  photo?: string;
  logo?: string;
  icon?: string;
  links?: UsesLink[];
  hidden?: boolean;
  metadata?: UsesMetadata[];
  // Pre-rendered on the server: short card summary (e.g., first paragraph)
  cardDescriptionJSX?: ReactNode;
  // Pre-rendered on the server: full description for details view
  fullDescriptionJSX?: ReactNode;
  // Pre-rendered on the server: photo metadata
  photoMetadata?: ISizeCalculationResult;
  // Pre-rendered on the server: logo metadata
  logoMetadata?: ISizeCalculationResult;
}

export interface UsesSection {
  title: string;
  color?: string;
  icon?: string;
  type: "software" | "hardware";
  defaultLayout: "grid" | "list" | "masonry";
  entries: UsesEntry[];
}

export interface UsesConfig {
  sections: UsesSection[];
}

export interface MDXComponentProps {
  children: ReactNode;
}
