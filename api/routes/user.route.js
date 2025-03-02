const express = require("express");
const userRoute = express.Router();
const { updateUserInfo } = require("../controllers/user.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

userRoute.post("/update/:id", verifyToken, updateUserInfo);
module.exports = userRoute;
