const Joi = require('joi')
// import {User} from '../model/user.model';

module.exports ={
    signUpValidation: Joi.object({
        name: Joi.string().trim().required(),
        email: Joi.string().trim().required(),
        mobile_no: Joi.string().trim().required(),
        password: Joi.string().trim().required()

    }),
    loginValidation: Joi.object({
        mobile_no: Joi.string().trim().required(),
        password: Joi.string().trim().required(),
    })
}

// export const loginValidation = Joi.object({
//     email: Joi.string().trim().required(),
//     password: Joi.string().trim().required(),
// })

// export const walletValidation = Joi.object({
//     amount: Joi.number().positive().required(),
//     userId: Joi.number().required(),
//     description: Joi.string(),
// })
// export const transferValidation = Joi.object({
//     amount: Joi.number().positive().required(),
//     userId: Joi.number().required(),
//     description: Joi.string(),
//     receiver: Joi.number().required()
// })
