const { addUser, adminSignIn } = require("../controllers/adminController");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const { addUserValidationRules, signInValidationRules } = require("../validations/adminValidationRules");
const adminAuthMiddleware = require('../middlewares/admin/adminAuthMiddleware.js')
const router = require("express").Router();

router.post('/sign-in',
  signInValidationRules,
  handleValidationErrors,
  adminSignIn
)

// router.use(adminAuthMiddleware); 

router.post(
  "/add-user",
  addUserValidationRules,
  handleValidationErrors,
  addUser
);

module.exports = router;
