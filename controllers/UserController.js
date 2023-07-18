const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");

const UserController = {
  async create(req, res, next) {
    try {
      req.body.role = "student"; //añadimos role user por defecto
      req.body.points = 0;
      const password = await bcrypt.hash(req.body.password, 10); //encriptamos contraseña
      const newUser = await User.create({ ...req.body, password });

      res.status(201).send(newUser);
    } catch (error) {
      console.error(error);
      next(error)
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el Usuario" });
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });

      const token = jwt.sign({ _id: user._id }, jwt_secret);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);

      await user.save();

      res.send({ message: "Bienvenid@ " + user.name, token });
    } catch (error) {
      console.error(error);
    }
  },
  /* if (!req.user) {
    return res.status(401).send({ message: "No estás autenticado" });
  } */
  async findUser(req, res) {
    try {
      const user = await User.findById(req.user._id); //Si lleva req.user necesita una autenticación y pasarle el token
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });

      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.error(error);

      res.status(500).send({
        message: "Hubo un problema al intentar desconectar al usuario",
      });
    }
  },
  async addPoints(req, res) {
    try {
      const user = await User.findById(req.user._id); //Si lleva req.user necesita una autenticación y pasarle el token
      req.body.points += 1;
      res.send(user);
      console.log(`user es esto ${user}`)
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = UserController;
