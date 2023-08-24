import Joi from 'joi';

export const CreateSchedulePayloadSchema = Joi.object({
  name: Joi.string().required(),
  start: Joi.date().required(),
  end: Joi.date(),
  desc: Joi.string()
});

export const UpdateSchedulePayloadSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string(),
  start: Joi.date(),
  end: Joi.date(),
  desc: Joi.string()
});
