import type { Express } from "express";
import { generateOpenApiDocument } from "@/openapi/openapi.js";
import { apiReference } from "@scalar/express-api-reference";
import "@/openapi/index.js";

const apiPlaygroundMiddleware = (app: Express) => {
  app.get("/openapi.json", (req, res) => {
    res.json(generateOpenApiDocument());
  });

  app.use(
    "/docs",
    apiReference({
      url: "/openapi.json",
    }),
  );
};

export default apiPlaygroundMiddleware;
