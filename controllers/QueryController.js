const Query = require("../models/Query");
const User = require("../models/User");
const Answer = require("../models/Answer");

const QueryController = {
    async createQuery(req, res) {
        try {
            if (!req.user) {
                return res.status(401).send({ message: "No estás autenticado" });
            }

            const { topic, question } = req.body;

            // verifico que no falte rellenar ningún campo
            if (!topic || !question) {
                return res.status(400).send({ message: "Tenés que completar todos los campos" });
            }

            const query = await Query.create({ ...req.body, _idUser: req.user._id });
            await User.findByIdAndUpdate(req.user._id, { $push: { _idQuery: query._id } });
            res.status(201).send({ message: "Se ha creado tu consulta", query });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al crear la consulta" });
        }
    },

    async updateQuery(req, res) {
        // Actualiza la primera que encuentra
        try {
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
        try {
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

    async getAllQueriesPagination(req, res) {
        try {
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

    async getQueriesWithEverything(req, res) {
        try {
            const queries = await Query.find().populate({
                path: "_idUser",
                select: "_id name",
            });

            const queryIds = queries.map((query) => query._id);
            const answers = await Answer.find({ _idQuery: { $in: queryIds } }).populate("_idUser", "_id name");

            const mappedQueries = queries.map((query) => {
                const createdBy = query._idUser ? query._idUser.name : "Desconocido";

                const answer = answers.find((answer) => answer._idQuery.equals(query._id));
                const answeredBy = answer ? answer._idUser.name : "Aún no se respondió esta duda";
                console.log(answer._idUser.name);

                return {
                    _id: query._id,
                    topic: query.topic,
                    question: query.question,
                    createdBy,
                    answeredBy,
                };
            });

            const msg = "Estas son las dudas y las respuestas con los usuarios que las crearon:";

            res.status(200).send({ msg, queries: mappedQueries });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al obtener las dudas" });
        }
    },
    async markQueryAsResolved(req, res) {
        try {
            const { queryId } = req.params;
            const { resolved } = req.body; //debe ser 0 ó 1

            // verifico que se añadió el campo resolved en el body
            if (resolved === undefined) {
                return res.status(400).send({ message: "Falta proporcionar el campo 'resolved'" });
            }

            const query = await Query.findByIdAndUpdate(queryId, { resolved }, { new: true });

            if (!query) {
                return res.status(404).send({ message: "La consulta no existe" });
            }

            res.status(200).send({ message: "La consulta se marcó como resuelta!", query });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al actualizar el estado de la consulta" });
        }
    },

    async markQueryAsUnresolved(req, res) {
        try {
            const { queryId } = req.params;

            const query = await Query.findByIdAndUpdate(queryId, { resolved: false }, { new: true });

            if (!query) {
                return res.status(404).send({ message: "La consulta no existe" });
            }

            res.status(200).send({ message: "OK! La consulta fue marcada como no resuelta", query });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al actualizar el estado de la consulta" });
        }
    },

    async deleteQuery(req, res) {
        try {
            const { queryId } = req.params;

            const deletedQuery = await Query.findByIdAndDelete(queryId);

            if (!deletedQuery) {
                return res.status(404).send({ message: "La consulta no existe" });
            }

            res.status(200).send({ message: "Consulta eliminada exitosamente" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al eliminar la consulta" });
        }
    },
};

module.exports = QueryController;
