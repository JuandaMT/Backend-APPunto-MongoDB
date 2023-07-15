const Query = require("../models/Query");
const User = require("../models/Usuario");
// const Answer = require("../models/Answer");

const QueryController = {
    async createQuery(req, res) {
        try {
            if (!req.user) {
                // return res.status(401).send({ message: "No estás autenticado" });
            }

            const { topic, question } = req.body;

            // Verificar que los campos estén presentes
            if (!topic || !question) {
                return res.status(400).send({ message: "Tenés que completar todos los campos" });
            }

            const query = await Query.create(req.body);
            res.status(201).send({ message: "Se ha creado tu consulta", query });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al crear la consulta" });
        }
    },

    async updateQuery(req, res) {
        // Actualiza la primera que encuentra
        try {
            if (!req.user) {
                // return res.status(401).send({ message: "No estás autenticado" });
            }

            const updatedQuery = await Query.findOneAndUpdate({}, req.body, { new: true });

            if (!updatedQuery) {
                return res.status(404).send({ message: "No se encontró ninguna consulta para actualizar" });
            }

            res.status(200).send({ message: "Consulta actualizada exitosamente", query: updatedQuery });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al actualizar la consulta" });
        }
    },

    async updateQueryById(req, res) {
        //por _id
        try {
            if (!req.user) {
                // return res.status(401).send({ message: "No estás autenticado" });
            }

            const { _id } = req.params;
            const updatedQuery = await Query.findByIdAndUpdate(_id, req.body, { new: true });

            if (!updatedQuery) {
                return res.status(404).send({ message: "La consulta no existe" });
            }

            res.status(200).send({ message: "Consulta actualizada exitosamente", query: updatedQuery });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al actualizar la consulta" });
        }
    },

    async updateQueryByTopic(req, res) {
        try {
            if (!req.user) {
                // return res.status(401).send({ message: "No estás autenticado" });
            }

            const { topic } = req.params;
            const updatedQuery = await Query.findOneAndUpdate({ topic }, req.body, { new: true });
            console.log(updatedQuery);

            if (!updatedQuery) {
                return res.status(404).send({ message: "No se encontró ninguna consulta con ese tema" });
            }

            res.status(200).send({ message: "Consulta actualizada exitosamente", query: updatedQuery });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al actualizar la consulta" });
        }
    },

    async getAllQueries(req, res) {
        try {
            if (!req.user) {
                // return res.status(401).send({ message: "No estás autenticado" });
            }

            const page = parseInt(req.query.page) || 1;
            const limit = 2;
            const skip = (page - 1) * limit;

            const queries = await Query.find().limit(limit).skip(skip);

            res.status(200).send({ message: "Estás viendo las dudas con paginación de 2 en 2", queries });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al obtener las consultas" });
        }
    },

    async getAllQueriesWithUsersAndAnswers(req, res) {
        // trae todas las dudas con usuarios y respuestas
        try {
            if (!req.user) {
                // return res.status(401).send({ message: "No estás autenticado" });
            }

            const queries = await Query.find()
                .populate("user", "-password")
                .populate({
                    path: "answers",
                    populate: {
                        path: "user",
                        select: "-password",
                    },
                });

            res.status(200).send({ queries });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al obtener las consultas" });
        }
    },
};

module.exports = QueryController;
