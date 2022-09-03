/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker')
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('transaction').del()
  for (let i = 0; i < 20; i++) {
    await knex('transaction').insert({
      name: faker.name.fullName(),
      user_id: faker.random.numeric(2),
      image_url: faker.image.avatar(),
      amount: faker.random.numeric(5),
      type: 'CREDIT',
      currency: '$'
    });
  }
  for (let i = 0; i < 20; i++) {
    await knex('transaction').insert({
      name: faker.name.fullName(),
      user_id: faker.random.numeric(2),
      image_url: faker.image.avatar(),
      amount: faker.random.numeric(5),
      type: 'DEBIT',
      currency: '$'
    });
  }
};
