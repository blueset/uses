import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { UsesConfig } from "@/types/uses";
import { data } from "@velite";

export function loadUsesConfig() {
  return data;
}

export function loadUsesConfigFs(): UsesConfig {
  const configPath = path.join(process.cwd(), "src", "data", "uses.yaml");
  const fileContents = fs.readFileSync(configPath, "utf8");
  return yaml.load(fileContents) as UsesConfig;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
