import '#app/config/index.js';
import '#app/globals/models.js';
import { sequelize } from '#app/globals/sequelize.js';

sequelize.sync({ alter: true });
