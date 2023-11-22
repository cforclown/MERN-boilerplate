import Joi from 'joi';

export const CreateSchedulePayloadSchema = Joi.object({
  name: Joi.string().required(),
  start: Joi.date().required(),
  end: Joi.date().allow('').default(null),
  desc: Joi.string().allow('').default(null)
});

export const UpdateSchedulePayloadSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string(),
  start: Joi.date(),
  end: Joi.date().allow('').default(null),
  desc: Joi.string().allow('').default(null)
});
