const { DataTypes } = require('sequelize');
const { sequelize } = require('./config');

const Book = sequelize.define('Book', {
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
  description: DataTypes.TEXT,
  publisher: DataTypes.STRING,
  publishYear: DataTypes.INTEGER,
  pageCount: DataTypes.INTEGER,
  genre: DataTypes.STRING,
  language: DataTypes.STRING,
  isbn: DataTypes.STRING,
  rating: DataTypes.FLOAT,
  coverImage: DataTypes.STRING,
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  bookingDuration: DataTypes.INTEGER
});

module.exports = { Book };