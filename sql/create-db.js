import '#app/config/index.js';
import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } from '#app/config/app.js';
import mariadb from 'mariadb';

const connection = mariadb.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD
});

connection.then(db => {
  db.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``)
  .then(console.log)
  .catch(console.log)
  .finally(() => db.end());
});
