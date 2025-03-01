const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUp = async (req, res) => {
  try {
    //getting the data from req body
    const { username, email, password } = req.body;

    console.log(username, email, password);

    //validate  the input data
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill All the Fields",
      });
    }

    //check the user is already exist
    const checkUserIsAlreadyExist = await User.findOne({ email });
    console.log("Check that user is already exist", checkUserIsAlreadyExist);

    if (checkUserIsAlreadyExist) {
      return res.status(200).json({
        success: false,
        message: "User already exist can you please Sign In",
      });
    }

    //if User is not already exist then hash the password
    let hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hash Password", hashedPassword);

    //create db entry for the User
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log("newUser", newUser);
    //return successful signedup response
    return res.status(200).json({
      success: true,
      message: "User SignedUp Successfully",
    });
  } catch (error) {
    //error occured
    console.log("Error Occured in the Auth Controller");
    res.status(400).json({
      success: false,
      message: error.message,
    });
    // next(error);
  }
};

//signIn
exports.signIn = async (req, res) => {
  try {
    //get the data from the req body
    const { email, password } = req.body;

    console.log("Input from the user", email, password);
    //validate the inputed data
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill All the Fields",
      });
    }

    //check that the user is signed up
    const checkUserIsSignedUp = await User.findOne({ email });
    console.log("Check the user is signed up", checkUserIsSignedUp);

    //if user is not signed Up
    if (!checkUserIsSignedUp) {
      return res.status(401).json({
        success: false,
        message: "User is not Signed Up Please Signed Up first",
      });
    }

    const payload = {
      id: checkUserIsSignedUp._id,
      email: checkUserIsSignedUp.email,
    };

    //is use is available then check the password
    if (await bcrypt.compare(password, checkUserIsSignedUp.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      checkUserIsSignedUp.token = token;

      checkUserIsSignedUp.password = undefined;

      return res
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json({
          success: true,
          message: "User Logged In Succesfully",
          checkUserIsSignedUp,
          token,
        });
    } else {
      console.log("Incorrect Password");
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    console.log("Error Occured in the Sign In Controller");
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

///
exports.google = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1hr",
      });
      const { password: pass, ...rest } = user._doc;
      // user._doc.password = undefined;
      res
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      // Math.random().toString(36).slice(-8);

      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      const newUser = new User({
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1hr",
      });
      const { password: pass, ...rest } = newUser._doc;
      // newUser._doc.password = undefined;
      return res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.log("Error Occured in google controller", error.message);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
