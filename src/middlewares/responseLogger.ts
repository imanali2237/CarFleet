import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger.config';

/**
 * Middleware to log response details
 * Captures response body and additional metadata
 */
export const responseLogger = (req: Request, res: Response, next: NextFunction): void => {
  // Store original send function
  const originalSend = res.send;
  const startTime = Date.now();

  // Override send function to capture response
  res.send = function (data: any): Response {
    // Calculate response time
    const duration = Date.now() - startTime;

    // Parse response data
    let responseBody;
    try {
      responseBody = typeof data === 'string' ? JSON.parse(data) : data;
    } catch {
      responseBody = data;
    }

    // Determine log level based on status code
    const logLevel = res.statusCode >= 400 ? 'error' : 'http';

    // Create log object
    const logData = {
      type: 'RESPONSE',
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      duration: `${duration}ms`,
      userAgent: req.headers['user-agent'],
      userId: (req as any).user?.id || (req as any).userId || 'anonymous',
      requestBody: sanitizeRequestBody(req.body),
      queryParams: req.query,
      responseBody: sanitizeResponseBody(responseBody, res.statusCode),
      headers: {
        contentType: res.getHeader('content-type'),
        contentLength: res.getHeader('content-length'),
      },
    };

    // Log based on level
    if (logLevel === 'error') {
      logger.error('HTTP Response Error', logData);
    } else {
      logger.http('HTTP Response', logData);
    }

    // Call original send
    return originalSend.call(this, data);
  };

  next();
};

/**
 * Sanitize request body to remove sensitive information
 */
const sanitizeRequestBody = (body: any): any => {
  if (!body || typeof body !== 'object') return body;

  const sanitized = { ...body };
  const sensitiveFields = [
    'password',
    'token',
    'apiKey',
    'secret',
    'authorization',
    'creditCard',
    'ssn',
  ];

  sensitiveFields.forEach((field) => {
    if (sanitized[field]) {
      sanitized[field] = '***REDACTED***';
    }
  });

  return sanitized;
};

/**
 * Sanitize response body for logging
 * Limit size and remove sensitive data
 */
const sanitizeResponseBody = (body: any, statusCode: number): any => {
  // Don't log response body for successful requests in production
  if (process.env.NODE_ENV === 'production' && statusCode < 400) {
    return { logged: false, reason: 'Success response - body not logged in production' };
  }

  if (!body) return null;

  // Convert to string and limit size
  let stringified = JSON.stringify(body);
  const maxLength = 1000; // 1KB limit

  if (stringified.length > maxLength) {
    return {
      truncated: true,
      preview: stringified.substring(0, maxLength) + '...',
      originalSize: stringified.length,
    };
  }

  return body;
};

/**
 * Error logging middleware
 */
export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  logger.error('Unhandled Error', {
    type: 'ERROR',
    timestamp: new Date().toISOString(),
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    method: req.method,
    url: req.originalUrl || req.url,
    error: {
      message: err.message,
      stack: err.stack,
      name: err.name,
    },
    requestBody: sanitizeRequestBody(req.body),
    queryParams: req.query,
    headers: req.headers,
    userId: (req as any).user?.id || (req as any).userId || 'anonymous',
  });

  // Pass to next error handler
  next(err);
};
