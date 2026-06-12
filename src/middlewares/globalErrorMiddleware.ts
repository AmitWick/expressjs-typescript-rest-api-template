import type { Request, Response, NextFunction } from "express";
import * as Sentry from "@sentry/node";

const globalErrorMiddleware = (
  err: Error & { type?: string; code?: string },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.log?.error(err);

  Sentry.withScope((scope) => {
    scope.setTag("route", req.originalUrl);

    scope.setExtra("method", req.method);
    scope.setExtra("query", req.query);
    scope.setExtra("params", req.params);

    Sentry.captureException(err);
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
    res.status(500).json({
      message: "Check your input field either params, body or query is wrong.",
    });
  }

  if (err.code === "P1001") {
    res.status(500).json({
      message: "There is a Prisma Error. Please try again later",
    });
  }

  if (err.code === "P2002") {
    res.status(500).json({
      message: "Check your input carefully. Field must be unique",
    });
  }

  res.status(500).json(err);
};

export default globalErrorMiddleware;
