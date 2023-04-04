const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const { username, id } = user;

  return jwt.sign(
    { username, id },
    process.env.ACCESS_TOKEN_SECRET || "your secret key",
    {
      expiresIn: "15m",
    }
  );
};

const generateRefreshToken = (user) => {
  const { username, id } = user;

  return jwt.sign(
    { username, id },
    process.env.REFRESH_TOKEN_SECRET || "your secret key",
    {
      expiresIn: 604800, // 7 days
    }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
