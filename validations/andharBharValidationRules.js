const { body } = require("express-validator");
const {user} = require('../models')
const createBetValdiationRules = [
  body("amount").isInt().withMessage("amount must be integer").custom(async(amount,{req})=>{
    const findUser = await user.findOne({where:{id:req.user.id},attributes:['amount']});
    if (findUser.amount >= amount) return true;
     throw new Error("insufficient amount");
  }),
  body("type").isIn([0, 1]).withMessage("bet type must be andar or bahar"),
];

module.exports = { createBetValdiationRules };
