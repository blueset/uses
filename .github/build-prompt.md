Build a `/uses` page detailing my developer setups, gear, software and configs.

The page is a single page app, your environment has the following libraries installed: Next.JS, TypeScript, Tailwind CSS, shadcn/ui, lucide-react, @iconify/tailwind4, MDX.

The app should have a YAML configuration file that defines the structure and content of the `/uses` page.

The page consists of several sections, each section has the following properties:

- `title`: The title of the section.
- `color`: The theme color of the section, expressed as a string of Tailwind CSS classes, optional.
- `icon`: The iconify icon to represent the section, expressed as a Tailwind CSS class, optional.
- `type`: The type of content in the section, one of "software", "hardware".
- `defaultLayout`: The default layout for the section, one of "grid", "list", "masonry".
- `entries`: The list of entries in the section, each with its own properties.

Each entry has the following properties:

- `title`: The title of the entry.
- `description`: A brief description of the entry, parse this as an MDX string, optional.
- Zero or one of the following:
  - `photo`: A photo of the entry, expressed as a string of local relative path.
  - `logo`: A logo of the entry, expressed as a string of local relative path.
  - `icon`: An iconify icon of the entry, expressed as a Tailwind CSS class.
- `links`: A list of links related to the entry, optional, each expressed as an object with the following properties:
  - `title`: The title of the link.
  - `url`: The URL of the link.
- `hidden`: A boolean flag indicating whether the entry is hidden by default until expanded.

The page designs are attached in the wireframe images.

Depending on the type of the sections, each section may have a different layout or presentation style.

- `software` sections may have the following layouts:
  - `grid`: A grid of entry cards.
    The placeholder slot for photo/logo has a fixed aspect ratio of 1:1. Photo and logo should have object-fit: contain; Icon should have a round shape background, and the icon placed in the center.
    If the entry has none of the above, use the icon of the section as its own icon.
    Description in the card should be the first paragraph of the defined description, capped at 3 lines at most, and truncated with an ellipsis if necessary.
  - `list`: A list of entry rows.
    The placeholder shall represent the logo / icon of the entry, photo property is ignored here. The logo/icon shall have a fixed height of 1em.
    If the entry has neither a logo nor an icon, use the icon of the section as its own icon.
    Description in the card should be the first paragraph of the defined description.
    In desktop mode, the entire row should be limited to one line, and the description should be truncated with an ellipsis if it overflows.
    In mobile mode, the icon and title should be in one line, and the description should be in another line below. Both lines should be truncated with an ellipsis if they overflow.
- `hardware` sections may have the following layouts:
  - `masonry`: A masonry grid of entry cards.
    If the entry has a photo, use the photo to fit the entire placeholder slot.
    If the entry has an logo, add a padding around the logo within the placeholder slot.
    If the entry has an icon, add a larger padding around the icon within the placeholder slot, assume the placeholder slot has a fixed aspect ratio of 1:1.
    If the entry has none of the above, use the icon of the section as its own icon.
    Name of the entry should be in one line, and should truncate with an ellipsis if necessary.
  - `list`:
    The placeholder shall represent the logo / icon of the entry, photo property is ignored here. The logo/icon shall have a fixed height of 1em.
    If the entry has neither a logo nor an icon, use the icon of the section as its own icon.
    Description in the card should be the first paragraph of the defined description.
    In desktop mode, the entire row should be limited to one line, and the description should be truncated with an ellipsis if it overflows.
    In mobile mode, the icon and title should be in one line, and the description should be in another line below. Both lines should be truncated with an ellipsis if they overflow.

At the end of each section, there should be a "View more" button that toggles whether to show hidden entries. The website should ensure hidden entries come after the visible entries when expanded.

When an entry is clicked, it should expand to show more details. On desktop, it should be shown in a dialog. On mobile, it should be shown in a bottom sheet.

In the design, there are two details layout: `default` and `landscape`. `landscape` is for when there is a photo defined and it has a landscape aspect ratio (width > height), `default` is for all other cases. When there is no `logo`, `icon`, or `photo`, none of such should be displayed in the details view. In default views, the image/logo/icon placeholder shall have a max width which differs in desktop and mobile layouts.

The content of the details view may be long. User should be able to scroll through the content if it overflows.

The app should eventually compile into a static site.

You should begin with a build plan first.
