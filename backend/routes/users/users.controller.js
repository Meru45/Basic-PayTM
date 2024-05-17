const { getUsers } = require("../../model/auth/user.model.js");

async function httpFilteredUsers(req, res) {
  const filteringValue = req.query.filter || "";

  try {
    const users = await getUsers(filteringValue);
    return res.status(200).json({
      users,
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
