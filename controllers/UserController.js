const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");

const UserController = {
    async userConfirm(req, res) {
        try {
            const token = req.query.emailToken;
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            await User.findOneAndUpdate({ email: payload.email }, { confirmed: true }, { new: true });
            res.status(200).send("Su correo ha sido validado, ya puede hacer login!");
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Hubo un error al confirmar al usuario" });
        }
    },

    async register(req, res, next) {
        const { email, password, name, age } = req.body;
        const emailDomain = email.split("@")[1];
        if (emailDomain !== "edem.es") {
            return res.status(400).json({ message: "No válido. Proporciona un correo de EDEM" });
        }

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: "El usuario ya existe" });
            }

            const hashedPassword = await bcrypt.hashSync(password, 10);
            const emailToken = jwt.sign({ email: email }, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            const url = `http://localhost:3000/users/confirm`;

            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                age,
                points: 0,
                role: "student",
                tokens: [{ token: emailToken.toString() }],
            });

            await transporter.sendMail({
                to: email,
                subject: "Confirmación de usuario registrado",
                html: `<h3>Ya casi estás! Para finalizar confirma tu correo a través del siguiente enlace:</h3>
                <a href="${url}?emailToken=${emailToken}">Click aquí para confirmar tu registro</a>`,
            });

            res.status(201).json({ message: "Usuario registrado  exitosamente!", user, token: emailToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al regitrar al usuario" });
            next(error);
        }
    },

    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            });

            if (!user) {
                return res.status(404).json({ message: "Usuario o contraseña incorrecto!" });
            }

            if (user.confirmed === false) {
                return res.status(409).json({ message: "Usuario no confirmado!" });
            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);

            await user.save();

            res.send({ message: "Bienvenid@ " + user.name, token });
        } catch (error) {
            console.error(error);
        }
    },

    async findUser(req, res) {
        try {
            const user = await User.findById(req.user._id);
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
            const user = await User.findById(req.user._id);
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
                return res.status(404).send({ message: "No hay ningún usuario con ese nombre" });
            }

            res.status(200).send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "Hubo un error al obtener los usuarios por su nombre",
            });
        }
    },

    async userAndQueries(req, res) {
        try {
            const user = await User.findById(req.user._id).populate({
                path: "_idQuery",
            });
            res.status(200).send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al obtener las dudas" });
        }
    },
};
module.exports = UserController;
