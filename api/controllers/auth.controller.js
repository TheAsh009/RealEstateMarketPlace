const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

exports.authController = async (req, res) => {
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
    console.log(checkUserIsAlreadyExist);

    if (checkUserIsAlreadyExist) {
      return res.status(200).json({
        success: false,
        message: "User already exist can you please Sign In",
      });
    }

    //if User is not already exist then hash the password
    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //create db entry for the User
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(newUser);
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
      message: "Error Occured While Signed Up",
    });
    next(error);
  }
};
