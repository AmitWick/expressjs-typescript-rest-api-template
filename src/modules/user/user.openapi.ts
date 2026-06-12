import { registry } from "@/openapi/openapi.js";
import {
  CreateUserBodySchema,
  UserIdParamsSchema,
  UserQuerySchema,
} from "./user.validation.js";

registry.registerPath({
  method: "get",
  path: "/api/v1/users",
  tags: ["Users"],
  request: {
    query: UserQuerySchema,
  },
  responses: {
    200: {
      description: "Users fetched successfully",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/v1/users/{id}",
  tags: ["Users"],
  request: {
    params: UserIdParamsSchema,
  },
  responses: {
    200: {
      description: "UserByID fetched successfully",
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/v1/users",
  tags: ["Users"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateUserBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "User created",
    },
  },
});
