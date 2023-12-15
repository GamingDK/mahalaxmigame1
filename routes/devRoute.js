const { hash, genSalt } = require("bcrypt");
const { admin } = require("../models");

const router = require("express").Router();

router.post("/admin-signUp", async (req, res) => {
  try {
    const checkUserEmail = await admin.count({ where: { email: req.body.email } });
    if (checkUserEmail >= 1) throw new Error('email already used');

    req.body.password = await hash(req.body.password, await genSalt(10));
    await admin.create(req.body);
    return res.status(200).send({ status: true, msg: "admin signup success" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, msg: "admin signup error" + " " + error.message });
  }
});

module.exports = router;
