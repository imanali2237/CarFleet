import express, { Application, Request, Response, NextFunction } from 'express';
import { requestLogger } from './middlewares/requestLogger';
import { responseLogger, errorLogger } from './middlewares/responseLogger';
import { setupLogDirectories } from './utils/setupLogs';
import logger from './config/logger.config';

// Create Express app
const app: Application = express();

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
// YOUR ROUTES GO HERE
// ===================================

app.get('/', (req: Request, res:  Response) => {
  res.json({ message: 'Hello World!' });
});

app.post('/api/users', (req: Request, res: Response) => {
  logger.info('Creating new user', { body: req.body });
  res.status(201).json({ 
    id: 1, 
    username: req.body.username,
    message: 'User created successfully' 
  });
});

app.get('/api/error', (req: Request, res: Response) => {
  throw new Error('Test error for logging');
});

// 404 handler
app.use((req: Request, res: Response) => {
  logger.warn('Route not found', {
    method: req.method,
    url: req.originalUrl,
    ip: req.socket.remoteAddress,
  });
  
  res.status(404).json({ 
    error: 'Not Found',
    path: req.originalUrl 
  });
});

// ✅ GLOBAL ERROR LOGGING MIDDLEWARE
app.use(errorLogger);

// Final error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`🚗 CarFleet Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🚗 CarFleet Logging Server running on http://localhost:${PORT}`);
  console.log(`📊 Logs directory: ${process.cwd()}/logs`);
});

export default app;