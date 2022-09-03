
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SECRET_KEY = `${process.env.JWT_SECRET}`


module.exports = {
    GenerateSignature: async (payload) => {
        return await jwt.sign(payload, SECRET_KEY, { expiresIn: 300 /*Expires in 5 mins*/ })
    },
    GenerateRefreshToken: async(payload)=>{
        return await jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' /*Expires in 1 day*/ })
    },
    HashPassword: async (password) => {
        const salt = bcrypt.genSaltSync(10)
        const userPassword = bcrypt.hash(password, salt)
        return userPassword
    },
    validatePassword: async (data)=>{
        const {password, savedPassword} = data
        const validatePassword = bcrypt.compareSync(password, savedPassword)
        if(!validatePassword) return false
        return true
        
    }
}

