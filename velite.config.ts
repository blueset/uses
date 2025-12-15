import { defineConfig, s } from "velite";

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

const iconifyClassRegex = /^iconify(?:-color)?\s+[A-Za-z0-9-]+--[A-Za-z0-9-]+$/;

const layoutValues = ["grid", "list", "masonry"] as const;
const sectionTypes = ["software", "hardware"] as const;

const layoutEnum = s.enum(layoutValues);
const sectionTypeEnum = s.enum(sectionTypes);

const allowedLayoutsByType: Record<
  (typeof sectionTypes)[number],
  Array<(typeof layoutValues)[number]>
> = {
  software: ["grid", "list"],
  hardware: ["masonry", "list"],
};

const linkSchema = s
  .object({
    title: s.string().min(1),
    url: s.string().min(1),
  })
  .strict();

const metadataSchema = s
  .object({
    key: s.string().min(1),
    value: s.string().min(1),
  })
  .strict();

const entrySchema = s.preprocess(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (value: any) => {
    return {
      ...value,
      descriptionSummary: value.description?.split("\n\n")[0] ?? undefined,
      logo: value.logo ? value.logo : undefined,
      photo: value.photo ? value.photo : undefined,
    };
  },
  s
    .object({
      title: s.string().min(1),
      description: s.mdx().optional(),
      descriptionSummary: s.mdx().optional(),
      icon: s
        .string()
        .regex(iconifyClassRegex, "Icons must use the Iconify syntax.")
        .optional(),
      logo: s.image().optional(),
      photo: s.image().optional(),
      hidden: s.boolean().default(false),
      links: s.array(linkSchema).default([]),
      metadata: s.array(metadataSchema).default([]),
    })
    .strict()
);

const sectionSchema = s
  .object({
    title: s.string().min(1),
    color: s.string().min(1),
    icon: s
      .string()
      .regex(iconifyClassRegex, "Icons must use the Iconify syntax."),
    type: sectionTypeEnum,
    defaultLayout: layoutEnum,
    entries: s.array(entrySchema),
  })
  .strict()
  .superRefine((section, ctx) => {
    const allowedLayouts = allowedLayoutsByType[section.type];

    if (!allowedLayouts.includes(section.defaultLayout)) {
      ctx.addIssue({
        code: "custom",
        path: ["defaultLayout"],
        message:
          section.type === "software"
            ? "Software sections must use grid or list layouts."
            : "Hardware sections must use masonry or list layouts.",
      });
    }
  });

export default defineConfig({
  root: "src",
  collections: {
    data: {
      name: "Data", // collection type name
      pattern: "data/uses.yaml", // content files glob pattern
      single: true,
      schema: s
        .object({
          sections: s.array(sectionSchema),
        })
        .strict(),
    },
  },
});
