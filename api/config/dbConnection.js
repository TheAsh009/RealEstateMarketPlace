const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Database Connection Successful");
    })
    .catch((error) => {
      console.log(`DB Connection Failed`);
      console.log(`${error} occured`);
      process.exit(1);
    });
};

module.exports = connectDb;
