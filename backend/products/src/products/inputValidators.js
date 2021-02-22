const Joi = require('@hapi/joi')

const createProductValidator = (input) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
    category: Joi.string().required()
  })
  return schema.validate(input)
}

module.exports = {
  createProductValidator
}
