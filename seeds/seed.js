const sequelize = require("../config/connection");
const { User, Book, Review } = require("../models");

const userData = require("./userData.json");
const bookData = require("./bookData.json");
const reviewData = require("./reviewData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Bulk create users and ensure hooks like password hashing are applied
    const users = await User.bulkCreate(userData, {
      individualHooks: true, // This ensures the beforeCreate hook runs and hashes the passwords
      returning: true,
    });
    console.log("Users created:", users);

    // Create books as normal
    const books = await Book.bulkCreate(bookData, {
      returning: true,
    });
    console.log("Books created:", books);

    // Create reviews using the user_id and book_id from the reviewData.json
    const reviews = await Review.bulkCreate(reviewData, {
      returning: true,
    });
    console.log("Reviews created:", reviews);

    console.log("Database seeding completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDatabase();
