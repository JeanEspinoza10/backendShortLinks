const { Sequelize } = require('sequelize');


const database = process.env.DATABASE;
const username = process.env.DATABASE_USER;
const password = process.env.PASSWORD;
const host = process.env.DATABASE_HOST;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: process.env.DATABASE_PORT,
  dialect: 'postgres'
});




module.exports = {
  sequelize
}