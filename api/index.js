const express = require("express");
const api = express();
const dbConnection = require("./config/dbConnection");
//server creation
api.listen(4000, () => {
  console.log("API is running on port 4000");
});

///add body Parser
api.use(express.json());

//dbConnection
dbConnection();
