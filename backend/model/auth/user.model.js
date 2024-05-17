const bcrypt = require("bcrypt");
const User = require("./user.mongo.js");

async function userExists(email) {
  try {
    const foundUser = await User.findOne({
      email: email,
    });

    return foundUser;
  } catch (err) {
    return err.message;
  }
}

async function createUser(user) {
  const hash = await bcrypt.hash(user.password, 10);

  try {
    const newUser = await User.create({
      firstName: user.firstName.toLowerCase(),
      lastName: user.lastName.toLowerCase(),
      email: user.email,
      password: hash,
    });
    return newUser;
  } catch (err) {
    return err.message;
  }
}

async function updateUser(user) {
  const hash = await bcrypt.hash(user.password, 10);

  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        email: user.email,
      },
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hash,
      },
      { new: true },
    );
    return updatedUser;
  } catch (err) {
    return err.message;
  }
}

async function getUsers(filter) {
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  return users;
}
module.exports = {
  userExists,
  createUser,
  updateUser,
  getUsers,
};
