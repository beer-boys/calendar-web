import * as z from 'zod';

export const UserSchema = z.object({
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
  roles: z.array(z.string()),
});
