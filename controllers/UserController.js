const User = require("../models/Usuario");
const bcrypt = require("bcryptjs");

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
  //     async login(req, res) {
  //     try {
  //       const user = await User.findOne({
  //         where: {
  //           email: req.body.email,
  //         },
  //       });
  //       if (!user) {
  //         return res
  //           .status(400)
  //           .send({ message: "Usuario o contraseña incorrectos" });
  //       }
  //       const isMatch = bcrypt.compareSync(req.body.password, user.password);
  //       if (!isMatch) {
  //         return res
  //           .status(400)
  //           .send({ message: "Usuario o contraseña incorrectos" });
  //       }
  //       const token = jwt.sign({ id: user.id }, jwt_secret); //creo el token
  //       await Token.create({ token, UserId: user.id });//guardo el token en BD previamente importado el modelo Token!!!
  //       res.send({ token, message: "Te has conectado con éxito", user });
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).send(error);
  //     }
  //   },
};

module.exports = UserController;
