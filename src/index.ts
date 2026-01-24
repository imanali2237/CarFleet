import express, { Application, Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { requestLogger } from './middlewares/requestLogger';
import { responseLogger, errorLogger } from './middlewares/responseLogger';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import { setupLogDirectories } from './utils/setupLogs';
import { generateRequestId } from './utils/requestId';
import logger from './config/logger.config';
import { env } from './config/env.config';
import { swaggerSpec } from './config/swagger.config';
import healthRoutes from './routes/health.routes';
import { initializeRedis, closeRedis, getRedisClient } from './services/redis';

// ===================================
// INITIALIZATION
// ===================================

// Create Express app
const app: Application = express();
let server: Server | null = null;

// Setup log directories
setupLogDirectories();

logger.info('🚀 Initializing CarFleet API Server...');
logger.info(`Environment: ${env.NODE_ENV}`);

// ===================================
// SECURITY & OPTIMIZATION MIDDLEWARE
// ===================================

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') || ['https://yourdomain.com']
    : '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Response compression
app.use(compression());

// Body parsers with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request timeout
app.use((req: Request, res: Response, next: NextFunction) => {
  req.setTimeout(30000); // 30 seconds
  res.setTimeout(30000);
  next();
});

// Request ID tracking
app.use((req: Request, res: Response, next: NextFunction) => {
  (req as any).id = req.get('x-request-id') || generateRequestId();
  res.setHeader('x-request-id', (req as any).id);
  next();
});

// ===================================
// LOGGING MIDDLEWARE
// ===================================

// Request logging
app.use(requestLogger);

// Response logging
app.use(responseLogger);

// ===================================
// ROUTES
// ===================================

// Swagger documentation
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    persistAuthorization: true,
    displayOperationId: true,
  },
}));

// API documentation redirect
app.get('/api/docs', (req: Request, res: Response) => {
  res.redirect('/api-docs');
});

// Health check routes (no auth required)
app.use('/health', healthRoutes);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'CarFleet API',
    version: '1.0.0',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// API info endpoint
app.get('/api/info', (req: Request, res: Response) => {
  res.status(200).json({
    name: 'CarFleet API',
    version: '1.0.0',
    description: 'Production-ready Express.js logging system',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Users placeholder
app.post('/api/users', (req: Request, res: Response) => {
  logger.info('Creating new user', { body: req.body, requestId: (req as any).id });
  res.status(201).json({
    id: 1,
    username: req.body.username,
    message: 'User created successfully',
  });
});

// ===================================
// ERROR HANDLING MIDDLEWARE
// ===================================

// 404 handler
app.use(notFoundHandler);

// Error logging
app.use(errorLogger);

// Global error handler
app.use(errorHandler);

// ===================================
// SERVER LIFECYCLE
// ===================================

const startServer = async () => {
  try {
    logger.info('🔄 Initializing services...');

    // Initialize Redis
    await initializeRedis();
    logger.info('✓ Redis service initialized');

    // Start HTTP server
    server = app.listen(env.PORT, () => {
      logger.info(`✓ Server listening on port ${env.PORT}`);
      logger.info(`✓ API Documentation: http://localhost:${env.PORT}/api/info`);
      logger.info(`✓ Health Check: http://localhost:${env.PORT}/health`);
      logger.info('🚗 CarFleet API Server is ready!');
      logger.info('═'.repeat(50));
    });

    // Handle server errors
    server.on('error', (error: Error) => {
      logger.error('Server error:', error);
      process.exit(1);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

const gracefulShutdown = async (signal: string) => {
  logger.info(`\n${signal} signal received, initiating graceful shutdown...`);

  // Stop accepting new requests
  if (server) {
    server.close(async () => {
      logger.info('HTTP server closed');
    });
  }

  // Close Redis connection
  try {
    await closeRedis();
    logger.info('✓ Redis connection closed');
  } catch (error) {
    logger.error('Error closing Redis:', error);
  }

  // Force exit after timeout
  const shutdownTimeout = setTimeout(() => {
    logger.error('Forced shutdown - timeout reached');
    process.exit(1);
  }, 10000);

  shutdownTimeout.unref();
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: unknown) => {
  logger.error('Unhandled Rejection:', reason);
  process.exit(1);
});

// Start the server
startServer();

export default app;