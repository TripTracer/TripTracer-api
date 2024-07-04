import { z } from 'zod';

export const userType = z.object({
  userId: z.string(),
  username: z.string().min(1),
  password: z.string().min(1),
  roles: z.string().optional(),
});

export type userSchema = z.infer<typeof userType>;
