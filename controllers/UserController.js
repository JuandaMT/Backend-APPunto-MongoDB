const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");
const { Query } = require("mongoose");

const UserController = {
  // async create(req, res, next) {
  //   try {
  //     req.body.role = "student"; //añadimos role user por defecto
  //     req.body.points = 0;
  //     const password = await bcrypt.hash(req.body.password, 10); //encriptamos contraseña
  //     const newUser = await User.create({ ...req.body, password });

  //     res.status(201).send(newUser);
  //   } catch (error) {
  //     console.error(error);
  //     next(error);
  //     res
  //       .status(500)
  //       .send({ message: "Ha habido un problema al crear el Usuario" });
  //   }
  // },

  async confirm(req, res) {
    try {
      const token = req.params.emailToken
      const payload = jwt.verify(token,jwt_secret)
      await User.update({ confirmed: true }, {
        where: {
          email: payload.email
        }
      });
      res.status(201).send("Usuario confirmado exitosamente!");
    } catch (error) {
      console.error(error);
    }
  },
  
  async registerUser(req, res, next) {
   
  
    const emailDomain = email.split('@')[1];
    if (emailDomain !== 'edem.es') {
      return res.status(400).json({ message: 'Only EDEM email addresses are allowed' });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'El usuario ya existe' });
      }
  
      const hashedPassword = await bcrypt.hashSync(password, 10);
      const emailToken = jwt.sign({email:req.body.email},jwt_secret,{expiresIn:'1h'})
      const url = 'http://localhost:3000/users/confirm/'+ emailToken
      await transporter.sendMail({
        to: req.body.email,
        subject: 'Confirm Your Registration',
        html: `<h3>Welcome, you're one step away from registering</h3>
        <a href="${url}">Click to confirm your registration</a>`
      });

      const user = await User.create({
        name,
        lastName,
        email,
        password: hashedPassword,
        punctuation: 0,
        role: 'student'
      });
  
      res.status(201).json({ message: 'User registered successfully', user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error registering user' });
      next(error);
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
      user.points += 1;
      await user.save();
      res.send({ user, points: user.points });
      console.log(`user es esto ${user}`);
    } catch (error) {
      console.error(error);
    }
  },

  async getUserByName(req, res) {
    const UserName = req.params.name;

    try {
      const user = await User.find({ name: UserName });

      if (user.length === 0) {
        return res
          .status(404)
          .send({ message: "No hay ningún usuario con ese nombre" });
      }

      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un error al obtener los usuarios por su nombre",
      });
    }
  },
  // trae al usuario con todas sus dudas

  async userAndQueries(req, res) {
    try {
      const user = await User.findById(req.user._id).populate({
        path: "_idQuery",
      });
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al obtener las dudas" });
    }
  },
};
module.exports = UserController;
