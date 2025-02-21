const express = require("express");
const app = express();
const authRoute = require("./routes/auth.route.js");
const dbConnection = require("./config/dbConnection");

//server creation
app.listen(4000, () => {
  console.log("API is running on port 4000");
});

//default route
app.get("/", (req, res) => {
  res.send(`<h2>This is default route</h2>`);
});
///add body Parser
app.use(express.json());

//mount the component
app.use("/api/v1/auth", authRoute);

//create middleware for handling the error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
});

//dbConnection
dbConnection();
