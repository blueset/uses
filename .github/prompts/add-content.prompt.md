# Add Content Prompt: Updating `src/data/uses.yaml`

Goal: Create or edit sections and entries in `src/data/uses.yaml` while following the project’s schema and visual rules. Use the available search tools (Iconify, Wikimedia Commons, English Wikipedia) to validate icons/logos and sources. Keep YAML icon values as Iconify Tailwind class strings; do not convert to JSX.

Key constraints
- YAML icon values must be Iconify class strings in the format: `iconify <collection>--<icon>` (example: `iconify lucide--code-2`), or `"iconify-color <collection>--<icon>"` for colored icons.
- Icons from YAML remain strings; UI components will render them via Tailwind Iconify classes. Do not import `lucide-react` here.
- Descriptions are MDX content strings; rendering happens on the server. Do not add HTML fallbacks or client-side MDX.
- Store any downloaded logos under `public/images/` with a sensible, kebab-cased file name.

## Schema reminder
A section contains entries. Only include fields that exist in the schema.

```yaml
sections:
  - title: "Section Name"
    type: "software" | "hardware"
    icon: "iconify <collection>--<icon>"
    color: "text-... dark:text-..."
    defaultLayout: "grid" | "list" | "masonry"
    entries:
      - title: "Entry Name"
        description: "MDX content here"
        icon: "iconify <collection>--<icon>" # optional if logo/photo provided
        logo: "/images/<file>"                # optional
        photo: "/images/<file>"               # optional
        hidden: false                          # optional
        links:
          - title: "Official website"
            url: "https://example.com"
        metadata:
          - key: "Key label"
            value: "Value"
```

## Section rules
1) Color (Tailwind text colors)
- Use Tailwind text color utilities only (example: `text-blue-600`).
- Provide good contrast in both themes by pairing a light and dark variant in the same string, e.g. `text-blue-600 dark:text-blue-300`.
- New section color must be unique across sections. If a color (including its dark variant) is already used, pick a different hue.

2) Icon (Iconify, string value)
- The section icon must accurately represent the section’s concept.
- Icon priority order (try in this order):
  1. lucide
  2. fluent (outline, 24px set)
  3. material-symbols (outlined, rounded)
  4. mdi
  5. any other monochrome icon pack
- Use the tools to ensure the icon exists:
  - Search Iconify for the concept keyword(s).
  - Select the best match from the highest available pack per the priority list.
  - Save as an Iconify class string: `iconify <collection>--<icon>`.

3) Default layout
- Choose one of: `grid`, `list`, or `masonry` based on content density and imagery quality.

## Entry rules
1) Visual: icon and/or logo
- Prefer an Iconify icon first.
  - Prefer colored icons when available. Use format `"iconify-color <collection>--<icon>"` for colored icons.
  - Use the palette tool to check the icon’s colors:
    - If the palette is solely black/white/grayscale, treat it as effectively monochrome and prefer a high-quality monochrome icon instead.
  - If no suitable icon is found in Iconify:
    - Search Wikimedia Commons for an SVG logo of the product/brand.
    - Prefer a square-aspect variant when possible.
    - Prefer the most recent/official logo variant.
    - Save to `public/images/` (e.g., `/images/<brand-or-entry>-logo.svg`).
- If neither an icon nor a logo can be found, omit both fields; do not add placeholders.

2) Links (add as many that qualify, in this order of precedence)
- Official website (if it exists).
- For software: if no official website but there is a source repository (e.g., GitHub), add that.
- For development libraries: add the package manager page (e.g., npm, PyPI) as well.
- English Wikipedia page:
  - Only if it’s specific to the entry or a precise fragment within a broader page.
  - Examples:
    - "Google Pixel 10 Pro XL" → page "Google Pixel 10" is acceptable.
    - "Fitbit Versa" → page "List of Fitbit products" with a fragment linking to the Versa section is acceptable.
    - "Raspberry Pi 5" → page "Raspberry Pi" with a generic fragment like "Series and generations" is NOT acceptable.

