import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";

export const registry = new OpenAPIRegistry();

export const generateOpenApiDocument = () => {
  const generator = new OpenApiGeneratorV3(
    registry.definitions,
  );

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "REST API",
      version: "1.0.0",
      description: "Express REST API",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  });
};