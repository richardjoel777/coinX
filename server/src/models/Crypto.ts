import mongoose from "mongoose";

const Crypto = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    alltimeHighUSD: {
        type: Number,
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
});

export default mongoose.models.Crypto || mongoose.model("Crypto", Crypto);