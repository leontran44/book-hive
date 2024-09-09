const sequelize = require("../config/connection");
const { User, Book, Genre } = require("../models");

const userData = require("./userData.json");
const bookData = require("./bookData.json");
const genreData = require("./genreData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log("Users seeded successfully");

    await Book.bulkCreate(bookData, {
      returning: true,
    });
    console.log("Books seeded successfully");

    await Genre.bulkCreate(genreData, {
      returning: true,
    });
    console.log("Genres seeded successfully");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDatabase();
