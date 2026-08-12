import fastify from "fastify";
import prismaPlugin from "./plugins/prisma.plugin.js";
import urlRoutes from "./modules/url/url.routes.js";
import cors from "@fastify/cors";
import { env } from "./config/env.config.js";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

export const app = fastify({
  logger: envToLogger[env.nodeEnv as keyof typeof envToLogger] ?? true,
});

app.register(cors, {
  origin: env.frontendUrl,
  credentials: true,
  methods: ["GET", "POST"],
});

app.register(prismaPlugin);
app.register(urlRoutes, { prefix: "/api" });

app.get("/", async () => {
  return {
    status: "ok",
    message: "Server is running",
  };
});
