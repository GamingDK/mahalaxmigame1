const { body } = require("express-validator");
const { user, admin } = require("../models");

const signInValidationRules = [
  body('email').isEmail().withMessage('Invalid Email')
    .custom(async (email) => {
      const checkAdmin = await admin.count({ where: { email } })
      if (checkAdmin != 1) throw new Error('admin is not Exist')
      return true
    }),
  body('password').isStrongPassword().withMessage('inValidPassword')
];

const addUserValidationRules = [
  body("name").notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be in string"),
  body("email")
    .isEmail()
    .withMessage("inValid email address")
    .custom(async (email) => {
      const checkUserEmail = await user.count({ where: { email } });
      if (checkUserEmail >= 1) throw new Error('email already used')
      return true
    }),
  body("password")
    .isStrongPassword()
    .withMessage(
      "password must have capital small letters, number and special character"
    ),
  body("cPassword")
    .isStrongPassword()
    .withMessage(
      "Confirm password must be have capital small letters, number and special character"
    )
    .custom((cPassword, { req }) => {
      if (req.body.password === cPassword) return true;
      throw new Error("confirm password must be same as password");
    }),

  body("userId")
    .notEmpty()
    .withMessage("userId is required")
    .toLowerCase()
    .custom(async (userId) => {
      const userIdRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
      if (!userIdRegex.test(userId))
        throw new Error("user id must be start with letters");
      const checkUserId = await user.count({ where: { userId } });
      if (checkUserId >= 1)
        throw new Error("userId already usedtry an other Id ");
      return true;
    }),
  body("amount").isInt().withMessage("amount must be integer"),
];

module.exports = {
  signInValidationRules,
  addUserValidationRules,
};
