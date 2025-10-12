You are improving the look-and-feel of a Next.js (App Router) + Tailwind site for a “/uses” page. Focus purely on visual presentation and layout (CSS/Tailwind, minor JSX structure as needed). Keep data shapes and behavior intact. The site should compile to a static site.

Primary page: a catalog of sections (software, hardware) containing entries. Each entry can show a details view (dialog on desktop, bottom sheet on mobile). Designs are provided via the following spec; implement the visual system and component layouts accordingly.

Do not change data contracts. Add/adjust classes, CSS variables, or small wrappers as needed.

### Global Visual System

- Theme: light and dark, respect the system settings.
- Backdrop: when dialog/sheet open, use a subtle scrim with opacity ~.6 in dark, ~.5 in light; backdrop-blur-sm.
- Corners: follow round corner rules of shadcn/ui.
- Strokes: follow round corner rules of shadcn/ui.
- Spacing scale: section paddings ~24–32px on mobile, 32–48px on desktop; consistent gap-4/6 between items.
- Typography: friendly display title for section/entry titles; body copy readable and compact; links visibly styled with an external-arrow icon for outbound links.
- Motion: micro transitions (150–200ms) for hover/press, dialog/sheet entrance (springy but quick); prefer Tailwind transitions and data-[state] animations.
- Accessibility: focus-visible rings, ESC to close overlays, trap focus in overlays, body scroll locked while open.

### Components

#### 1) Header

- Left: small site mark/icon then “/uses” title.
- Right: theme toggle (moon/sun icon).

Layout:

Title on single line; icon + title grouped; toggle aligned right.

#### 2) Page Intro (Hero)

- A short paragraph under the header describing the page purpose.
- Use large type size with a subtle color, cap the line width at a maximum of 10 words for readability.
- Margin-y to separate from neighboring sections (my-6 mobile, my-10 desktop).

#### 3) Section Shell

- Structure: Section header row, content area, “View more” row.
- Header:
  - Left: optional section icon placeholder + “Section Title”.
  - Right: view-mode switch: grid, list, or masonry icons; only show valid modes for that section type. Use ghost icon buttons with dropdown menu.
- Spacing: generous top margin between sections; keep header aligned to content.

Behavior:

- “View more” expands hidden entries. Ensure hidden entries render after visible entries when expanded (order: visible → hidden).
- “View more” button should be aligned to the left, with a ghost appearance, and has a trailing chevron icon.
- Keep expand/collapse animated with height/opacity transitions (no layout shift glitches).

#### 4) Entry Presentations

Common rules:

- If an entry has none of photo/logo/icon, fall back to the section icon as its placeholder.
- Links list: inline link pills/anchors with external-arrow icon.
- Name/title truncation: single line with ellipsis where specified.
- Description source: first paragraph of description unless otherwise stated.
- Iconify icons are provided as Tailwind classes; render within a circular or padded box as specified.

4a) Software: grid

- Layout: responsive grid of uniform cards.
  - Mobile: 2 columns; Desktop: 3–4 columns depending on container width.
- Placeholder slot: fixed 1:1 aspect ratio at the top of card.
  - Photo and logo: object-contain, centered, full width/height within rounded container.
  - Icon: centered in a circular soft background; icon size ~60% of slot; use subtle ring.
- Card body: title (single line), description (first paragraph) capped to max 3 lines with ellipsis.
- Card interactivity: hover lift and border emphasis; entire card clickable.

4b) Software: list

- Layout: vertical list rows with left media placeholder and right text.
- Placeholder: logo/icon only; photo ignored. Logo/icon height ~1em relative to text line; keep proportions.
- Desktop: the row is one line total (title + description). Truncate overflow with ellipsis after description. Keep a small gap between title and description.
- Mobile: two-line layout:
  - Line 1: icon + title, single line ellipsis.
  - Line 2: description, single line ellipsis.

4c) Hardware: masonry

- Layout: variable-height masonry grid with gaps; cards align to rows with a sensible range of max-height and min-height set.
- Placeholder slot:
  - Photo: fill the slot (object-cover) across the available card width; keep rounded corners.
  - Logo: padded within the slot (object-contain) with medium padding.
  - Icon: larger padding than logo; keep overall slot 1:1 aspect ratio if icon is used.
- Title below media: single line with ellipsis. No description should be shown for masonry layout.
- Cards should not have any border.

4d) Hardware: list

- Same row rules as Software list: logo/icon only (photo ignored), 1em height media.
- Desktop: single-line row with truncated description.
- Mobile: two lines (icon+title) then description; both single-line ellipsis.

