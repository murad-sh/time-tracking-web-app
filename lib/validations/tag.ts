import { z } from 'zod';

export const tagSchema = z.object({
  tag: z.string().trim().min(1, 'Tag name is required').max(128),
});

export type TagSchemaType = z.infer<typeof tagSchema>;
