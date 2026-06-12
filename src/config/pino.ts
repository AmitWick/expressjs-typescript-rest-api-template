import environment from "@/utils/environment.js";
import pino from "pino";
import type { LokiOptions } from "pino-loki";

const transport = pino.transport<LokiOptions>({
  target: "pino-loki",
  options: {
    host: environment.LOKI_HOST,
    basicAuth: {
      username: environment.LOKI_USERNAME,
      password: environment.LOKI_PASSWORD,
    },
  },
});

const logger = pino(
  {},
  pino.multistream([{ stream: process.stdout }, { stream: transport }]),
);

export default logger;
