import express from "express";
import globalMiddlewares from "./middlewares/globalMiddlewares.js";
import globalErrorMiddleware from "./middlewares/globalErrorMiddleware.js";
import apiRouter from "./routes/index.js";
import register from "./config/prometheus.js";
import apiTracingMiddleware from "./middlewares/apiTracingMiddleware.js";
import apiPlaygroundMiddleware from "./middlewares/apiPlaygroundMiddleware.js";

const app = express();

globalMiddlewares(app);
app.use(apiTracingMiddleware());
apiPlaygroundMiddleware(app);

app.get("/", (req, res) => {
  res.send("Home Page");
});

// Health Check Routes
app.get("/health", (req, res) => {
  req.log.info("Everything fine");
  res.json({ status: "ok" });
});

// Prometheus Metrics
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.get("/error", function mainHandler(req, res) {
  throw new Error("My new first Sentry error!");
});

// All Major Routes
app.use("/api/v1", apiRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

app.use(globalErrorMiddleware);

export { app };
