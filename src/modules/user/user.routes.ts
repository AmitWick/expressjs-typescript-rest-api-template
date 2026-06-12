import express from "express";
import {
  createNewUserController,
  getUsersController,
  getUserByIdController,
} from "./user.controller.js";
import {
  CreateUserBodySchema,
  UserIdParamsSchema,
  UserQuerySchema,
} from "./user.validation.js";
import { zodValidateMiddleware } from "@/middlewares/zodValidateMiddleware.js";
import rateLimitMiddleware from "@/middlewares/rateLimitMiddleware.js";

const router = express.Router();

router.get(
  "/",
  zodValidateMiddleware({ query: UserQuerySchema }),
  getUsersController,
);

router.post(
  "/",
  rateLimitMiddleware({ type: "ROUTE" }),
  zodValidateMiddleware({ body: CreateUserBodySchema }),
  createNewUserController,
);

router.get(
  "/:id",
  zodValidateMiddleware({ params: UserIdParamsSchema }),
  getUserByIdController,
);

export default router;
