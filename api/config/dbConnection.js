const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(
      "mongodb+srv://ashitoshpatil27:hrjKiTBU7OtpxhrL@cluster0.tmeig.mongodb.net/RealEstateMarketPlace"
    )
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
