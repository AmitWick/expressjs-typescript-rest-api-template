import express from "express";
import globalMiddlewares from "./middlewares/globalMiddlewares.js";
import globalErrorMiddleware from "./middlewares/globalErrorMiddleware.js";
import apiRouter from "./routes/index.js";
import testingMiddleware from "./middlewares/testingMiddleware.js";
import * as Sentry from "@sentry/node";

const app = express();

globalMiddlewares(app);
testingMiddleware(app);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// Health Check Routes
app.get("/health", (req, res) => {
  req.log.info("Everything fine");
  res.json({ status: "ok" });
});

// All Major Routes
app.use("/api/v1", apiRouter);

// Add this after all routes, but before any and other error-handling middlewares are defined
Sentry.setupExpressErrorHandler(app);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

app.use(globalErrorMiddleware);

export { app };
