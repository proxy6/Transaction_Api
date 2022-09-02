
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SECRET_KEY = `${process.env.JWT_SECRET}`


module.exports = {
    GenerateSignature: async (payload) => {
        return await jwt.sign(payload, SECRET_KEY, { expiresIn: 1500 /*Expires in 5 mins*/ })
    },
    HashPassword: async (password) => {
        const salt = bcrypt.genSaltSync(10)
        const userPassword = bcrypt.hash(password, salt)
        return userPassword
    },
    validatePassword: async (data)=>{
        console.log(data)
        const {password, savedPassword} = data
        const validatePassword = bcrypt.compareSync(password, savedPassword)
        if(!validatePassword) return false
        return true
        
    }
}

