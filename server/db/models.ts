import { DataTypes, Model } from 'sequelize';
import db from './config';

interface BookAttributes {
  id?: number;
  title: string;
  author: string;
  description: string;
  publisher: string;
  publishYear: number;
  pageCount: number;
  genre: string;
  language: string;
  isbn: string;
  rating: number;
  coverImage: string;
  isAvailable: boolean;
  bookingDuration: number;
}

export class Book extends Model<BookAttributes> implements BookAttributes {
  public id!: number;
  public title!: string;
  public author!: string;
  public description!: string;
  public publisher!: string;
  public publishYear!: number;
  public pageCount!: number;
  public genre!: string;
  public language!: string;
  public isbn!: string;
  public rating!: number;
  public coverImage!: string;
  public isAvailable!: boolean;
  public bookingDuration!: number;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    publisher: {
      type: DataTypes.STRING,
    },
    publishYear: {
      type: DataTypes.INTEGER,
    },
    pageCount: {
      type: DataTypes.INTEGER,
    },
    genre: {
      type: DataTypes.STRING,
    },
    language: {
      type: DataTypes.STRING,
    },
    isbn: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    coverImage: {
      type: DataTypes.STRING,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    bookingDuration: {
      type: DataTypes.INTEGER,
      defaultValue: 14,
    },
  },
  {
    sequelize: db.sequelize,
    modelName: 'Book',
    timestamps: true,
  }
); 