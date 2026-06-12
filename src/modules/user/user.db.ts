import prisma from "@/config/prisma.js";

export const createUserDB = (body: { name: string; email: string }) => {
  return prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });
};

export const getUserByIdDB = (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const getUserByIDsDB = (ids: string[]) => {
  return prisma.user.findMany({
    where: {
      id: { in: ids },
    },
  });
};

export const getUsersByPageDB = (page = 1, take = 3) => {
  return prisma.user.findMany({
    skip: (page - 1) * take,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });
};
