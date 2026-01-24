import { randomUUID } from 'crypto';

/**
 * Generate a unique request ID
 * Uses Node.js built-in crypto module instead of uuid package
 * to avoid ESM/CommonJS compatibility issues
 */
export const generateRequestId = (): string => {
  return randomUUID();
};
