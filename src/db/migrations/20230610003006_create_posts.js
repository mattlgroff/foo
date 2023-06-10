exports.up = function (knex) {
    return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').createTable('posts', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

        table.string('title').notNullable();

        table.text('body').notNullable();

        table.uuid('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('posts');
};
