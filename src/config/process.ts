import prisma from "./prisma.js";
import * as Sentry from "@sentry/node";

process.on("SIGTERM", async () => {
  await prisma.$disconnect();

  console.log("Prisma disconnected");
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  Sentry.captureException(err);

  console.error(err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  Sentry.captureException(reason);

  console.error(reason);
});

process.on("SIGTERM", async () => {
  await Sentry.close(2000);

  process.exit(0);
});
