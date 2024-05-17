const bcrypt = require("bcrypt");

const {
  userExists,
  createUser,
  updateUser,
} = require("../../model/auth/user.model.js");

const { giveRandomBalance } = require("../../model/account/account.model.js");

const {
  userSignUpSchema,
  userSignInSchema,
  userUpdateSchema,
} = require("../../services/zodSchemas.js");

const { createJWT } = require("../../services/generateJWT.js");

async function httpUserSignUp(req, res) {
  const checkData = await userSignUpSchema.safeParseAsync(req.body);

  if (!checkData.success) {
    return res.status(400).json({
      err: checkData.error,
    });
  }

  const user = checkData.data;
  if (await userExists(user.email)) {
    return res.status(403).json({
      msg: `User with ${user.email} email already exits try signing in.`,
    });
  }

  try {
    const newUser = await createUser(user);
    await giveRandomBalance(newUser);
    const token = createJWT(newUser);
    return res.status(201).json({
      msg: "user created successfully",
      accessToken: token,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

async function httpUserSignIn(req, res) {
  const checkData = await userSignInSchema.safeParseAsync(req.body);

  if (!checkData.success) {
    return res.status(400).json({
      err: checkData.error,
    });
  }

  const user = checkData.data;
  const foundUser = await userExists(user.email);
  if (!foundUser) {
    return res.status(400).json({
      msg: `User with ${user.email} email does not exitst please sign up`,
    });
  }

  const passCheck = await bcrypt.compare(user.password, foundUser.password);
  if (!passCheck) {
    return res.status(401).json({
      msg: "Invalid password",
    });
  }

  const token = createJWT(foundUser);
  return res.status(200).json({
    accessToken: token,
  });
}

async function httpUpdateInfo(req, res) {
  const email = req.email;

  if (req.body.email) {
    return res.status(400).json({
      msg: `Email of and account cannot be changed.`,
    });
  }

  const checkData = await userUpdateSchema.safeParseAsync(req.body);
  if (!checkData.success) {
    return res.status(400).json({
      err: checkData.error,
    });
  }

  const user = await userExists(email);
  const newUser = Object.assign(user, {
    firstName: req.body.firstName || user.firstName,
    lastName: req.body.lastName || user.lastName,
    email: email,
    password: req.body.password || user.password,
  });

  const updatedUser = await updateUser(newUser);
  return res.status(200).json({
    updatedUser,
  });
}

module.exports = {
  httpUserSignUp,
  httpUserSignIn,
  httpUpdateInfo,
};
