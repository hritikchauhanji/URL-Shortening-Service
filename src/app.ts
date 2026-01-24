import fastify from "fastify";
import prismaPlugin from "./config/prisma.js";
import urlRoutes from "./modules/url/url.routes.js";

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
  logger: envToLogger.development ?? true,
});

app.register(prismaPlugin);
app.register(urlRoutes);

app.get("/", async () => {
  return {
    status: "ok",
    message: "Server is running",
  };
});
