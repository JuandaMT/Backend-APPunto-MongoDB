const Query = require("../models/Query");
const User = require("../models/Usuario");
// const Answer = require("../models/Answer");

const QueryController = {
    async createQuery(req, res) {
        try {
            if (!req.user) {
                // return res.status(401).send({ message: "No estás autenticado" });
            }

            const query = await Query.create(req.body);
            res.status(201).send({ message: "Se ha creado tu duda", query });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al crear la duda" });
        }
    },

    async getAllQuerysWithUsersAndAnswers(req, res) {
        try {
            if (!req.user) {
                // return res.status(401).send({ message: "No estás autenticado" });
            }

            const querys = await Query.find()
                .populate("user", "-password")
                .populate({
                    path: "answers",
                    populate: {
                        path: "user",
                        select: "-password",
                    },
                });

            res.status(200).send({ querys });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al obtener las dudas" });
        }
    },

    async updateQuery(req, res) {
        // Actualiza la 1era duda que encuentre
        try {
            if (!req.user) {
                return res.status(401).send({ message: "No estás autenticado" });
            }

            const updateData = req.body;
            const updatedQuery = await Query.findOneAndUpdate({}, updateData, { new: true });

            if (!updatedQuery) {
                return res.status(404).send({ message: "No se encontró ninguna duda para actualizar" });
            }

            res.status(200).send({ message: "Duda actualizada exitosamente", query: updatedQuery });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al actualizar la duda" });
        }
    },

    async updateQueryById(req, res) {
        //actualiza una duda por id
        try {
            if (!req.user) {
                return res.status(401).send({ message: "No estás autenticado" });
            }

            const { id } = req.params;
            const updatedQuery = await Query.findByIdAndUpdate(id, req.body, { new: true });

            if (!updatedQuery) {
                return res.status(404).send({ message: "La duda no existe" });
            }

            res.status(200).send({ message: "Duda actualizada exitosamente", query: updatedQuery });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al actualizar la duda" });
        }
    },

    async updateQueryByQuestion(req, res) {
        try {
            if (!req.user) {
                return res.status(401).send({ message: "No estás autenticado" });
            }

            const { question } = req.params;
            const updatedQuery = await Query.findOneAndUpdate({ question }, req.body, { new: true });

            if (!updatedQuery) {
                return res.status(404).send({ message: "La duda no existe" });
            }

            res.status(200).send({ message: "Duda actualizada exitosamente", query: updatedDoubt });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al actualizar la duda" });
        }
    },
};

module.exports = QueryController;
