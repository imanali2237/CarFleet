import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  DATABASE_URL: string;
  LOG_LEVEL: string;
  API_KEY?: string;
  // Add more env variables as needed
}

/**
 * Validate and parse environment variables
 */
function validateEnv(): EnvConfig {
  const errors: string[] = [];

  // Required variables
  if (!process.env.DATABASE_URL) {
    errors.push('DATABASE_URL is required');
  }

  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.map((e) => `- ${e}`).join('\n')}`);
  }

  return {
    NODE_ENV: (process.env.NODE_ENV as any) || 'development',
    PORT: parseInt(process.env.PORT || '3000', 10),
    DATABASE_URL: process.env.DATABASE_URL!,
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    API_KEY: process.env.API_KEY,
  };
}

// Export validated config
export const env = validateEnv();

// Export helper functions
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';
