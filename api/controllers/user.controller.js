const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");

exports.updateUserInfo = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({
      success: false,
      message: "You Can only update your own account",
    });
  }

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    return res.status(200).json(rest);
  } catch (error) {
    console.log("Error Occured in the Updateuser Controller", error.message);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
