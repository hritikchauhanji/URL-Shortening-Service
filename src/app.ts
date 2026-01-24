import fastify from "fastify";

const app = fastify({
  logger: true,
});

app.get("/", async () => {
  return {
    status: "ok",
    message: "Server is running",
  };
});

export { app };
