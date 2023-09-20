import { Router } from 'express';
import { ApiRouter } from './api';
import { Environment } from '../../utils';

export function MainRouter (): Router {
  const router = Router();
  router.use(`/api/${Environment.getApiVersion()}`, ApiRouter());

  return router;
}
