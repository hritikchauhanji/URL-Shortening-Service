import { FastifyReply, FastifyRequest } from "fastify";
import { createShortUrlService } from "./url.service.js";
import { handleError } from "../../utils/handleError.js";
import { coerce } from "zod";

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
