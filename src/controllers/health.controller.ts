import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import logger from '../config/logger.config';

/**
 * Health check endpoint
 * Checks database connectivity and returns system status
 */
export const healthCheck = async (req: Request, res: Response) => {
  const startTime = Date.now();

  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;

    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'connected',
      responseTime: `${Date.now() - startTime}ms`,
      environment: process.env.NODE_ENV || 'development',
    };

    res.status(200).json(healthStatus);
  } catch (error) {
    logger.error('Health check failed:', error);

    const healthStatus = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'disconnected',
      responseTime: `${Date.now() - startTime}ms`,
      error: error instanceof Error ? error.message : 'Unknown error',
    };

    res.status(503).json(healthStatus);
  }
};

/**
 * Readiness probe - checks if app is ready to serve traffic
 */
export const readinessCheck = async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not ready' });
  }
};

/**
 * Liveness probe - checks if app is alive
 */
export const livenessCheck = (req: Request, res: Response) => {
  res.status(200).json({ status: 'alive' });
};
