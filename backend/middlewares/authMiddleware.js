const { verifyJWT } = require("../services/generateJWT.js");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) {
    return res.status(403).json({
      err: "Unauthorized",
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      err: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  const { success, decoded, err } = verifyJWT(token);

  if (!success) {
    return res.status(403).json({
      err: `Unauthorized ${err.message}`,
    });
  } else {
    req.email = decoded.data.email;
    req.id = decoded.data.id;
    next();
  }
}

module.exports = authMiddleware;
