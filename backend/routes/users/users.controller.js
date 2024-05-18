const { getUsers } = require("../../model/auth/user.model.js");

async function httpFilteredUsers(req, res) {
  const filteringValue = req.query.filter || "";

  try {
    const users = await getUsers(filteringValue);
    const actualUsers = users.filter((user) => {
      return !(user.email == req.email);
    });
    return res.status(200).json({
      users: actualUsers,
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
    });
  }
}

module.exports = {
  httpFilteredUsers,
};
