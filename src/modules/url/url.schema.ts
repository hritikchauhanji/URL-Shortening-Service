import { z } from "zod";

export const createShortUrlSchema = z.object({
  originalUrl: z.string().url("Invalid URL format"),
});

export const checkShortCodeSchema = z.object({
  code: z
    .string()
    .length(6, "Code must be 6 character")
    .regex(/^[A-Za-z0-9]+$/, "Invalid short code"),
});

export type CreateShortUrlType = z.infer<typeof createShortUrlSchema>;

export type CheckShortCodeType = z.infer<typeof checkShortCodeSchema>;
