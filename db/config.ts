import { defineDb, defineTable, column } from 'astro:db';


// Define your tables and their schema
const Clients = defineTable({
  columns: {
    id: column.number( { primaryKey: true } ),
    name: column.text(),
    age: column.number(),
    isActive: column.boolean(),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Clients,
  }
});
