import morgan, { StreamOptions } from 'morgan';
import { Request, Response } from 'express';
import logger from '../config/logger.config';

// Override the stream method to use Winston
const stream: StreamOptions = {
  write: (message: string) => logger.http(message.trim()),
};

// Skip logging in test environment
const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'test';
};

// Custom Morgan tokens
morgan.token('real-ip', (req: Request) => {
  return (
    (req.headers['x-forwarded-for'] as string) ||
    (req.headers['x-real-ip'] as string) ||
    req.socket.remoteAddress ||
    'unknown'
  );
});

morgan.token('request-body', (req: any) => {
  if (req.body && Object.keys(req.body).length > 0) {
    // Mask sensitive fields
    const sanitizedBody = { ...req.body };
    const sensitiveFields = ['password', 'token', 'apiKey', 'secret', 'authorization'];
    
    sensitiveFields.forEach(field => {
      if (sanitizedBody[field]) {
        sanitizedBody[field] = '***REDACTED***';
      }
    });
    
    return JSON.stringify(sanitizedBody);
  }
  return '-';
});

morgan.token('query-params', (req: Request) => {
  if (req.query && Object.keys(req.query).length > 0) {
    return JSON.stringify(req.query);
  }
  return '-';
});

morgan.token('user-id', (req: any) => {
  return req.user?. id || req.userId || 'anonymous';
});

// Detailed format for production
const productionFormat = JSON.stringify({
  timestamp: ': date[iso]',
  ip: ':real-ip',
  method: ':method',
  url: ':url',
  status:  ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time ms',
  userAgent: ':user-agent',
  userId: ':user-id',
  requestBody: ':request-body',
  queryParams:  ':query-params',
  referrer: ':referrer',
});

// Simple format for development
const developmentFormat = ': real-ip : method :url :status :response-time ms - :user-agent';

// Choose format based on environment
const morganFormat = process.env.NODE_ENV === 'production' 
  ? productionFormat 
  : developmentFormat;

// Export the middleware
export const requestLogger = morgan(morganFormat, {
  stream,
  skip,
});