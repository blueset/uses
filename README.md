# Uses Page

A dynamic uses page built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui that showcases developer setups, gear, software, and configurations. The page is available at the root URL (`/`) of the application.

## Features

- **YAML Configuration**: Easy-to-edit YAML file for content management
- **Multiple Layout Types**: Grid, list, and masonry layouts for different content types
- **Responsive Design**: Optimized for desktop and mobile experiences
- **Interactive Details**: Modal dialogs on desktop, bottom sheets on mobile
- **MDX Support**: Rich text descriptions with Markdown
- **Iconify Integration**: Extensive icon library support
- **Hidden Entries**: Expandable sections with "View more" functionality

## Project Structure

```
src/
├── app/
│   ├── page.tsx             # Main uses page (root route)
│   ├── globals.css          # Global styles
│   ├── layout.tsx          # Root layout
│   └── favicon.ico         # Site icon
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── uses/                # Custom uses components
│       ├── entries-container-list.tsx   # List container (maps entries)
│       ├── entries-container-grid.tsx   # Grid container (maps entries)
│       ├── entries-container-masonry.tsx # Masonry container (maps entries)
│       ├── entry-list-item.tsx          # Single entry (list variant)
│       ├── entry-grid-item.tsx          # Single entry (grid variant)
│       ├── entry-masonry-item.tsx       # Single entry (masonry variant)
│       ├── entry-details.tsx # Modal/sheet for entry details
│       ├── uses-page.tsx    # Main page component
│       └── uses-section.tsx # Section component
├── data/
│   └── uses.yaml           # Content configuration
├── hooks/
│   └── use-media-query.ts  # Media query hook
├── lib/
│   ├── uses.ts             # YAML parsing utilities
│   └── utils.ts            # General utilities
└── types/
  └── uses.ts             # TypeScript definitions (UsesEntry, UsesSection, UsesMetadata)
```

## Configuration

The content is configured via `src/data/uses.yaml`. Each section supports:

### Section Properties

- `title`: Section title
- `color`: Tailwind gradient classes for theme color
- `icon`: Iconify icon class
- `type`: "software" or "hardware"
- `defaultLayout`: "grid", "list", or "masonry"
- `entries`: Array of entries

### Entry Properties

- `title`: Entry title
- `description`: MDX-formatted description
- `photo`: Path to photo (landscape images)
- `logo`: Path to logo (square images)
- `icon`: Iconify icon class
- `links`: Array of related links
- `hidden`: Boolean to hide entry initially
- `metadata`: Optional array of key/value pairs to display in the details overlay

### Metadata Type

TypeScript:

```ts
export interface UsesMetadata { key: string; value: string }
```

## Layout Types

### Software Sections

- **Grid**: Cards with fixed aspect ratio placeholders
- **List**: Compact rows with icons/logos

### Hardware Sections

- **Masonry**: Pinterest-style layout with varied heights
- **List**: Same as software list layout

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first styling
- **shadcn/ui**: Modern UI components
- **MDX**: Rich text content
- **Iconify**: Comprehensive icon library
- **js-yaml**: YAML parsing

## Getting Started

1. Install dependencies:
   
  ```bash
  npm install
  ```

1. Run the development server:
   
  ```bash
  npm run dev
  ```

1. Visit [http://localhost:3000](http://localhost:3000) to see your setup page

## Customization

1. **Content**: Edit `src/data/uses.yaml` to modify sections and entries
2. **Styling**: Customize colors and layouts in the YAML configuration
3. **Icons**: Use any Iconify icon with the format `iconify collection-name--icon-name` (e.g., `iconify lucide--code-2`, `iconify simple-icons--figma`)
4. **Images**: Add images to `public/images/` and reference them in the YAML

## Deployment

Build for production:

```bash
npm run build
```

The app generates a static site that can be deployed to any hosting platform.

## Example YAML Configuration

```yaml
sections:
  - title: "Development Environment"
    color: "from-blue-500 to-purple-600"
    icon: "iconify lucide--code-2"
    type: "software"
    defaultLayout: "list"
    entries:
      - title: "Visual Studio Code"
        description: "My primary code editor with extensive customization."
        icon: "iconify simple-icons--visualstudiocode"
        metadata:
          - key: "Version"
            value: "1.93"
          - key: "Theme"
            value: "Tokyo Night"
        links:
          - title: "Download"
            url: "https://code.visualstudio.com/"
```
