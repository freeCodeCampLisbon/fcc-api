import { validate, Joi } from 'express-validation'

export default  validate({
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    uid: Joi.string().required(),
    date: Joi.string().required().isoDate()
  }),
}, {keyByField: true}, {})