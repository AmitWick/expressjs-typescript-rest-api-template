import * as Sentry from "@sentry/node";
import environment from "@/utils/environment.js";

Sentry.init({
  dsn: "https://7de016bf623d3fe6b42b0ac26fbd8d1c@o4511547153252352.ingest.de.sentry.io/4511547158888528",

  // environment: process.env.NODE_ENV,

  enabled: environment.NODE_ENV === "production",
});
