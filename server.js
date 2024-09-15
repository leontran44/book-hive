const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const customHelpers = require("./utils/helpers"); // Import helpers

// Register custom Handlebars helpers
const hbs = exphbs.create({
  helpers: {
    ...customHelpers, // Merge helpers from the custom helpers file
    // Additional helpers if needed
  }
});

const sequelize = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3008;

const sess = {
  secret: "secret string",
  cookie: {
    maxAge: 3000000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set Handlebars as the template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static content from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Use routes defined in the 'controllers' folder
app.use(routes);

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening on PORT " + PORT));
});
