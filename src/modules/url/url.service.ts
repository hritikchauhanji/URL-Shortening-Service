import { PrismaClient } from "@prisma/client";
import {
  checkShortCodeSchema,
  CheckShortCodeType,
  createShortUrlSchema,
  CreateShortUrlType,
} from "./url.schema.js";
import AppError from "../../utils/appError.js";
import { env } from "../../config/env.config.js";

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
  body: CreateShortUrlType,
) => {
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
      originalUrl: body.originalUrl,
      shortCode,
    },
    select: {
      shortCode: true,
    },
  });

  return {
    shortUrl: `http://localhost:${env.port}/api/${shortCode}`,
    code: createdShortUrl.shortCode,
  };
};

export const redirectShortUrlService = async (
  prisma: PrismaClient,
  params: CheckShortCodeType,
) => {
  const url = await prisma.url.findUnique({
    where: {
      shortCode: params.code,
    },
    select: {
      id: true,
    },
  });

  if (!url) {
    throw new AppError("Short URL not found", 404);
  }

  const response = await prisma.url.update({
    where: { id: url.id },
    data: {
      clicks: {
        increment: 1,
      },
    },
    select: {
      originalUrl: true,
    },
  });

  return response.originalUrl;
};

export const getUrlAnalyticsService = async (
  prisma: PrismaClient,
  params: CheckShortCodeType,
) => {
  const analytics = await prisma.url.findUnique({
    where: {
      shortCode: params.code,
    },
    select: {
      originalUrl: true,
      shortCode: true,
      clicks: true,
      createdAt: true,
    },
  });

  if (!analytics) {
    throw new AppError("Short Url not found", 404);
  }

  return analytics;
};
