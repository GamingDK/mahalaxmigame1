const { hash, genSalt, compare } = require("bcrypt");
const {user} = require("../models");
const jwt = require("jsonwebtoken");

const adminSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const getAdmin = await user.findOne({ where: { email }, attributes: ['id', 'name', 'email', 'password'] })
    const checkPassword = await compare(password, getAdmin.password);
    if (!checkPassword) throw new Error("password is incorrect");

    delete getAdmin.dataValues.password;

    const token = await jwt.sign(getAdmin.dataValues, process.env.ADMINKEY)

    return res.status(200).send({ status: false, msg: "user login successfully!! ", token: "Bearer" + " " + token })
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, msg: "user login error!!" + error.message })
  }
}

const addUser = async (req, res) => {
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
};

module.exports = { addUser, adminSignIn };
