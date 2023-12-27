const router = require("express").Router();
//models
const { Cards } = require("../models");
//validations
const {
  signInValidationRules,
} = require("../validations/userValidationRules.js");
//handleValidation Error MiddleWare
const handleValidationErrors = require("../middlewares/handleValidationErrors.js");
//controllers
const { userSignIn, userSignUp, getCards } = require("../controllers/userController.js");

//test route - remove this route
router.post("/addcards", async (req, res) => {
  const cards = await Cards.bulkCreate(req.body.addCards);
  res.send(cards);
});


// sign-up route
router.post("/signUp", userSignUp);

//main routes
router.post(
  "/signin",
  // signInValidationRules,
  // handleValidationErrors,
  userSignIn
);



router.get("/get-cards", getCards);

module.exports = router;
