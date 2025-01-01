import { Sequelize } from 'sequelize';
import path from 'path';

// Docker container'daki yolu kullan
const dbPath = path.join('/data', 'books.db');

class Database {
  public sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: dbPath,
      logging: console.log
    });
  }

  async testConnection() {
    try {
      await this.sequelize.authenticate();
      console.log('Database connection has been established successfully.');
      return true;
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      return false;
    }
  }
}

const db = new Database();
export default db;