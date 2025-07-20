import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id');
    table.text('name').notNullable();
    table.text('description').notNullable();
    table.boolean('is_diet').notNullable().defaultTo(false);
    table.uuid('user_id').notNullable();
    table.foreign('user_id').references('users.id').deferrable('deferred');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals');
}
