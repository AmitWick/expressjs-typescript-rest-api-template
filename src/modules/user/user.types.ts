import {
  CreateUserBodySchema,
  UserIdParamsSchema,
  UserQuerySchema,
} from "./user.validation.js";
import { z } from "zod";

export type CreateUserBody = z.infer<typeof CreateUserBodySchema>;

export type UserParams = z.infer<typeof UserIdParamsSchema>;

export type UserQuery = z.infer<typeof UserQuerySchema>;
