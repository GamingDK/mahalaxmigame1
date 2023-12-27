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
    const {name,  mobile, email, password } = req.body;
    
    // Check if the user with the given mobile number already exists
    const existingUser = await user.findOne({ where: { mobile } });


    if (existingUser) {
      return res.status(500).send({ status: false, msg: "User already registered" });
    }
    const hashPass = await hash(password, await genSalt(10));
    const num = Math.floor(Math.random() * 900) + 100;

    const userId = name + "@"+num;
    // Create a new user
    const newUser = await user.create({
      name,
      mobile,
      email,
      password:hashPass,
      userId,
      // Add other necessary fields here
    });

    return res.status(200).send({ status: true, msg: "User registered successfully", data: newUser });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ status: false, msg: "User registration error: " + error.message });
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