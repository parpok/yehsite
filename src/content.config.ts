import { defineCollection } from 'astro:content';

import { glob, file } from 'astro/loaders';

import { z } from 'astro/zod';

const thoughts = defineCollection({
 loader: glob({ pattern: ["**/*.md", "**/*.mdx"], base: "./src/thoughts" }),
 schema: z.object({
    id: z.int(),
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string())
  }),
})


export const collections = {thoughts};