import fs from 'fs';
import path from 'path';
import logger from '../config/logger.config';

/**
 * Setup log directories
 * Creates the logs directory if it doesn't exist
 */
export const setupLogDirectories = (): void => {
  const logDir = path.join(process.cwd(), 'logs');

  try {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
      logger.info('Logs Directory Created Successfully');
    }
  } catch (error) {
    console.error('Error creating logs directory:', error);
    process.exit(1);
  }
};
