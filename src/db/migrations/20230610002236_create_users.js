exports.up = function (knex) {
    return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').createTable('users', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

        table.string('name').notNullable();

        table.string('email').notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
