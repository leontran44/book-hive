const sequelize = require("./config/connection");
const User = require("./models/users");
const Book = require("./models/books");
const Genre = require("./models/genres");

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

// Sync the database
sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized");
});
