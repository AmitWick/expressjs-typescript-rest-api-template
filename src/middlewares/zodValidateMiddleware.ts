import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

type ValidationSchema = {
  body?: ZodObject;
  query?: ZodObject;
  params?: ZodObject;
};

export const zodValidateMiddleware =
  (schema: ValidationSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.validated = {
        body: schema.body?.parse(req.body),
        query: schema.query?.parse(req.query),
        params: schema.params?.parse(req.params),
      };

      next();
    } catch (error) {
      next({
        name: "ZOD_ERROR",
        err: error,
      });
    }
  };
