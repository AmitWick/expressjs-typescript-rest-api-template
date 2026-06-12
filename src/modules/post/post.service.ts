import { createPostDB, postsByPageDB } from "./post.db.js";
import { CreatePostTypeExtendedUserId } from "./post.types.js";

export const createPost = async (body: CreatePostTypeExtendedUserId) => {
  const post = await createPostDB(body);

  return post;
};

export const getPostsByPage = async (page: number) => {
  const take = 5;

  const posts = await postsByPageDB(page, take);

  return posts;
};
