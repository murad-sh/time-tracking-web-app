import { z } from 'zod';
import { objectIdValidation } from './helpers';

export const timeTrackSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(128),
  start: z.coerce.date(),
  end: z.coerce.date(),
  projectId: objectIdValidation.optional(),
  tag: z.string().optional(),
});

export const timeTrackUpdateSchema = z.object({
  newTitle: z.string().trim().min(1, 'Title is required').max(128),
});

export type TimeTrackSchemaType = z.infer<typeof timeTrackSchema>;
export type TimeTrackUpdateType = z.infer<typeof timeTrackUpdateSchema>;
