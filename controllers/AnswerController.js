const Answer = require("../models/Answer");

const AnswerController = {
    //crea una respuesta a una duda por id de la duda (ya está hecha la relación)
    async create(req, res) {
        try {
            if (!req.user) {
                return res.status(401).send({ message: "No estás autenticado" });
            }

            const { reply, likes, _idQuery } = req.body;

            // Verificar que no falte rellenar ningún campo
            if (!reply || !likes || !_idQuery) {
                return res.status(400).send({ message: "Debes completar todos los campos" });
            }

            const answer = await Answer.create({ reply, likes, query: _idQuery });

            res.status(201).send({ message: "Respuesta creada exitosamente", answer });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha ocurrido un problema al crear la respuesta" });
        }
    },
};

module.exports = AnswerController;
