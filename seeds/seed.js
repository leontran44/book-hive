const sequelize = require("../config/connection");
const { User, Book, Review } = require("../models");

const userData = require("./userData.json");
const bookData = require("./bookData.json");
const reviewData = require("./reviewData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log("Users created:", users);

    const books = await Book.bulkCreate(bookData, {
      returning: true,
    });
    console.log("Books created:", books);

    for (const review of reviewData) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomBook = await Book.findOne({
        order: sequelize.random(),
      });
      const createdReview = await Review.create({
        ...review,
        user_id: randomUser.id,
        book_id: randomBook.id,
      });
      console.log("Review created:", createdReview);
    }

    console.log("Database seeding completed successfully.");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDatabase();
