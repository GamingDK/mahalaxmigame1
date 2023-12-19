const { body } = require("express-validator");
const { user } = require("../models/index.js");

const signInValidationRules = [
  body("userId")
    .notEmpty()
    .withMessage("userId is required")
    .toLowerCase()
    .custom(async (userId) => {
      const userIdRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
      if (!userIdRegex.test(userId))
        throw new Error("user id must be start with letters");
      const checkUserId = await user.count({ where: { userId } });
      if (checkUserId !== 1)
        throw new Error("userId already used try any other Id ");
      return true;
    }),
  body("password")
    .isStrongPassword()
    .withMessage(
      "password must have capital small letters, number and special character"
    ),
];

module.exports = {
  signInValidationRules,
};
