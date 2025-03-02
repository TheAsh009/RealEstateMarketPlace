const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        messge: "Token is missing",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ success: false, messsage: err.message });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.log("Error Occured in the VerifyToken Controller", error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
