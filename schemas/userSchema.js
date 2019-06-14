const Joi = require('@hapi/joi');;

module.exports = {
    authSchema: {
        body: {
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().alphanum().min(2).max(25).required()
        }
    }
};