const dbConfig = require('../knexfile');
const knex = require('knex')

module.exports = class {
    static async Transaction(){
        try{
            const knexDB = knex(dbConfig[process.env.NODE_ENV])
            const user = await knexDB('transaction').where({mobile_no}).first()
            console.log(user)
           //  if(typeof user == undefined) return user
            return user
        }catch(e){
           return e 
        }
    } 
}