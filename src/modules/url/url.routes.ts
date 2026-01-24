import { FastifyInstance } from "fastify";
import {
  createShortUrlController,
  redirectShortUrlController,
  getUrlAnalyticsController,
} from "./url.controller.js";

export default async function urlRoutes(fastify: FastifyInstance) {
  fastify.post("/api/shorten", createShortUrlController);
  fastify.get("/:code", redirectShortUrlController);
  fastify.get("/api/analytics/:code", getUrlAnalyticsController);
}
