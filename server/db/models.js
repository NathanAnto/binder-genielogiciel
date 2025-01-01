import { DataTypes } from 'sequelize';
import sequelize from './config';

// Book model definition
export const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publisher: DataTypes.STRING,
  publishYear: DataTypes.INTEGER,
  pageCount: DataTypes.INTEGER,
  genre: DataTypes.STRING,
  language: DataTypes.STRING,
  description: DataTypes.TEXT,
  isbn: DataTypes.STRING,
  coverImage: DataTypes.STRING,
  rating: DataTypes.FLOAT,
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  bookingDuration: DataTypes.INTEGER
});

// Booking model
export const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active'
  },
  isReturned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  returnDate: DataTypes.DATE
});

// User Preferences model
export const UserPreference = sequelize.define('UserPreference', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  favoriteGenres: DataTypes.JSON,
  preferredLanguages: DataTypes.JSON,
  readingSpeed: DataTypes.INTEGER,
  preferredPageCount: DataTypes.JSON
});

// Define relationships with explicit configuration
Book.hasMany(Booking, {
  foreignKey: {
    name: 'bookId',
    allowNull: false
  }
});

Booking.belongsTo(Book, {
  foreignKey: {
    name: 'bookId',
    allowNull: false
  }
});

// Initialize database
export const initializeDatabase = async () => {
  try {
    // Force: true will drop existing tables - be careful with this in production!
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};