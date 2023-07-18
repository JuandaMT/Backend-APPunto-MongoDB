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
            next(error);
            res.status(500).send({ message: "Ha habido un problema al crear el Usuario" });
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

    async getUserByName(req, res) {
        const UserName = req.params.name;

        try {
            const user = await User.find({ name: UserName });

            if (user.length === 0) {
                return res.status(404).send({ message: "No hay ningún usuario con ese nombre" });
            }

            res.status(200).send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Hubo un error al obtener los usuarios por su nombre" });
        }
    },
};

module.exports = UserController;
