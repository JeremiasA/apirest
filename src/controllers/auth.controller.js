const Users = require("../models/usersModel");
const Roles = require("../models/rolesModel");

const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  //check username
  const foundUser = await Users.findOne({ username: req.body.username });

  if (!foundUser) return res.status(404).json({ message: "Usuario inexistente" });

  //check pass
  const foundPass = await Users.desencryptPass(req.body.password,foundUser.password);
  if (!foundPass) return res.status(403).json({ message: "Contraseña incorrecta" });

  // token creation
  const JWTKey = require("../config").JWTKey;

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: { id: foundUser._id },
    },
    JWTKey
  );
  return res.status(200).json({token})
};

const register = async (req, res) => {
  const newUser = new Users({
    username: req.body.username,
    email: req.body.email,
  });

  //username comprobation
  let error = null;
  const foundUsername = await Users.findOne({
    username: req.body.username,
  }).catch((err) => {
    error = err;
  });
  if (error)
    return res
      .status(500)
      .json({ message: "Error al consultar en la base de datos" });
  else {
    if (foundUsername) return res.json({ message: "El usuario ya existe" });
  }

  //mail comprobation
  const foundEmail = await Users.findOne({ email: req.body.email }).catch(
    (err) => {
      error = err;
    }
  );
  if (error)
    return res
      .status(500)
      .json({ message: "Error al consultar en la base de datos" });
  else {
    if (foundEmail) return res.json({ message: "El email ya está registrado" });
  }

  //assign user role
  const role = await Roles.findOne({ name: "user" }); // default user
  newUser.roles = [role._id];

  //pass encrypt
  newUser.password = await Users.encryptPass(req.body.password);

  //save
  const saved_user = await newUser.save();

  // token creation

  const JWTKey = require("../config").JWTKey;

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60, //1 hora
      data: { id: saved_user._id },
    },
    JWTKey
  );

  res.status(200).json({ token: token, user: newUser });
};

module.exports = { login, register };
