/**
 * Production environment configuration
 * This file contains production-specific settings
 */

export const productionConfig = {
  // Server settings
  server: {
    shutdownTimeout: 10000, // 10 seconds
    requestTimeout: 30000, // 30 seconds
    keepAliveTimeout: 65000, // 65 seconds (must be > requestTimeout)
  },

  // CORS settings
  cors: {
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },

  // Rate limiting (optional - add express-rate-limit if needed)
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },

  // Body parser limits
  bodyParser: {
    jsonLimit: '10mb',
    urlencodedLimit: '10mb',
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    maxFiles: 14, // Keep 14 days of logs
  },

  // Health check
  healthCheck: {
    interval: 30000, // 30 seconds
  },
};
