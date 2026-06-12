import dotenv from "dotenv";
dotenv.config();
import "@/config/sentry.js";
import environment from "./utils/environment.js";
import { app } from "./app.js";
import "@/config/process.js";
import logger from "./config/pino.js";

const PORT = environment.PORT;

// process.on("SIGINT", async () => {
//   await prisma.$disconnect();

//   console.log("Prisma disconnected");
//   process.exit(0);
// });

app.listen(PORT, () => {
  logger.info(
    {
      port: PORT,
    },
    "Server started",
  );

  console.log(`Server is started on port ${PORT}`);
});
