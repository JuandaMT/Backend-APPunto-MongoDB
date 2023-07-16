const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
    {
        reply: String,
        likes: String,
        query: {
            type: Schema.Types.ObjectId,
            ref: "Query",
        },
    },
    {
        timestamps: true,
    }
);

const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;
