import Joi from 'joi';

export const pathIdSchema = Joi.object({
  id: Joi.string().required()
});
