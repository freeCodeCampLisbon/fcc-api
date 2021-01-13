import { validate, Joi } from 'express-validation'

export default  validate({
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    uid: Joi.string().required(),
    date: Joi.string().required().isoDate(),
    name: Joi.string().required(),
    sub_newsletter: Joi.bool().required()
  }),
}, {keyByField: true}, {})