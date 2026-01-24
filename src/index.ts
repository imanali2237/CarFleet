import express, { Application, Request, Response } from 'express';
import { Server } from 'http';
import { requestLogger } from './middlewares/requestLogger';
import { responseLogger, errorLogger } from './middlewares/responseLogger';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import { setupLogDirectories } from './utils/setupLogs';
import logger from './config/logger.config';
import { env } from './config/env.config';
import healthRoutes from './routes/health.routes';
import { initializeRedis, closeRedis } from './services/redis';

// Create Express app
const app: Application = express();
let server: Server | null = null;

// Setup log directories
setupLogDirectories();

// Body parsers - MUST be before logging middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ GLOBAL REQUEST LOGGING MIDDLEWARE (Morgan)
app.use(requestLogger);

// ✅ GLOBAL RESPONSE LOGGING MIDDLEWARE
app.use(responseLogger);

// ===================================
// ROUTES
// ===================================

// Health check routes (no auth required)
app.use('/health', healthRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'CarFleet API',
    version: '1.0.0',
    environment: env.NODE_ENV,
  });
});

app.post('/api/users', (req: Request, res: Response) => {
  logger.info('Creating new user', { body: req.body });
  res.status(201).json({
    id: 1,
    username: req.body.username,
    message: 'User created successfully',
  });
});

// ===================================
// ERROR HANDLING
// ===================================

// 404 handler
app.use(notFoundHandler);

// ✅ GLOBAL ERROR LOGGING MIDDLEWARE
app.use(errorLogger);

// Global error handler
app.use(errorHandler);

// ===================================
// SERVER STARTUP
// ===================================
const startServer = async () => {
  try {
    // Initialize Redis
    await initializeRedis();

    server = app.listen(env.PORT, () => {
      logger.info(`🚗 CarFleet Server running on port ${env.PORT}`);
      logger.info(`Environment: ${env.NODE_ENV}`);
      logger.info(`Health check: http://localhost:${env.PORT}/health`);
      console.log(`🚗 CarFleet Server running on http://localhost:${env.PORT}`);
      console.log(`📊 Logs directory: ${process.cwd()}/logs`);
      console.log(`💚 Health check: http://localhost:${env.PORT}/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  logger.info(`${signal} received, closing HTTP server gracefully...`);

  // Close Redis connection
  await closeRedis();

  if (server) {
    server.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });

    // Force close after 10 seconds
    setTimeout(() => {
      logger.error('Forcing shutdown after timeout');
      process.exit(1);
    }, 10000);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

startServer();

export default app;