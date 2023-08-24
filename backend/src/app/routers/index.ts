import { Router } from 'express';
import { ApiRouter } from './api';

export function MainRouter (): Router {
  const router = Router();
  router.use('/api', ApiRouter());

  return router;
}
