const User = require("../models/UserModel.js");
const argon2 = require("argon2");
const Jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");
const v = new Validator();
const { generatePassword } = require("../helper/Generate.js");

// register
const register = async (req, res) => {
  const schema = {
    nik: "string|empty:false|min:16",
    role: "string|empty:false",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const password = generatePassword(6);
  const hashPassword = await argon2.hash(password);

  try {
    const user = await User.create({
      nik: req.body.nik,
      role: req.body.role,
      password: hashPassword,
    });

    const dataUser = {
      nik: user.nik,
      role: user.role,
      password: password,
    };
    res.status(201).json({ msg: "Register Berhasil", data: dataUser });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// login
const login = async (req, res) => {
  const schema = {
    nik: "string|empty:false|min:16",
    password: "string|empty:false|min:6",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const user = await User.findOne({
    where: {
      nik: req.body.nik,
    },
  });

  if (!user) return res.status(404).json({ msg: "wrong nik or password" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "wrong nik or password" });

  const accessToken = Jwt.sign(
    {
      nik: user.nik,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_EXPIRE,
    }
  );

  const userData = {
    id: user.id,
    nik: user.nik,
    role: user.role,
    token: accessToken,
  };
  res.status(200).json({ msg: "login berhasil", data: userData });
};

// me
const me = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = { register, login, me };
