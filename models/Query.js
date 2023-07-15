const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema(
    {
        topic: String,
        question: String,
    },
    {
        timestamps: true,
    }
);

const Query = mongoose.model("Query", QuerySchema);

module.exports = Query;
