import redisClient from "@/config/redis.js";
import { randomUUID } from "crypto";

export type SlidingWindowOptions = {
  key: string;
  limit: number;
  duration: number; // seconds
};

export const makeSlidingWindow = (
  key: string,
  limit = 100,
  duration = 60,
): SlidingWindowOptions => ({
  key,
  duration,
  limit,
});

const LUA_SCRIPT = `
local key = KEYS[1]

local now = tonumber(ARGV[1])
local windowStart = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
local duration = tonumber(ARGV[4])
local requestId = ARGV[5]

redis.call("ZREMRANGEBYSCORE", key, 0, windowStart)

local count = redis.call("ZCARD", key)

if count >= limit then
    return 0
end

redis.call("ZADD", key, now, requestId)
redis.call("EXPIRE", key, duration)

return count + 1
`;

const slidingWindow = async ({
  key,
  limit = 100,
  duration = 60,
}: SlidingWindowOptions): Promise<void> => {
  const now = Date.now();

  const windowStart = now - duration * 1000;

  const redisKey = `sw:${key}`;

  // unique request id
  const requestId = `${now}:${randomUUID()}`;

  const result = await redisClient.eval(
    LUA_SCRIPT,
    1,
    redisKey,
    now,
    windowStart,
    limit,
    duration,
    requestId,
  );

  if (result === 0) {
    throw new Error("Rate limit exceeded");
  }

  // const pipeline = redisClient.multi();

  // //     remove timestamps older than window
  // // await redisClient.zremrangebyscore(redisKey, 0, windowStart);
  // pipeline.zremrangebyscore(redisKey, 0, windowStart);

  // //   count current requests
  // // const requestCount = await redisClient.zcard(redisKey);
  // pipeline.zcard(redisKey);

  // const results = await pipeline.exec();

  // const requestCount = results?.[1]?.[1] as number;

  // if (requestCount >= limit) {
  //   throw new Error("Rate limit exceeded");
  // }

  // const newPipeline = redisClient.multi();

  // //   Add current request
  // newPipeline.zadd(redisKey, now, requestId);

  // //   set expiration
  // newPipeline.expire(redisKey, duration);

  // await newPipeline.exec();
};

export default slidingWindow;
