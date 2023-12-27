const { user, Cards } = require("../models");
const { hash, genSalt, compare } = require("bcrypt");
const jwt = require("jsonwebtoken")

const userSignIn = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const getUser = await user.findOne({ where: { userId }, attributes: ['id', 'name', 'userId', 'password','amount'] })
    const checkPassword = await compare(password, getUser.password);
    if (!checkPassword) throw new Error("password is incorrect");

    delete getUser.dataValues.password;

    const token = await jwt.sign(getUser.dataValues, process.env.USERKEY)

    return res.status(200).send({ status: true, msg: "user login successfully!! ", token: "Bearer" + " " + token, user : getUser})
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, msg: "user login error!!" + error.message })
  }
}

const userSignUp = async (req, res) => {
  try {
    req.body.password = await hash(req.body.password, await genSalt(10));
    await user.create(req.body);

    return res
      .status(200)
      .send({ status: true, msg: "user signup successfully !!" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, msg: "user signup error!! " });
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
  userSignUp,
  getCards,
};