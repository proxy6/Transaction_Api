/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', user => {
        user.increments('id').primary()
        user.string("name", 255).notNullable();
        user.string('email', 255).unique()
        user.string('mobile_no', 255).unique();
        user.string('password', 255).notNullable();
        user.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
