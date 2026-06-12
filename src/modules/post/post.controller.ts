import { Request, Response } from "express";
import { CreatePostType, PostsQueryType } from "./post.types.js";
import { createPost, getPostsByPage } from "./post.service.js";
import { Post } from "@prisma/client";

export const createPostController = async (
  req: Request,
  res: Response<Post>,
) => {
  const { title, comment } = req.validated.body as CreatePostType;

  const post = await createPost({
    title,
    comment,
    userId: "cmq9c5c0x000dagolgp640grd",
  });

  res.json(post);
};

export const getPostsController = async (
  req: Request,
  res: Response<Post[]>,
) => {
  const { page } = req.validated.query as PostsQueryType;

  const posts = await getPostsByPage(page);

  res.json(posts);
};
