const Query = require("../models/Query");
const User = require("../models/User");

const QueryController = {
    async createQuery(req, res) {
        try {
            const { topic, question } = req.body;

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
        try {
            if (!req.user) {
                return res.status(401).send({ message: "No estás autenticado" });
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
        try {
            if (!req.user) {
                return res.status(401).send({ message: "No estás autenticado" });
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
                return res.status(401).send({ message: "No estás autenticado" });
            }

            const { topic } = req.params;
            const updatedQuery = await Query.findOneAndUpdate({ topic }, req.body, { new: true });

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
            if (!req.user) {
                return res.status(401).send({ message: "No estás autenticado" });
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

    async getEverything(req, res) {
        try {
            const queries = await Query.find()
                .populate({
                    path: "_idUser",
                    select: "_id name",
                })
                .populate({
                    path: "_idAnswer",
                    select: "_id reply likes",
                    populate: {
                        path: "_idUser",
                        select: "_id name",
                    },
                })
                .select("_id topic question _idAnswer");

            res.status(200).send({ message: "Datos obtenidos exitosamente", queries });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener las dudas y respuestas" });
        }
    },

    async markQueryAsResolved(req, res) {
        try {
            if (!req.user) {
                return res.status(401).send({ message: "No estás autenticado" });
            }

            const { queryId } = req.params;
            const { resolved } = req.body;

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
            if (!req.user) {
                return res.status(401).send({ message: "No estás autenticado" });
            }

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
            if (!req.user) {
                return res.status(401).send({ message: "No estás autenticado" });
            }

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
