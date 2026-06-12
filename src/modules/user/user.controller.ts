import type { Request, Response } from "express";
import { CreateUserBody, UserParams, UserQuery } from "./user.types.js";
import { createNewUser, getUserById, getUserByPage } from "./user.service.js";
import { User } from "@prisma/client";

export const getUsersController = async (
  req: Request,
  res: Response<User[]>,
) => {
  const { page } = req.validated.query as UserQuery;

  const users = await getUserByPage(page);

  res.json(users);
};

export const getUserByIdController = async (
  req: Request,
  res: Response<User | null>,
) => {
  const { id } = req.validated.params as UserParams;

  const user = await getUserById(id);

  res.json(user);
};

export const createNewUserController = async (
  req: Request,
  res: Response<User>,
) => {
  const body = req.validated.body as CreateUserBody;

  const user = await createNewUser(body);

  res.json(user);
};
