import express from "express";
import { createPostController, getPostsController } from "./post.controller.js";
import { zodValidateMiddleware } from "@/middlewares/zodValidateMiddleware.js";
import { CreatePostSchema, PostsQuerySchema } from "./post.validation.js";

const router = express.Router();

router.post(
  "/",
  zodValidateMiddleware({ body: CreatePostSchema }),
  createPostController,
);

router.get(
  "/",
  zodValidateMiddleware({ query: PostsQuerySchema }),
  getPostsController,
);

export default router;
