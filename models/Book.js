const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover_image: {
      type: DataTypes.STRING, // URL or relative path to cover image
    },
    comments: {
      type: DataTypes.JSON, // Store comments as JSON format
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true, // Enable timestamps for creation and updates
    freezeTableName: true,
    underscored: true,
    modelName: "book",
  }
);

module.exports = Book;
