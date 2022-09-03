const express = require('express');
const { GenerateSignature, HashPassword, validatePassword, GenerateRefreshToken } = require('../utils/auth');
const { signUpValidation, loginValidation } = require('../utils/validations');
const parseValidationError= require ('../utils/validation-error')
const UserService = require('../service/user.service')
const app = express();

module.exports ={
    SignUp: async(req, res)=>{
        //validate request body
        const { error, value } = signUpValidation.validate(req.body)
        if (error) {
          return res.status(400).json({
            error: {
              success: false,
              message: error.details.map(({ message }) => message),
            },
          });
        }
        const {name, email, mobile_no, password} = value
        try{
            const existingUser = await UserService.Login({mobile_no}); 
            if(existingUser == undefined) {
                const userPassword = await HashPassword(password)
                const newUser = await UserService.SignUp({name, email, mobile_no, userPassword})
                let access_token = await GenerateSignature({_id: newUser.id, role: newUser.role})
                let refresh_token = await GenerateRefreshToken({_id: newUser.id, role: newUser.role})
                const data = {...newUser, access_token, refresh_token}
                // Assigning refresh token in http-only cookie 
                res.cookie('jwt', refresh_token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
                res.status(201).json(data)
            }else{
                res.status(409).json({data:'User Exist'})
            }         
          }catch(e){
            console.log(e)
            res.status(500).json({success: false, error: 'Unable to Signup User'})
        }
      
    },
    Login: async(req, res)=>{
        //validate request body
        const { error, value } = loginValidation.validate(req.body)
        if (error) {
          return res.status(400).json({
            error: {
              success: false,
              message: error.details.map(({ message }) => message),
            },
          });
        }
        const {mobile_no, password} = value
        try{
            // const existingUser = await UserService.Login({email}); 
            // if(existingUser == undefined){
                const user = await UserService.Login({mobile_no})
                if(!user) return res.json({data: 'User does not Exist'})
                const validatePass = await validatePassword({password, savedPassword: user.password})
                if(!validatePass){
                  return res.status(409).json({data: 'Mobile_no or Password Incorrect'})
                }
                const access_token = await GenerateSignature({_id: user.id})
                const refresh_token = await GenerateSignature({_id: user.id})
                const data = {access_token, refresh_token}
                res.status(201).json(data)
            // }else{
            //     res.status(409).json('User Exist')
            // }         
          }catch(e){
            console.log(e)
            res.status(500).json({success: false, error: 'Unable to Signup User'})
        }
      
    },
}