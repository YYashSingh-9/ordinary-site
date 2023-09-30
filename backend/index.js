const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: "./config.env" });

// HANDLING UNCAUGHT EXCPETIONS
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT ERROR->", err);
  process.exit(1);
});

// Connecting to mongoDB databse____
//1. Creating database url link.. (connection string)
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
//2. establishing mongoDB connection with mongoose
mongoose
  .connect(DB)
  .then((con) => console.log("MongoDB connection successful"))
  .catch((er) => console.log(er));

//3. Starting the server .
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNCAUGHT PROMISE REJECTION->", err);
  server.close(() => {
    process.exit(1);
  });
});
