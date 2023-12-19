const router = require("express").Router();
const {createMatch ,createBet ,createMatchCards, matchHistory} = require("../controllers/andharBharControlller.js");
const handleValidationErrors = require("../middlewares/handleValidationErrors.js");
const userAuthMiddleware = require("../middlewares/user/userAuthMiddleware.js");
const { createBetValdiationRules } = require("../validations/andharBharValidationRules.js");

//routes
router.post("/create-match", createMatch);
router.post("/create-match-cards",createMatchCards);
router.get('/history',matchHistory);

router.use(userAuthMiddleware);
router.post("/create-bet", createBetValdiationRules , handleValidationErrors , createBet);


module.exports = router;