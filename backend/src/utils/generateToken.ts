const jwt = require('jsonwebtoken');

const generateToken = function (id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default generateToken;
