import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('points_items', table => {

        // notNullable(): não pode ser nullo
        table.increments('id').primary();

        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');

        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropSchema('points_items');
}