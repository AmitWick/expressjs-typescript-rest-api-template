import { z } from "zod";
import {
  CreatePostSchema,
  PostIdParamSchema,
  PostsQuerySchema,
} from "./post.validation.js";

export type CreatePostType = z.infer<typeof CreatePostSchema>;

export type CreatePostTypeExtendedUserId = CreatePostType & { userId: string };

export type PostsQueryType = z.infer<typeof PostsQuerySchema>;

export type PostIdParamType = z.infer<typeof PostIdParamSchema>;
