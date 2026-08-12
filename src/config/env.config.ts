import "dotenv/config";

const requiredEnvs = ["NODE_ENV", "DATABASE_URL", "BASE_URL", "PORT", "FRONTEND_URL"];

requiredEnvs.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required env variable: ${key}`);
  }
});

const port = Number(process.env.PORT) || 3000;

export const env = {
  port,
  nodeEnv: process.env.NODE_ENV!,
  databaseUrl: process.env.DATABASE_URL!,
  baseUrl: process.env.BASE_URL!,
  frontendUrl: process.env.FRONTEND_URL!,
};
