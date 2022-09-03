const dbConfig = require('../knexfile');
const knex = require('knex')

module.exports = class {
    static async GetAllTransaction(data) {
        const { ITEMS_PER_PAGE, offset_eqn } = data
        try {
            const knexDB = knex(dbConfig[process.env.NODE_ENV])
            const transaction = await knexDB('transaction').offset(offset_eqn).limit(ITEMS_PER_PAGE)
            console.log(transaction)
            //  if(typeof user == undefined) return user
            return transaction
        } catch (e) {
            return e
        }
    }
    static async GetUserTransaction(data) {
        const { ITEMS_PER_PAGE, user_id, offset_eqn } = data
        try {
            const knexDB = knex(dbConfig[process.env.NODE_ENV])
            const transaction = await knexDB('transaction').where({user_id}).offset(offset_eqn).limit(ITEMS_PER_PAGE)
            console.log(transaction)
            //  if(typeof user == undefined) return user
            return transaction
        } catch (e) {
            return e
        }
    }
    static async GetSingleTransaction(id) {
        try {
            const knexDB = knex(dbConfig[process.env.NODE_ENV])
            const transaction = await knexDB('transaction').where({ id }).first()
            return transaction
        } catch (e) {
            return e
        }
    }
}