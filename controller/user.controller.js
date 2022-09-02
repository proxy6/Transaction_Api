const express = require('express');
const { GenerateSignature, HashPassword, validatePassword } = require('../utils/auth');
const { signUpValidation, loginValidation } = require('../utils/validations');
const parseValidationError= require ('../utils/validation-error')
const UserService = require('../service/user.service')
const app = express();

module.exports ={
    SignUp: async(req, res)=>{
        //validate request body
        const { error, value } = signUpValidation.validate(req.body)
        if (error) {
            // console.log(error)
          return res.status(400).json({
            error: {
              success: false,
              message: parseValidationError(error),
            },
          });
        }
        const {name, email, mobile_no, password} = value
        try{
            // const existingUser = await UserService.Login({email}); 
            // if(existingUser == undefined){
                const userPassword = await HashPassword(password)
                const newUser = await UserService.SignUp({name, email, mobile_no, userPassword})
                const access_token = await GenerateSignature({_id: newUser.id})
                const refresh_token = await GenerateSignature({_id: newUser.id})
                const data = {...newUser, access_token, refresh_token}
                res.status(201).json(data)
            // }else{
            //     res.status(409).json('User Exist')
            // }         
          }catch(e){
            console.log(e)
            res.status(500).json({success: false, error: 'Unable to Signup User'})
        }
      
    },
    Login: async(req, res)=>{
        //validate request body
        const { error, value } = loginValidation.validate(req.body)
        if (error) {
          console.log(error)
          // return res.status(400).json({
          //   error: {
          //     success: false,
          //     message: parseValidationError(error),
          //   },
          // });
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