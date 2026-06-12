import { envSchema } from "../config/env.js";
import { treeifyError } from "zod";
import * as Sentry from "@sentry/node";

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success || !parsedEnv.data) {
  console.error(
    "❌ Invalid environment variables:",
    treeifyError(parsedEnv.error),
  );

  Sentry.captureException(
    `❌ Invalid environment variables: ${JSON.stringify(treeifyError(parsedEnv.error))}`,
  );

  process.exit(1);
}

const environment = parsedEnv.data;

export default environment;
