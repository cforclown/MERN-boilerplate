import { Router } from 'express';
import { SchedulesController } from './schedules.controller';
import { RequestHandler, validateBody, validateParams } from '../../utils';
import { ObjectIdSchema } from '../../schemas/common-schema';
import { CreateSchedulePayloadSchema, UpdateSchedulePayloadSchema } from './schedules.dto';
import { ExplorationDto } from '../../utils/exploration/exploration';

export const SCHEDULES_ROUTER_INSTANCE_NAME = 'schedulesRouter';
export const SCHEDULES_BASE_API_PATH = 'schedules';

export function SchedulesRouter ({ schedulesController }:{ schedulesController:SchedulesController }): Router {
  const router = Router();

  /**
   * @swagger
   * /api/schedules/{objectId}:
   *      get:
   *          tags:
   *              - Schedules
   *          description: Get schedule
   *          responses:
   *              '200':
   *                  description: OK
   *          parameters:
   *              -   name: objectId
   *                  in: path
   *                  required: true
   */
  router.get('/:objectId', validateParams(ObjectIdSchema), RequestHandler(schedulesController.get));

  /**
   * @swagger
   * /api/schedules:
   *      get:
   *          tags:
   *              - Schedules
   *          description: Get all schedules
   *          responses:
   *              '200':
   *                  description: OK
   */
  router.get('/', RequestHandler(schedulesController.getAll));

  /**
   * @swagger
   * /api/schedules/explore:
   *      post:
   *          tags:
   *              - Schedules
   *          description: Explore schedules with pagination
   *          responses:
   *              '200':
   *                  description: OK
   *          requestBody:
   *              description: "Exploration payload"
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/schemas/explorationPayload'
   */
  router.post('/explore', validateBody(ExplorationDto), RequestHandler(schedulesController.explore));

  /**
   * @swagger
   * /api/schedules:
   *      post:
   *          tags:
   *              - Schedules
   *          description: Create schedule
   *          responses:
   *              '200':
   *                  description: OK
   *          requestBody:
   *              description: "Create schedule payload"
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/schemas/createSchedule'
   */
  router.post('/', validateBody(CreateSchedulePayloadSchema), RequestHandler(schedulesController.create));

  /**
   * @swagger
   * /api/schedules:
   *      patch:
   *          tags:
   *              - Schedules
   *          description: Update schedule
   *          responses:
   *              '200':
   *                  description: OK
   *          requestBody:
   *              description: "Update schedule payload"
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/schemas/updateSchedule'
   */
  router.patch('/', validateBody(UpdateSchedulePayloadSchema), RequestHandler(schedulesController.update));

  /**
   * @swagger
   * /api/schedules:
   *      delete:
   *          tags:
   *              - Schedules
   *          description: Delete schedule
   *          responses:
   *              '200':
   *                  description: OK
   *          parameters:
   *              -   name: objectId
   *                  in: path
   *                  required: true
   */
  router.delete('/:objectId', RequestHandler(schedulesController.delete));

  return router;
}
