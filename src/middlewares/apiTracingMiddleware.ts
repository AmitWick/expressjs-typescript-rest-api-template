import { httpDuration, httpRequestsTotal } from "@/config/prometheus.js";
import { NextFunction, Request, Response } from "express";

const apiTracingMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    const end = httpDuration.startTimer();

    res.on("finish", () => {
      const route = req.baseUrl + (req.route?.path ?? "");

      httpRequestsTotal.inc({
        method: req.method,
        route,
        status: String(res.statusCode),
      });

      end({
        method: req.method,
        route,
        status: String(res.statusCode),
      });
    });

    next();
  };

export default apiTracingMiddleware;
