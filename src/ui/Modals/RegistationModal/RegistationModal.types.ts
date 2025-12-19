import * as z from 'zod';

import type { CredentionalsSchema } from '@/ui/Modals/RegistationModal/Credentials/Credentials.schema';
import type { UserInfoSchema } from '@/ui/Modals/RegistationModal/UserInfo/UserInfo.schema';

export type RegistrationData = Omit<z.infer<typeof CredentionalsSchema> & z.infer<typeof UserInfoSchema>, 'passwordRepeat'>;
