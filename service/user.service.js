const dbConfig = require('../knexfile');
const knex = require('knex')
const _ = require('lodash')
module.exports = class {
    static async SignUp(userData){
         const knexDB = knex(dbConfig[process.env.NODE_ENV])
         const {name, email, mobile_no, userPassword} = userData
         try{ 
             const newUser = await knexDB("users").insert({
                 name,
                 email,
                 mobile_no,
                 password: userPassword
             })
             const user = await knexDB('users').where('id', newUser[0]).first()
             console.log(user)
             const returnedUser = _.omit(user, ['name', 'email', 'mobile_no', 'password', 'created_at'])
             return returnedUser
         }catch(e){
            console.log(e)
            throw new Error('Unable to Signup User')
         }
    }
 
    static async Login(data){
     const {mobile_no} = data
     try{
         const knexDB = knex(dbConfig[process.env.NODE_ENV])
         const user = await knexDB('users').where({mobile_no}).first()
         console.log(user)
        //  if(typeof user == undefined) return user
         return user
     }catch(e){
        return e 
     }
    } 
 }