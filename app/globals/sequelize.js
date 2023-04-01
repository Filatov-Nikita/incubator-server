import { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } from '#app/config/app.js';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'mariadb',
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
});
