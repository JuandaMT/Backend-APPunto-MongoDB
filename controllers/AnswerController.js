const Answer = require("../models/Answer");
const Query = require("../models/Query");

const AnswerController = {
    async create(req, res) {
        try {
            const { reply, likes, _idQuery } = req.body;

            if (!reply || !likes || !_idQuery) {
                return res.status(400).send({ message: "Debes completar todos los campos" });
            }

            const answer = await Answer.create({ reply, likes, _idQuery, _idUser: req.user._id });
            await Query.findByIdAndUpdate(_idQuery, { $push: { _idAnswer: answer._id } });
            res.status(201).send({ message: "Respuesta creada exitosamente", answer });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha ocurrido un problema al crear la respuesta" });
        }
    },

    async getAllAnswers(req, res) {
        try {
            const answers = await Answer.find();

            res.status(200).send({ message: "Estás viendo todas las respuestas", answers });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Hubo un problema al obtener las respuestas" });
        }
    },

    async updateAnswer(req, res) {
        try {
            const updatedAnswer = await Answer.findOneAndUpdate({}, req.body, { new: true });

            if (!updatedAnswer) {
                return res.status(404).send({ message: "No se encontró ninguna respuesta para actualizar" });
            }

            res.status(200).send({ message: "Respuesta actualizada exitosamente", answer: updatedAnswer });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Hubo un problema al actualizar la respuesta" });
        }
    },

    async deleteAnswer(req, res) {
        try {
            if (!req.user) {
                return res.status(401).send({ message: "No estás autenticado" });
            }

            const { answerId } = req.params;

            const deletedAnswer = await Answer.findByIdAndDelete(answerId);

            if (!deletedAnswer) {
                return res.status(404).send({ message: "La respuesta que buscas no existe" });
            }

            res.status(200).send({ message: "Respuesta eliminada exitosamente" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Hubo un problema al eliminar la respuesta" });
        }
    },
};

module.exports = AnswerController;
