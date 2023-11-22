import { Router } from 'express';
import { container } from '../../../di-config';
import { SCHEDULES_BASE_API_PATH, SCHEDULES_ROUTER_INSTANCE_NAME } from '../../../modules';

export function ApiRouter (): Router {
  const router = Router();
  router.use(`/${SCHEDULES_BASE_API_PATH}`, container.resolve(SCHEDULES_ROUTER_INSTANCE_NAME));

  return router;
}
