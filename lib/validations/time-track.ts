import { z } from 'zod';

export const timeTrackSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  start: z.coerce.date(),
  end: z.coerce.date(),
});

export type TimeTrackSchemaType = z.infer<typeof timeTrackSchema>;
