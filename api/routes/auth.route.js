const express = require("express");
const authRoute = express.Router();
const { authController } = require("../controllers/auth.controller.js");

authRoute.post("/sign-up", authController);

module.exports = authRoute;
