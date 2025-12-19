import * as z from 'zod';

export const ContactSchema = z.object({
  email: z.email(),
  name: z.string().nonempty(),
});
