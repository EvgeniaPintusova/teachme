const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            if(!req.body.password && req.user) req.body.password=req.user.local.password;
            const result = schema.validate(req.body);
            if (result.error) {
                return res.status(400).json(result.error)
            }
            if (!req.value) {
                req.value = {};
            }
            req.value['body'] = result.value;
            next(); 
        }
    },

    schemas: {
        authSchema: Joi.object().keys({
            username: Joi.string().min(3).max(20).required(),
            mail: Joi.string().email().required(),
            password: Joi.string().min(5).max(20).regex(/^[a-zA-Z0-9]{5,20}$/).required()
        }),
        loginSchema: Joi.object().keys({
            mail: Joi.string().email().required(),
            password: Joi.string().min(5).max(20).regex(/^[a-zA-Z0-9]{5,20}$/).required()
        })
    }
}
