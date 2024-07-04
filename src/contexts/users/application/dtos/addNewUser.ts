import { z } from 'zod';

export const NewUser = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type NewUserSchema = z.infer<typeof NewUser>;