#### 5) “View more” Row

- Aligned left under content area; small chevron indicating expand/collapse.
- On expand: reveal hidden entries appended after visible ones; animate with collapsible pattern.

#### 6) Entry Details (overlay)

- Trigger: clicking an entry opens details.
- Desktop: centered dialog.
- Mobile: bottom sheet.

Two content layouts:

- default: used when no photo or when photo is portrait/square. If an entry has a logo or icon but no photo, use `default` regardless of aspect ratio.
- landscape: used when a defined photo has width > height.

Common overlay rules:

- Backdrop: dim + blur as above.
- Close button: “X” at the top-right inside the surface, accessible label “Close”.
- Content can be long; container scrolls internally.
- If no logo/icon/photo, omit the visual placeholder entirely.

default layout specifics:

- Visual block (photo/logo/icon) sits left of the textual content on desktop only; otherwise it sits above text for mobile layout.
- Max-width for visual block should be capped at 1/3 to 2/5 of the container (dialog or bottom sheet) width.
- Rendering:
  - Photo, logo: retain original aspect ratio and fit the width constraints, rounded corners.
  - Icon: centered in a circular soft background with adequate padding.

landscape layout specifics:

- Large banner-style photo spans the top of the content width (rounded corners), followed by section title line, entry title, links, body copy, and metadata grid.

Body content:

- Subtitle: Section name with icon before it, set to all caps with smaller caption-size text, add appropriate tracking. Subtitle should be in the color of the section as defined.
- Title: Entry title, set to larger text size with bold weight.
- Links: shown below title as inline ghost buttons. Links should have appropriate gaps between them, and should wrap when appropriate. Use external-link icon at the end of each link. In mobile layout, links should be stacked top to bottom with variable widths.
- Description: multiple paragraphs.
- Metadata: two-column key/value grid; keys left-aligned; values right-next column. Wrap gracefully on narrow widths.

Gaps should be consistent between the following groups:

- Group 1: Subtitle, Title, Links
- Group 2: Description
- Group 3: Metadata

#### 7) Footer

- Minimal footer area with small brand link (e.g., “1A23 Studio”) on the left and a compact site mark + “/uses” on the right. Subtle spacing.

### Responsive Behavior

- Breakpoints: Tailwind defaults (sm, md, lg, xl). Aim for:
  - Mobile (sm−): single column with 2-col grids for compact card views.
  - Tablet (md): increase grid columns and paddings.
  - Desktop (lg+): 3–4 columns, larger gutters, dialog centered with max-w-3xl to max-w-4xl.

### Truncation Rules

- Grid cards (software): description max 3 lines (line-clamp-3).
- List rows (software/hardware):
  - Desktop: entire row fits one line; description truncates at end.
  - Mobile: two lines total: line 1 title group; line 2 description; both single-line ellipsis.
- Hardware masonry: title is single line; ellipsis if overflow.

### Placeholder/Image/Icon Rules

- Priority for visible media:
  - grid/masonry: photo > logo > icon > section icon.
  - list: logo > icon > section icon (ignore photo).
- Icon rendering: circular background pill with balanced padding; center the icon; size to ~text-2xl within the circle.
- Photo/logo: keep aspect ratio, rounded corners; use object-contain unless note says object-cover (masonry photo fill).

### Interactions

- Hover/press states on cards and list rows.
- Keyboard: Enter/Space to open, ESC to close overlays.
- Focus ring on interactive controls and close buttons (ring-2 ring-offset-2).
- Smooth open/close animations: dialogs scale+fade; sheets slide-up+fade; content areas fade-in.

### Theming Tokens (suggested Tailwind variables/classes)

- Surfaces: bg-background, text-foreground.
- Borders: border-border (adjust opacity in dark).
- Muted surfaces: bg-muted / text-muted-foreground for icon backgrounds and skeletons.
- Accent for links and active toggles: text-primary, hover:text-primary-foreground on active chips.

### Acceptance Criteria

- Visuals match wireframes: card shapes, backdrops, dialog/sheet forms, spacing, and truncation behaviors.
- Masonry grid displays variable-height cards without gaps; grid/list obey breakpoints.
- Details overlay switches between default and landscape based on photo aspect ratio. No media placeholder when none is available.
- “View more” reveals hidden entries appended after the visible entries with smooth height/opacity animation.
- Desktop uses dialog; mobile uses bottom sheet; both are scrollable when content exceeds viewport.
- All interactions accessible (keyboard/focus/aria) and theme-aware (light/dark).
