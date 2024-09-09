const sequelize = require("../config/connection");
const User = require("./User");
const Book = require("./Book");
const Genre = require("./Genre");

// Junction Table for Books and Genres
const BookGenre = sequelize.define(
  "BookGenre",
  {},
  {
    timestamps: false,
    underscored: true,
  }
);

Book.belongsToMany(Genre, { through: BookGenre, foreignKey: "book_id" });
Genre.belongsToMany(Book, { through: BookGenre, foreignKey: "genre_id" });

module.exports = { User, Book, Genre, BookGenre };
