import fastify from "fastify";

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

app.get("/", async () => {
  return {
    status: "ok",
    message: "Server is running",
  };
});
