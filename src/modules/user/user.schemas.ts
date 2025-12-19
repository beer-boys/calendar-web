import * as z from 'zod';

export const UserSchema = z.object({
  email: z.email(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  middleName: z.string().nonempty(),
  roles: z.array(z.string()),
});
