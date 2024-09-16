# Book-Hive

Welcome to Book-Hive, a platform for readers and book lovers where users can post book reviews, analyze sentiment through TensorFlow.js, and interact with the community by sharing their thoughts. This application leverages modern web technologies and the MVC architecture to provide an engaging user experience

## Introduction

The goal of Book-Hive is to provide an interactive platform for readers to post and analyze book reviews. Users can authenticate themselves, submit reviews, and receive real-time feedback on the sentiment of their text through a star-rating system powered by TensorFlow.js.

## :ledger: Index

- [About](#beginner-about)
  - [File Structure](#file_folder-file-structure)
  - [Build](#hammer-build)
  - [Deployment](#rocket-deployment)
- [Community](#cherry_blossom-community)
  - [Contribution](#fire-contribution)
- [Resources](#page_facing_up-resources)
- [Gallery](#camera-gallery)
- [Credit/Acknowledgment](#star2-creditacknowledgment)
- [License](#lock-license)

## :beginner: About

Book-Hive is a collaborative full-stack application designed for book lovers to share and analyze book reviews. The platform enables users to register, log in, post reviews, and use machine learning to analyze the sentiment of those reviews. Built using modern technologies, Book-Hive showcases a seamless interaction between the front end and back end, demonstrating a strong user authentication system, RESTful API, and responsive design.

### Features include:

- User Authentication: Secure sign-up, log-in, and session handling using express-session and bcrypt.
- RESTful API: Robust back-end functionality with Node.js and Express.js for handling HTTP requests.
- Sentiment Analysis: Integration of TensorFlow.js for analyzing user reviews' sentiment and providing feedback via a dynamic star rating system.
- CRUD Operations: Users can create, view, update, and delete their own reviews.
- Responsive Design: Fully responsive front-end using Handlebars.js to provide an intuitive user interface on any device.
- Seamless Database Management: PostgreSQL database powered by Sequelize ORM for managing users, books, and reviews.
- Environment Variables: Sensitive information is protected using environment variables (dotenv).

### :file_folder: File Structure

Below is a view of the file structure deployed to GitHub.

```plaintext

BOOK-HIVE/
│
├── config/                    # Database and server configuration files
│   └── connection.js           # Sequelize connection setup
│
├── controllers/                # Logic for handling requests and routing
│   ├── api/
│   │   ├── bookRoutes.js       # Routes for book-related actions (CRUD)
│   │   ├── userRoutes.js       # Routes for user-related actions (CRUD)
│   │   └── homeRoutes.js       # Routes for rendering home views
│   └── index.js                # Centralized export of all route handlers
│
├── db/                         # Database schema file
│   └── schema.sql              # SQL script to create the database schema
│
├── models/                     # Sequelize models for interacting with the database
│   ├── Book.js                 # Model for Book entities
│   ├── User.js                 # Model for User entities
│   └── index.js                # Exports all models
│
├── public/                     # Publicly accessible static files
│   ├── css/
│   │   └── jass.css            # Main CSS file for styling
│   └── js/
│       ├── login.js            # Handles login functionality
│       ├── logout.js           # Handles logout functionality
│       └── script.js           # Additional client-side logic
│
├── seeds/                      # Seed data for populating the database
│   ├── bookData.json           # Initial book data
│   ├── userData.json           # Initial user data
│   └── seed.js                 # Seed script to populate the database
│
├── utils/                      # Utility functions for authentication and helpers
│   ├── auth.js                 # Middleware for authenticating routes
│   └── helpers.js              # Utility functions (like formatting dates)
│
├── views/                      # Handlebars templates for rendering HTML
│   ├── layouts/
│   │   └── main.handlebars      # Main layout template
│   ├── bookpage.handlebars      # Template for displaying a single book
│   ├── homepage.handlebars      # Template for the homepage
│   ├── login.handlebars         # Template for the login page
│   ├── signout.handlebars       # Template for the logout confirmation page
│   ├── userpage.handlebars      # Template for user profiles
│   └── users.handlebars         # Template for listing all users
│
├── .gitignore                  # Files to ignore in version control (e.g., node_modules)
├── LICENSE                     # License file for the project
├── package.json                # Project metadata and dependencies
├── README.md                   # Project documentation (this file)
└── server.js                   # Entry point for the Express server


```

### :hammer: Build

MVC Structure:

- Models: Created using Sequelize ORM to manage database entities like users, books, and reviews.
- Views: Developed using Handlebars.js to dynamically render HTML content.
- Controllers: API endpoints to handle CRUD operations for users and books.

Authentication:

- express-session: For managing user sessions and cookies.
- bcrypt: For securely hashing and storing passwords.

Sentiment Analysis:

- TensorFlow.js: Integrated to analyze the sentiment of user reviews and provide dynamic star ratings.

Database:

- PostgreSQL: Managed with Sequelize ORM for a structured, relational database.
- Sequelize ORM: Enables interaction between the server and the PostgreSQL database using models to perform CRUD operations on data.

Version Control:

- Project is version-controlled with Git, using branches and pull requests for collaborative development.

Environment Setup:

- dotenv: Used to manage environment variables, ensuring sensitive information such as database credentials, API keys, and session secrets are not hardcoded.

Version Control:

- Project development was tracked using Git, with branches for new features and bug fixes.
- All changes were version-controlled via GitHub with regular commits, pull requests, and reviews to maintain code integrity and team collaboration.

Responsive and Polished UI:

- Custom CSS: Additional styling provided to maintain consistent branding and user-friendly design.

Code Quality:

- Code Notes: Throughout the codebase, detailed and concise comments are added to clarify the functionality of complex logic, making the code more readable and maintainable for future contributors.
- Controller Files: Comments explain routes, logic flow, and error handling.
- Models: Comments in models explain relationships between tables (e.g., Users and Books).
- Frontend (Handlebars): Comments are placed to indicate where dynamic data is being rendered or where user interaction is expected.
- Best Practices: The project adheres to best coding practices, including proper naming conventions, clean code structure, and consistent indentation.

### :rocket: Deployment

- To deploy the website please visit : https://book-hive-c90u.onrender.com

 ###  :fire: Contribution

 - Your contributions are always welcome and greatly appreciated. Here are some ways you can contribute to the project:

 1. **Report a bug** <br>
 If you think you have encountered a bug, and I should know about it, feel free to report it here [here](https://github.com/leontran44/book-hive/issues). I will look into it and take the necessary steps.
 
 2. **Request a feature** <br>
 If you have a feature idea that you think would enhance the project, you can request it [here](https://github.com/leontran44/book-hive/issues), If the feature is deemed viable, it will be considered for development. 

 3. **Create a pull request** <br>
 The best way to contribute is by creating a pull request. The community will appreciate your efforts. You can start by picking up any open issues from [here](https://github.com/leontran44/book-hive/issues)and submitting a pull request.

##  :page_facing_up: Resources

Software used
- VS Code -  A powerful code editor for writing and managing code across various programming languages.
- Git Bash - A command-line interface for Git, providing Unix-like shell commands for version control and repository management.

API's and Libraries

- Express.js: Server framework for Node.js.
- Sequelize: ORM for interacting with the PostgreSQL database.
- TensorFlow.js: Machine learning library used for sentiment analysis.
- bcrypt: For secure password hashing.
- express-session: For session management and user authentication.
- Handlebars.js: Templating engine for rendering dynamic HTML.

Development Tools:

- Browser Developer Tools: Built-in tools in web browsers like Chrome and Firefox, used for debugging and inspecting the application's HTML, CSS, and JavaScript.

##  :camera: Gallery

Below is a preview photo of the website.

Click here to view preview photos: https://imgur.com/a/cAmy8Jw

## :star2: Credit/Acknowledgment

Team Book Hive!

- [Leon Tran](https://github.com/leontran44)
- [Adam Todorovic](https://github.com/ProjectAdam95)
- [Zoe (Wenli Zhong)](https://github.com/Zoooe-Brooo)
- [Lewis Johns](https://github.com/lewisgjohns)

## :lock: License

This project is licensed under the [MIT](https://opensource.org/license/mit) License.
