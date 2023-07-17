const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema(
    {
        reply: String,
        likes: {
            type: Number,
            default: 0,
        },
        _idQuery: {
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