3) Description (MDX)
- Write concise MDX; paragraphs and inline links are fine.

## What counts as a colored vs monochrome icon pack?
- A pack (or individual icon) is considered colored if `palette: true`; otherwise it’s monochrome (`palette: false`). Use the palette information to detect grayscale-only colored icons and fall back to monochrome icons in that case.

## Tool usage (mandatory for verification)
Search keyword hygiene
- When searching for icons or logos, do not include generic words like "icon", "logo", "color", or "svg" in your search keywords. Use only the product/brand name or concept (e.g., "visual studio code", "raspberry pi", "calendar", "mechanical keyboard").
- Bad vs good examples:
  - Bad: "vscode logo svg", "calendar icon", "google pixel 10 icon color"
  - Good: "visual studio code", "calendar", "google pixel 10"
- If you need to know whether an icon is colored, use the response to decide than adding "color" to the search query.

Use the available tools to research and validate content before committing changes:
- Iconify search: find candidate icons across collections using entry/section keywords; apply the priority order.
- Iconify palette: inspect color palettes to decide colored vs monochrome and detect grayscale-only cases.
- Wikimedia Commons search: find official SVG logos when Iconify lacks a suitable icon.
- English Wikipedia search: find precise pages or section fragments for authoritative references.

Tailwind Iconify prefixes sync
- After choosing any Iconify icon, verify that its collection prefix is configured in `src/app/globals.css` under the `@plugin "@iconify/tailwind4" { prefixes: ... }` block.
- If the collection is not present, add the collection name (just the collection, not the full `collection--icon` string) to the comma-separated `prefixes` list. For example, for `logos--visual-studio-code`, ensure `logos` is listed.
- Do not remove existing prefixes; keep the list additive and alphabetically ordered when convenient.

Record your choices in YAML using:
- `icon`: `iconify <collection>--<icon>` or `"iconify-color <collection>--<icon>"` string.
- `logo`: `/images/<file-name.ext>` path (file stored in `public/images/`)

## Example additions
Section example
```yaml
- title: Productivity
  type: software
  icon: iconify lucide--calendar
  color: text-indigo-600 dark:text-indigo-300
  defaultLayout: grid
  entries: []
```

Entry examples
```yaml
- title: Visual Studio Code
  description: My daily editor with extensions for TypeScript and React.
  icon: iconify-color logos--visual-studio-code # colored icon with non-grayscale palette
  links:
    - title: Website
      url: https://code.visualstudio.com/
    - title: Wikipedia
      url: https://en.wikipedia.org/wiki/Visual_Studio_Code

- title: Raspberry Pi 5
  description: Home lab single-board computer for tooling and experiments.
  logo: /images/raspberry-pi-logo.svg # downloaded SVG from Wikimedia Commons, square-friendly
  links:
    - title: Website
      url: https://www.raspberrypi.com/
    - title: Wikipedia
      url: https://en.wikipedia.org/wiki/Raspberry_Pi#Raspberry_Pi_5
```

## Checklist before committing
- Section color is a Tailwind text color pair with light/dark contrast and is unique among sections.
- Section icon string uses proper Iconify class format and exists in the specified collection.
- Entry icon preference applied: colored (non-grayscale) → monochrome fallback → Wikimedia SVG logo → none.
- Any downloaded logos live in `public/images/` with clear file names.
- Links follow precedence rules and Wikipedia links are precise/specific.
- YAML validates against the schema fields shown above.
- Any new Iconify collection used is added to `src/app/globals.css` in the `@plugin "@iconify/tailwind4" { prefixes: ... }` list.

Notes
- Keep icon strings as YAML strings; do not import icons into YAML or convert to JSX.
- Grid/List/Masonry layout behaviors and MDX rendering are handled by server/client components; no special handling is needed in YAML beyond the fields above.
