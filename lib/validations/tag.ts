import { z } from 'zod';

export const tagSchema = z.object({
  tagName: z.string().trim().min(1, 'Title is required'),
});

export type TagSchemaType = z.infer<typeof tagSchema>;
