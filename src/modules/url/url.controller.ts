import { FastifyReply, FastifyRequest } from "fastify";
import {
  createShortUrlService,
  getUrlAnalyticsService,
  redirectShortUrlService,
} from "./url.service.js";
import { handleError } from "../../utils/handleError.js";
import {
  checkShortCodeSchema,
  CheckShortCodeType,
  createShortUrlSchema,
  CreateShortUrlType,
} from "./url.schema.js";
import { check, success } from "zod";

export const createShortUrlController = async (
  req: FastifyRequest<{ Body: CreateShortUrlType }>,
  reply: FastifyReply,
) => {
  try {
    const parsed = createShortUrlSchema.safeParse(req.body);

    if (!parsed.success) {
      throw parsed.error;
    } else {
      const result = await createShortUrlService(
        req.server.prisma,
        parsed.data,
      );
      return reply.code(201).send({
        success: true,
        message: "Short Url is created.",
        data: {
          result,
        },
      });
    }
  } catch (error) {
    handleError(reply, error);
  }
};

export const redirectShortUrlController = async (
  req: FastifyRequest<{ Params: CheckShortCodeType }>,
  reply: FastifyReply,
) => {
  try {
    const parsed = checkShortCodeSchema.safeParse(req.params);

    if (!parsed.success) {
      throw parsed.error;
    } else {
      const originalUrl = await redirectShortUrlService(
        req.server.prisma,
        parsed.data,
      );

      return reply.redirect(originalUrl, 302);
    }
  } catch (error) {
    handleError(reply, error);
  }
};

export const getUrlAnalyticsController = async (
  req: FastifyRequest<{ Params: CheckShortCodeType }>,
  reply: FastifyReply,
) => {
  try {
    const parsed = checkShortCodeSchema.safeParse(req.params);

    if (!parsed.success) {
      throw parsed.error;
    } else {
      const analytics = await getUrlAnalyticsService(
        req.server.prisma,
        parsed.data,
      );

      return reply.code(200).send({
        success: true,
        message: "Analytics fetch Successfully",
        data: {
          analytics,
        },
      });
    }
  } catch (error) {
    handleError(reply, error);
  }
};
