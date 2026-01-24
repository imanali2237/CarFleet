import { Router } from 'express';
import { healthCheck, readinessCheck, livenessCheck } from '../controllers/health.controller';

const router = Router();

/**
 * Health check routes
 * GET /health - Full health check with database
 * GET /health/ready - Readiness probe
 * GET /health/live - Liveness probe
 */
router.get('/', healthCheck);
router.get('/ready', readinessCheck);
router.get('/live', livenessCheck);

export default router;
