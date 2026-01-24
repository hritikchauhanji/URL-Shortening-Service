import { FastifyReply, FastifyRequest } from "fastify";
import {
  createShortUrlService,
  getUrlAnalyticsService,
  redirectShortUrlService,
} from "./url.service.js";
import { handleError } from "../../utils/handleError.js";

export const createShortUrlController = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { shortUrl, code } = await createShortUrlService(
      req.server.prisma,
      req.body,
    );
    return reply.code(201).send({
      shortUrl,
      code,
    });
  } catch (error) {
    handleError(reply, error);
  }
};

export const redirectShortUrlController = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const originalUrl = await redirectShortUrlService(
      req.server.prisma,
      req.params,
    );

    return reply.code(302).redirect(originalUrl);
  } catch (error) {
    handleError(reply, error);
  }
};

export const getUrlAnalyticsController = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const analytics = await getUrlAnalyticsService(
      req.server.prisma,
      req.params,
    );

    return reply.code(200).send(analytics);
  } catch (error) {
    handleError(reply, error);
  }
};
