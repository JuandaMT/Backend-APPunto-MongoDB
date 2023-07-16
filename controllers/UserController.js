const User = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");

const UserController = {
  async create(req, res) {
    try {
      req.body.role = "user"; //añadimos role user por defecto
      const password = await bcrypt.hash(req.body.password, 10); //encriptamos contraseña
      const User = await User.create({ ...req.body, password });

      res.status(201).send(User);
    } catch (error) {
      console.error(error);

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
};

module.exports = UserController;
