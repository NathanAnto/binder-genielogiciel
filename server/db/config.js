import { Sequelize } from 'sequelize';
import path from 'path';

// Configure SQLite database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(process.cwd(), 'database.sqlite'), // Database file location
  logging: false // Disable logging
});

export default sequelize;