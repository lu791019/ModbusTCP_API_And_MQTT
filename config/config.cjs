// import dotenv from 'dotenv';
// dotenv.config(); // this is important!
require('dotenv').config()
module.exports = {
  dev: {
    username: process.env.POSTGGRESQL_USERNAME,
    password: process.env.POSTGGRESQL_PASSWORD,
    database: process.env.POSTGGRESQL_DATABASE,
    host: process.env.POSTGGRESQL_HOST,
    port: process.env.POSTGGRESQL_PORT,
    dialect: 'postgres',
  },
  prd: {
    username: process.env.POSTGGRESQL_USERNAME,
    password: process.env.POSTGGRESQL_PASSWORD,
    database: process.env.POSTGGRESQL_DATABASE,
    host: process.env.POSTGGRESQL_HOST,
    port: process.env.POSTGGRESQL_PORT,
    dialect: 'postgres',
  },
}
