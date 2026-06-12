import type { Request, Response, NextFunction } from "express";
import * as Sentry from "@sentry/node";
import logger from "@/config/pino.js";
import { errorsTotal } from "@/config/prometheus.js";

const globalErrorMiddleware = (
  err: Error & { type?: string; code?: string },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(err);

  let statusCode = 500;
  let errMsg = "Internal Server Error";

  errorsTotal.inc({
    route: req.baseUrl + (req.route?.path ?? ""),
    status: String(statusCode),
  });

  // Sentry.captureException(err, {
  //   extra: {
  //     method: req.method,
  //     url: req.originalUrl,
  //     params: req.params,
  //     query: req.query,
  //   },
  // });

  if (err.name === "ZOD_ERROR") {
    errMsg = "Check your input field either params, body or query is wrong.";
  }

  if (err.code === "P1000") {
    errMsg = "There is a Prisma Connection Error. Please check DATABASE_URL";
  }
  if (err.code === "P1001") {
    errMsg = "There is a Prisma Error. Please try again later";
  }

  if (err.code === "P2002") {
    errMsg = "Check your input carefully. Field must be unique";
  }

  Sentry.withScope((scope) => {
    scope.setTag("route", req.originalUrl);

    scope.addBreadcrumb({ message: errMsg, level: "info" });
    scope.setExtra("message", errMsg);
    scope.setExtra("method", req.method);
    scope.setExtra("query", req.query);
    scope.setExtra("params", req.params);

    Sentry.captureException(err);
  });

  res.status(statusCode).json({ message: errMsg, err });
};

export default globalErrorMiddleware;
