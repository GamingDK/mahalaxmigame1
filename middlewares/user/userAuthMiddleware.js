const jwt = require("jsonwebtoken");

const userAuthMiddleware = async (req, res, next) => {
  try {
    const BearerToken = req.headers.authorization;

    if (BearerToken && BearerToken.startsWith("Bearer")) {
      let token = req.headers.authorization.split(" ")[1];
      if (!token) throw new Error("token not exist");
      const userData = await jwt.verify(token, process.env.USERKEY);
      if (!userData) throw new Error("verification failed");
      req.user = userData;
      next();
    } else throw Error(" ");
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ status: false, msg: "invalid token!!" + " " + error.message });
  }
};

module.exports = userAuthMiddleware;
