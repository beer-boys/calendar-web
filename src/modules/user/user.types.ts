import * as z from 'zod';

import { CredentionalsSchema, UserInfoSchema, UserSchema } from './user.schemas';

export type User = z.infer<typeof UserSchema>;

export type RegistrationData = Omit<z.infer<typeof CredentionalsSchema> & z.infer<typeof UserInfoSchema>, 'passwordRepeat'>;
