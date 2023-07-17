const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");

const UserController = {
  async create(req, res) {
    try {
      req.body.role = "user"; //añadimos role user por defecto
      const password = await bcrypt.hash(req.body.password, 10); //encriptamos contraseña
      const newUser = await User.create({ ...req.body, password });

      res.status(201).send(newUser);
    } catch (error) {
      console.error(error);

      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el Usuario" });
    }
  },
  /* ME ESTÁ DANDO PROBLEMAS, DETECTA _id COMO NULL */
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
};

module.exports = UserController;
