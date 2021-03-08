//Validation
const Joi = require("@hapi/joi");

//Registre validation
const registrValidation = (data) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.registrValidation = registrValidation;
module.exports.loginValidation = loginValidation;
