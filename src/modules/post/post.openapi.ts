import { registry } from "@/openapi/openapi.js";
import { CreatePostSchema, PostsQuerySchema } from "./post.validation.js";

registry.registerPath({
  method: "get",
  path: "/api/v1/posts",
  tags: ["Posts"],
  request: {
    query: PostsQuerySchema,
  },
  responses: {
    200: {
      description: "Users fetched successfully",
    },
  },
});

// registry.registerPath({
//   method: "get",
//   path: "/api/v1/users/{id}",
//   tags: ["Users"],
//   request: {
//     params: UserIdParamsSchema,
//   },
//   responses: {
//     200: {
//       description: "UserByID fetched successfully",
//     },
//   },
// });

registry.registerPath({
  method: "post",
  path: "/api/v1/posts",
  tags: ["Posts"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreatePostSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Post created",
    },
  },
});
