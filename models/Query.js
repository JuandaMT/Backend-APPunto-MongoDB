const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuerySchema = new Schema(
    {
        topic: String,
        question: String,
        resolved: Boolean,
        _idAnswer: {
            type: Schema.Types.ObjectId,
            ref: "Answer",
        },

    },
    {
        timestamps: true,
    }
);

const Query = mongoose.model("Query", QuerySchema);

module.exports = Query;
