const z = require('zod');

const timeTrackSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  start: z.coerce.date(),
  end: z.coerce.date(),
});

const isValid = timeTrackSchema.safeParse({
  title: '1     ',
  start: '2023-10-18T09:48:22.546Z',
  end: '2023-10-18T09:48:24.520Z',
});

if (!isValid.success) {
  console.log('Invalid ' + isValid.error.message);
} else {
  console.log('Valid ' + isValid.data.title + isValid.data.start);
}
