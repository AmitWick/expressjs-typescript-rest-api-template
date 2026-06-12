import dotenv from "dotenv";
dotenv.config();
import "@/config/sentry.js";
import environment from "./utils/environment.js";
import { app } from "./app.js";
import prisma from "./config/prisma.js";
import * as Sentry from "@sentry/node";

const PORT = environment.PORT;

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

// process.on("SIGINT", async () => {
//   await prisma.$disconnect();

//   console.log("Prisma disconnected");
//   process.exit(0);
// });

app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
