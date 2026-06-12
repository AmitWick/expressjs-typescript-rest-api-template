import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(3),
  comment: z.string().min(3),
});

export const PostsQuerySchema = z.object({
  page: z.coerce.number().min(1),
});

export const PostIdParamSchema = z.object({
  id: z.string().min(1),
});
