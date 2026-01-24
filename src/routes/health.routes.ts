import { Router } from 'express';
import { healthCheck, readinessCheck, livenessCheck } from '../controllers/health.controller';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Full health check
 *     description: Performs a comprehensive health check including database and Redis connectivity
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthCheck'
 *       503:
 *         description: Service unavailable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', healthCheck);

/**
 * @swagger
 * /health/ready:
 *   get:
 *     summary: Readiness check
 *     description: Kubernetes readiness probe - returns 200 when ready to handle traffic
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is ready
 *       503:
 *         description: Server not ready
 */
router.get('/ready', readinessCheck);

/**
 * @swagger
 * /health/live:
 *   get:
 *     summary: Liveness check
 *     description: Kubernetes liveness probe - returns 200 if server is running
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is alive
 *       503:
 *         description: Server is down
 */
router.get('/live', livenessCheck);

export default router;
