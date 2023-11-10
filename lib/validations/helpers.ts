import { z } from 'zod';
import mongoose from 'mongoose';

export const objectIdValidation = z
  .string()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: 'Invalid MongoDB ObjectId',
  });
