import { CACHE_KEYS } from "@/cache/cache.keys.js";
import {
  createUserDB,
  getUserByIdDB,
  getUserByIDsDB,
  getUsersByPageDB,
} from "./user.db.js";
import {
  getCache,
  getManyCache,
  setCache,
  setManyCache,
} from "@/cache/redis.helpers.js";
import type { User } from "@prisma/client";

export const createNewUser = async (body: { name: string; email: string }) => {
  const newUser = await createUserDB(body);

  const cacheKey = CACHE_KEYS.USER(newUser.id);

  void setCache(cacheKey, newUser);

  return newUser;
};

export const getUserById = async (id: string) => {
  const cacheKey = CACHE_KEYS.USER(id);

  const get = await getCache<User>(cacheKey);

  if (get) return get;

  const user = await getUserByIdDB(id);

  if (user) {
    void setCache(cacheKey, user);
  }

  return user;
};

export const getUserByPage = async (page = 1) => {
  const take = 5;

  const pageKey = `${CACHE_KEYS.USER_Prefix}:Page:${page}`;

  const getIdList = await getCache<string[]>(pageKey);

  if (getIdList) {
    const keyList = getIdList.map((id) => CACHE_KEYS.USER(id));

    const users = await getManyCache<User>(keyList);

    const presentUsers: User[] = [];
    const missingUserIDs: string[] = [];

    users.forEach((u, i) => {
      if (!u) {
        missingUserIDs.push(getIdList[i]);
        return;
      }
      presentUsers.push(u);
    });

    let missedUsers: User[] = [];

    if (missingUserIDs.length > 0) {
      const missedUsersDB = await getUserByIDsDB(missingUserIDs);

      void setManyCache(CACHE_KEYS.USER_Prefix, missedUsersDB);

      missedUsers = missedUsersDB;
    }

    return [...presentUsers, ...missedUsers];
  }

  const users = await getUsersByPageDB(page, take);

  if (users.length > 0) {
    void setCache(
      pageKey,
      users.map((u) => u.id),
    );

    void setManyCache(CACHE_KEYS.USER_Prefix, users);
  }

  return users;
};
