const express = require("express");
const authRoute = express.Router();
const { signUp, signIn, google } = require("../controllers/auth.controller.js");

authRoute.post("/sign-up", signUp);
authRoute.post("/sign-in", signIn);
authRoute.post("/google", google);
module.exports = authRoute;
