# Copilot Instructions for Uses Page Project

## Project Overview
This is a Next.js 15 project that creates a comprehensive `/uses` page (now at root `/`) showcasing developer setups with multiple layout types, responsive design, and theme support.

## Tech Stack
- **Next.js 15**: App Router with static site generation and Turbopack
- **TypeScript**: Full type safety with custom interfaces
- **Tailwind CSS 4**: Utility-first styling with custom iconify plugin
- **shadcn/ui**: Component library (dialog, sheet, button, card components)
- **MDX Integration**: Server-side rendering with `next-mdx-remote/rsc`
- **Icons**: `lucide-react` for UI components, and Iconify (lucide + simple-icons) via Tailwind classes for YAML-driven content
- **Theme System**: React Context with localStorage persistence

## Critical Architecture Patterns

### MDX Rendering Rules
1. **NEVER use MDX in client components** - MDX rendering must ONLY happen in server components
2. **Server components** handle all MDX processing using `next-mdx-remote/rsc`
3. **Client components** receive pre-rendered JSX as props (e.g., `descriptionJSX?: React.ReactNode`)
4. **NO fallback text rendering** - Do not create custom markdown parsers or plain text fallbacks
5. **Pre-render all MDX content** in server components and pass down to client components

### Component Architecture
```
Server Components (can use MDX):
- src/app/page.tsx
- src/components/uses/uses-page.tsx
- src/components/server-mdx.tsx

Client Components (receive pre-rendered JSX):
- src/components/uses/uses-section.tsx (manages state: showHidden, selectedEntry)
- src/components/uses/entries-container-list.tsx
- src/components/uses/entries-container-grid.tsx
- src/components/uses/entries-container-masonry.tsx
- src/components/uses/entry-list-item.tsx
- src/components/uses/entry-grid-item.tsx
- src/components/uses/entry-masonry-item.tsx
- src/components/uses/entry-details.tsx (receives descriptionJSX prop)
- src/components/theme-toggle.tsx
```

### Icon usage rules
- In UI components: import icons from `lucide-react` and render as JSX (e.g., `<Sun className="w-5 h-5" />`).
- From YAML (`src/data/uses.yaml`): keep icons as Tailwind Iconify classes using `"iconify [pack-name]--[icon-name]"` (e.g., `"iconify lucide--code-2"`), or `"iconify-color [pack-name]--[icon-name]"` for colored icons.
- Iconify classes are enabled via the Tailwind Iconify plugin in `globals.css`.

## File Structure and Responsibilities

### Core Configuration
- `src/data/uses.yaml`: Central content configuration with sections and entries
- `src/types/uses.ts`: TypeScript interfaces for UsesConfig, UsesSection, UsesEntry
- `src/lib/uses.ts`: YAML loader function `loadUsesConfig()`

### Layout Types Supported
1. **Grid**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`
2. **List**: `space-y-3`
3. **Masonry**: `columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4`

### Responsive Design Requirements
- **Desktop**: Modal dialogs for entry details
- **Mobile**: Bottom sheets for entry details
- Use `useMediaQuery('(min-width: 768px)')` to determine layout
- Components: Dialog/DialogContent for desktop, Sheet/SheetContent for mobile

### Theme System Implementation
- Theme Toggle in `src/components/theme-toggle.tsx`
- Supports: light, dark, system preferences
- Integrated in layout.tsx with ThemeProvider wrapper

## Content Structure (YAML Configuration)

### Required YAML Structure
```yaml
sections:
  - title: "Section Name"
    type: "software" | "hardware"
    icon: "iconify pack-name--icon-name"
    color: "text-color" # (Tailwind text color classes; can include dark: variants)
    defaultLayout: "grid" | "list" | "masonry"
    entries:
      - title: "Entry Name"
        description: "MDX content here"
        icon: "iconify lucide--icon-name"
        logo: "/path/to/logo.png"
        photo: "/path/to/photo.jpg"
        hidden: false
        links:
          - title: "Link Name"
            url: "https://example.com"
        metadata:
          - key: "Key label"
            value: "Value"
