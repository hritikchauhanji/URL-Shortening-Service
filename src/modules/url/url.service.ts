import { PrismaClient } from "@prisma/client";
import { createShortUrlSchema } from "./url.schema.js";
import AppError from "../../utils/appError.js";
import { env } from "../../config/env.js";

const generateCode = (length: number = 6): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += characters[Math.floor(Math.random() * characters.length)];
  }
  return code;
};

export const createShortUrlService = async (
  prisma: PrismaClient,
  body: unknown,
) => {
  const { originalUrl } = createShortUrlSchema.parse(body);

  let shortCode = "";
  const attemps = 5;

  for (let i = 0; i < attemps; i++) {
    const code = generateCode();

    const exists = await prisma.url.findUnique({
      where: { shortCode: code },
      select: { id: true },
    });

    if (!exists) {
      shortCode = code;
      break;
    }
  }

  if (!shortCode) {
    throw new AppError("Not Generate the ShortCode", 500);
  }

  const createdShortUrl = await prisma.url.create({
    data: {
      originalUrl,
      shortCode,
    },
    select: {
      shortCode: true,
    },
  });

  return {
    shortUrl: `http://localhost:${env.port}/${shortCode}`,
    code: createdShortUrl.shortCode,
  };
};
