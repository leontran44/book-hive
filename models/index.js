const User = require("./User");
const Book = require("./Book");
const Genre = require('./Genre');
const Review = require("./Review");

User.hasMany(Review, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Book.hasMany(Review, {
  foreignKey: "book_id",
  onDelete: "CASCADE",
});

Review.belongsTo(User, {
  foreignKey: "user_id",
});

Review.belongsTo(Book, {
  foreignKey: "book_id",
});

// One genre can have many books
Genre.hasMany(Book, {
  foreignKey: 'genre_id',
  onDelete: 'CASCADE',
});

// A book belongs to one genre
Book.belongsTo(Genre, {
  foreignKey: 'genre_id',
});

module.exports = { User, Book, Review };
