const Answer = require("../models/Answer");

const AnswerController = {
    async create(req, res) {
        try {
            const { reply, likes } = req.body;

            // Verificar que no falte rellenar ningún campo
            if (!reply || !likes) {
                return res.status(400).send({ message: "Debes completar todos los campos" });
            }

            const answer = await Answer.create(req.body);
            res.status(201).send({ message: "Respuesta creada exitosamente", answer });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha ocurrido un problema al crear la respuesta" });
        }
    },
};

module.exports = AnswerController;
