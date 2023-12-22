const { user, Cards } = require("../models");
const { compare } = require('bcrypt')
const jwt = require("jsonwebtoken")

const userSignIn = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const getUser = await user.findOne({ where: { userId }, attributes: ['id', 'name', 'userId', 'password'] })
    const checkPassword = await compare(password, getUser.password);
    if (!checkPassword) throw new Error("password is incorrect");

    delete getUser.dataValues.password;

    const token = await jwt.sign(getUser.dataValues, process.env.USERKEY)

    return res.status(200).send({ status: true, msg: "user login successfully!! ", token: "Bearer" + " " + token })
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, msg: "user login error!!" + error.message })
  }
}

const getCards = async (req, res) => {
  try {
    const cards = await Cards.findAll({ attributes: ['name', 'img', 'id'] });

    return res
      .status(200)
      .send({ status: true, msg: "get cards successfully !!", cards });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, msg: "get cards error!! " });
  }
};

module.exports = {
  userSignIn,
  getCards,
};