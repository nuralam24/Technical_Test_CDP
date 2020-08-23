const Joi = require('joi');

const validation = {
    name: Joi.string().required(),
    mobileNumber: Joi.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/).required()
};
const mobileValidation = {
    mobileNumber: Joi.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/).required()
};
const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };

module.exports = {
    validation,
    mobileValidation,
    options
};

