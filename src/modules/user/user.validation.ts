import { z } from "zod";

export const CreateUserBodySchema = z.object({
  name: z.string().min(3),
  email: z.email(),
});

export const UserIdParamsSchema = z.object({
  id: z.string().min(3),
});

export const UserQuerySchema = z.object({
  page: z.coerce.number().min(1),
});
