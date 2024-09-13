const sequelize = require("../config/connection");
const { User, Book, Review, Genre } = require("../models");

const userData = require("./userData.json");
const bookData = require("./bookData.json");
const reviewData = require("./reviewData.json");

const seedDatabase = async () => {
  try {
    // Sync the database and reset tables
    await sequelize.sync({ force: true });

    // Seed Users
    const users = await User.bulkCreate(userData, {
      individualHooks: true,  // Ensures password hashing
      returning: true,
    });
    console.log("Users created with hashed passwords:", users);

    // Seed Genres
    const genres = {};

    for (const book of bookData) {
      if (!genres[book.genre]) {
        // Check if the genre already exists in the database, if not create it
        const [genre, created] = await Genre.findOrCreate({
          where: { name: book.genre },
        });
        genres[book.genre] = genre;
      }
    }

    console.log("Genres created or fetched:", Object.keys(genres));

    // Seed Books with their associated genre
    const books = await Promise.all(
      bookData.map(async (book) => {
        const createdBook = await Book.create({
          ...book,
          genre_id: genres[book.genre].id, // Associate the book with the genre
        });
        return createdBook;
      })
    );

    console.log("Books created:", books);

    // Seed Reviews
    const reviews = [];

    for (const review of reviewData) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomBook = books[Math.floor(Math.random() * books.length)];

      // Collect reviews for bulk creation
      reviews.push({
        ...review,
        user_id: randomUser.id,  // Link review to user
        book_id: randomBook.id,  // Link review to book
      });
    }

    // Bulk create all reviews
    await Review.bulkCreate(reviews);
    console.log("Reviews created.");

    console.log("Database seeding completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDatabase();