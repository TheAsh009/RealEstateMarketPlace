const express = require("express");
const authRoute = express.Router();
const { signUp, signIn } = require("../controllers/auth.controller.js");

authRoute.post("/sign-up", signUp);
authRoute.post("/sign-in", signIn);

module.exports = authRoute;
