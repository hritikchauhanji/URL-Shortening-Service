import "dotenv/config";

const requiredEnvs = ["PORT", "NODE_ENV", "DATABASE_URL"];

requiredEnvs.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required env variable: ${key}`);
  }
});

export const env = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV!,
  databaseUrl: process.env.DATABASE_URL!,
};
