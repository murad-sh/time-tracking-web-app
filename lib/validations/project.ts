import { z } from 'zod';

export const projectSchema = z.object({
  projectTitle: z.string().trim().min(1, 'Title is required').max(128),
});

export type ProjectSchemaType = z.infer<typeof projectSchema>;
