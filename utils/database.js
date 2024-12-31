const knex = require('knex');
const dotenv = require('dotenv');

dotenv.config();

const db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
});

module.exports = db;
