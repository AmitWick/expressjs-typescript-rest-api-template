import * as Sentry from "@sentry/node";
import environment from "@/utils/environment.js";

Sentry.init({
  dsn: environment.SENTRY_DSN,

  // environment: process.env.NODE_ENV,

  // enabled: environment.NODE_ENV === "production",
  sendDefaultPii: true,
});
