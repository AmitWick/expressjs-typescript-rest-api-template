import prisma from "@/config/prisma.js";
import { CreatePostTypeExtendedUserId } from "./post.types.js";

export const createPostDB = (body: CreatePostTypeExtendedUserId) => {
  return prisma.post.create({
    data: {
      title: body.title,
      comment: body.comment,
      userId: body.userId,
    },
  });
};

export const postsByPageDB = (page = 1, take = 3) => {
  return prisma.post.findMany({
    skip: (page - 1) * take,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });
};
