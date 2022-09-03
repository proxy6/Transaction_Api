/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('transaction', table => {
        table.increments('id').primary()
        table.string('user_id', 255).notNullable();
        table.string("name", 255).notNullable();
        table.string('image_url', 255).notNullable();
        table.string('amount').notNullable().defaultTo(0.00);
        table.string('type', ['DEBIT', 'CREDIT']).notNullable;
        table.string('currency', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('transaction');
};
