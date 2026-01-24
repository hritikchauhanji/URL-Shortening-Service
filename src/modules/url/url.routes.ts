import { FastifyInstance } from "fastify";
import { createShortUrlController } from "./url.controller.js";

export default function async(fastify: FastifyInstance) {
  fastify.post("/api/shorten", createShortUrlController);
}
