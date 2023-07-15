const Doubt = require("../models/Doubt");
// const User = require("../models/User");
// const Answer = require("../models/Answer");

const DoubtController = {
    async createDoubt(req, res) {
        try {
            if (!req.user) {
                // return res.status(401).send({ message: "No estás autenticado" });
            }

            const doubt = await Doubt.create(req.body);
            res.status(201).send({ message: "Se ha creado tu duda", doubt });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al crear la duda" });
        }
    },

    async updateDoubt(req, res) {
        // Actualiza la 1era duda que encuentre
        try {
            if (!req.user) {
                return res.status(401).send({ message: "No estás autenticado" });
            }

            const updateData = req.body;
            const updatedDoubt = await Doubt.findOneAndUpdate({}, updateData, { new: true });

            if (!updatedDoubt) {
                return res.status(404).send({ message: "No se encontró ninguna duda para actualizar" });
            }

            res.status(200).send({ message: "Duda actualizada exitosamente", doubt: updatedDoubt });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al actualizar la duda" });
        }
    },

    async updateDoubtById(req, res) {
        //actualiza una duda por id
        try {
            if (!req.user) {
                return res.status(401).send({ message: "No estás autenticado" });
            }

            const { id } = req.params;
            const updatedDoubt = await Doubt.findByIdAndUpdate(id, req.body, { new: true });

            if (!updatedDoubt) {
                return res.status(404).send({ message: "La duda no existe" });
            }

            res.status(200).send({ message: "Duda actualizada exitosamente", doubt: updatedDoubt });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al actualizar la duda" });
        }
    },

    async getAllDoubtsWithUsersAndAnswers(req, res) {
        try {
            if (!req.user) {
                // return res.status(401).send({ message: "No estás autenticado" });
            }

            const doubts = await Doubt.find()
                .populate("user", "-password")
                .populate({
                    path: "answers",
                    populate: {
                        path: "user",
                        select: "-password",
                    },
                });

            res.status(200).send({ doubts });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al obtener las dudas" });
        }
    },

    async updateDoubtByQuestion(req, res) {
        try {
            if (!req.user) {
                return res.status(401).send({ message: "No estás autenticado" });
            }

            const { question } = req.params;
            const updatedDoubt = await Doubt.findOneAndUpdate({ question }, req.body, { new: true });

            if (!updatedDoubt) {
                return res.status(404).send({ message: "La duda no existe" });
            }

            res.status(200).send({ message: "Duda actualizada exitosamente", doubt: updatedDoubt });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al actualizar la duda" });
        }
    },
};

module.exports = DoubtController;
