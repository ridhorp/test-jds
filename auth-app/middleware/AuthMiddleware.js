const Jwt = require("jsonwebtoken");
const User = require("../models/UserModel.js");
module.exports = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ msg: "unauthenticated" });

  try {
    const decoded = await Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findOne({
      attributes: ["id", "nik", "role"],
      where: {
        nik: decoded.nik,
      },
    });
    if (!user) return res.status(401).json({ msg: "unauthenticated" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: err.message });
  }
};
