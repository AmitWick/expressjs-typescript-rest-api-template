import client from "prom-client";

const register = new client.Registry();

export const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",

  labelNames: ["method", "route", "status"],
});

export const httpDuration = new client.Histogram({
  name: "http_request_duration_seconds",

  help: "Request duration",

  labelNames: ["method", "route", "status"],

  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
});

export const errorsTotal = new client.Counter({
  name: "http_errors_total",
  help: "Total errors",

  labelNames: ["route", "status"],
});

client.collectDefaultMetrics({
  register,
});

register.registerMetric(httpRequestsTotal);
register.registerMetric(httpDuration);
register.registerMetric(errorsTotal);

export default register;
