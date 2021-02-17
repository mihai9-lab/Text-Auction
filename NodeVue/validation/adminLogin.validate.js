const Joi = require('joi');

module.exports = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    secret: Joi.string().equal(process.env.ADMIN_SECRET).required()
});
