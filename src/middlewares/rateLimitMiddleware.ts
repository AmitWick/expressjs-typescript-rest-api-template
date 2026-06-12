import slidingWindow from "@/config/slidingWindow.js";
import getIP from "@/utils/getIP.js";
import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

type RateLimitMiddleware = {
  type: "IP" | "USER_ID" | "ROUTE";
  limit?: number;
  duration?: number;
};

const rateLimitMiddleware =
  ({ type, limit = 100, duration = 60 }: RateLimitMiddleware) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // IP LIMIT
      if (type === "IP") {
        let ip = getIP(req);
        await slidingWindow({
          key: `ip:${ip}`,
          limit: 200,
          duration: 60,
        });
      }

      if (type === "USER_ID") {
        const user = getAuth(req);

        // USER LIMIT
        if (user.userId) {
          await slidingWindow({
            key: `userId:${user.userId}`,
            limit: 100,
            duration: 60,
          });
        }
      }

      if (type === "ROUTE") {
        const route = req.originalUrl;
        const user = getAuth(req);
        let ip = getIP(req);

        await slidingWindow({
          key: `userId:${user.userId || ip}:${route}`,
          limit,
          duration,
        });
      }

      next();
    } catch (error) {
      next({
        name: "RATE_LIMIT_EXCEED",
        err: error,
      });
    }
  };

export default rateLimitMiddleware;
