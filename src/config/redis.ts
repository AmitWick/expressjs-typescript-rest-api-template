import environment from "@/utils/environment.js";
import Redis from "ioredis";

const redisClient = new Redis.default(environment.REDIS_URL);

redisClient.on("connect", () => {
  console.log("Redis is connected.");
});

redisClient.on("error", () => {
  console.log("Error in Redis connection");
});

export default redisClient;
