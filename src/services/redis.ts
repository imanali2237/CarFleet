import { Redis } from 'ioredis';
import logger from '../config/logger.config';

let redisClient: Redis | null = null;

export const initializeRedis = async () => {
  try {
    redisClient = new Redis({
      host: 'localhost',
      port: 6379,
    });
    redisClient.on('connect', () => {
      logger.info('Redis Connected Successfully');
    });
    redisClient.on('error', (err) => {
      logger.error('Redis Client Error:', err);
    });
  } catch (error) {
    logger.error('Error while connecting to redis', error);
  }
};

export const getRedisClient = async () => {
  if (!redisClient) {
    throw new Error('Redis Client not Initiallized yet');
  }
  return redisClient;
};

export const closeRedis = async () => {
  if (redisClient) {
    await redisClient.quit();
    logger.info('Redis connection closed');
  }
};
