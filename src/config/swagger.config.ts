import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CarFleet API Documentation',
      version: '1.0.0',
      description: 'Production-ready Express.js logging system with Winston and Morgan featuring request/response logging, error tracking, and daily log rotation',
      contact: {
        name: 'CarFleet Team',
        email: 'support@carfleet.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://api.carfleet.com',
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        HealthCheck: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'OK',
              description: 'Health check status',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'Health check timestamp',
            },
            uptime: {
              type: 'number',
              description: 'Server uptime in seconds',
            },
            services: {
              type: 'object',
              properties: {
                redis: {
                  type: 'string',
                  enum: ['connected', 'disconnected'],
                },
                database: {
                  type: 'string',
                  enum: ['connected', 'disconnected'],
                },
              },
            },
          },
        },
        APIInfo: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'CarFleet API',
            },
            version: {
              type: 'string',
              example: '1.0.0',
            },
            description: {
              type: 'string',
              example: 'Production-ready Express.js logging system',
            },
            uptime: {
              type: 'number',
              description: 'Server uptime in seconds',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
            status: {
              type: 'string',
              example: 'error',
            },
            statusCode: {
              type: 'integer',
              example: 400,
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Bearer token',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/**/*.ts', './src/index.ts'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
