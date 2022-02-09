import Joi from '@hapi/joi';

export default {

    merchantSignup: Joi.object().keys({
        name: Joi.string().required().min(1).max(200),
        email: Joi.string().required().min(1).max(200),
        address: Joi.string().required().min(1).max(200),
        country: Joi.string().required().min(1).max(200),
        city: Joi.string().required().min(1).max(200),
        password: Joi.string().required().min(1).max(200),
        confirm_password: Joi.string().required().min(1).max(200)
    }).unknown(),

    merchantSignin: Joi.object().keys({
        email: Joi.string().required().min(1).max(200),
        password: Joi.string().required().min(1).max(200),
    }).unknown()
    
}