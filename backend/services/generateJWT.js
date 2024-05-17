const jwt = require("jsonwebtoken");
require("dotenv").config();

function createJWT(newUser) {
  try {
    const token = jwt.sign(
      {
        data: {
          email: newUser.email,
          id: newUser._id,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      },
    );
    return token;
  } catch (err) {
    return err;
  }
}

function verifyJWT(token) {
  let result = {
    success: false,
    decoded: "",
    err: {},
  };
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (!err) {
        result.success = true;
        result.decoded = decoded;
      } else {
        (result.success = false), (result.err = err);
      }
    });
  } catch (err) {
    return err;
  }

  return result;
}

module.exports = {
  createJWT,
  verifyJWT,
};
