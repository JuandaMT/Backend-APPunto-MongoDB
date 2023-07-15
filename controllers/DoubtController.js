const Doubt = require("../models/Doubt");

const DoubtController = {
    async createDoubt(req, res) {
        try {
            if (!req.user) {
                return res.status(401).send({ message: "No estás autenticado" });
            }

            const doubt = await Doubt.create(req.body);
            res.status(201).send({ message: "Se ha creado tu duda", doubt });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al crear la duda" });
        }
    },

    async updateDoubt(req, res) {
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
};

module.exports = DoubtController;
