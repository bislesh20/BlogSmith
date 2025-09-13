const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function createTokenForUser(user) {
  const payload = {
    _id: user.id,
    email: user.email,
    profileImage: user.profileImageURL,
    role: user.role,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
}

module.exports = { createTokenForUser, validateToken };