```

### Entry Display Logic
- **List layout**: Always use logo/icon, never photo
- **Grid/Masonry**: Prefer photo, fallback to logo, then icon, then section icon
- **Grid descriptions**: Show only first paragraph, truncated
- **Details modal**: Show full description with complete MDX rendering
- **Metadata**: If `metadata` array is present, render a two-column key/value grid beneath the description in the details overlay

## Development Guidelines

### When Adding New Features
1. **Always maintain server/client component separation**
2. **Pre-render any MDX content in server components**
3. **Pass rendered JSX as props to client components**
4. **Test both development and production builds**
5. **Ensure responsive design works on both desktop and mobile**

### Class name composition (cn utility)
- Always use the `cn` helper from `@/lib/utils` to compose dynamic `className` values.
- Do not concatenate strings or use template literals for conditional classes.
- Pattern: `className={cn('base classes', condition && 'optional classes', maybeStringVar)}`.
- When combining Iconify strings from YAML with Tailwind classes, pass the string to `cn` instead of interpolating: `cn(entry.icon, 'text-4xl text-muted-foreground')`.
- Also use `cn` to merge font variables and other string sources: `cn(geistSans.variable, geistMono.variable, 'antialiased')`.
- Reason: `cn` wraps `clsx` + `tailwind-merge`, preventing duplicate or conflicting Tailwind utilities.

### shadcn/ui Components
- If a shadcn/ui component is missing, always add it via the shadcn CLI. Do not hand-roll or copy/paste components.
  - Use: `npx shadcn add <component-name>` (for example: `dropdown-menu`, `dialog`, `sheet`, `button`, `card`).
  - Let the CLI install and manage any Radix/UI dependencies.
- Keep `components.json` authoritative for aliases and generation settings; do not change import paths away from the configured aliases.
- If customization is needed, start from the CLI-generated component and keep its public API stable unless the change is intentional and reflected across usages.

### Error Prevention
- Never call `MDXRemote` directly in client components
- Never use `useState` in async server components
- Always use absolute paths for file operations
- Test icon formats in both development and build
- Verify theme toggle works across all components
- Avoid manual string concatenation for `className`; always use `cn()`

### Build Requirements
- Must pass `npm run build` without errors
- Static site generation must work (all pages prerendered)
- No client-side MDX rendering errors
- All TypeScript types must be satisfied

## Common Patterns

### Adding New Entry Card Layouts
1. Update `getLayoutClasses()` in uses-section.tsx
2. Add responsive classes following existing patterns
3. Test on mobile and desktop viewports

### Adding New Content Sections
1. Update `src/data/uses.yaml` with new section
2. Ensure all required fields are present
3. For section/entry icons in YAML, use proper Iconify class format
4. Set `color` to a Tailwind text color class (e.g., `text-blue-600`, `dark:text-gray-300`). Do not use background gradients or `from-`/`to-` classes.
4. Test MDX rendering in descriptions

### Theme Integration
- All new components should support theme classes
- Use `bg-background`, `text-foreground`, `text-muted-foreground`
- Test in light, dark, and system theme modes

## Testing Checklist
- [ ] `npm run build` passes without errors
- [ ] `npm run dev` starts without warnings
- [ ] All icon formats display correctly
- [ ] Theme toggle works in all components
- [ ] Modal/sheet opens correctly on desktop/mobile
- [ ] MDX content renders properly (no plain text fallbacks)
- [ ] Responsive layouts work across all screen sizes
- [ ] All TypeScript errors resolved
- [ ] Any new shadcn/ui components were added via the shadcn CLI (no ad-hoc copies; deps installed)

## Important Notes
- This project showcases a developer's setup/tools (software and hardware)
- URL structure: Root path `/`
- Static site generation optimized for performance
- Full TypeScript coverage required
- Accessibility features implemented (screen reader support)
- Modern React patterns (server components, client components separation)
