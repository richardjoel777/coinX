import mongoose from "mongoose";

const MarketData = new mongoose.Schema(
    {
        rate: {
            type: Number,
            required: true,
        },
        volume: {
            type: Number,
            required: true,
        },
        cap: {
            type: Number,
            required: true,
        },
        metadata: {
            code: {
                type: String,
                required: true,
            },
            currency: {
                type: String,
                required: true,
            }
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timeseries: {
            timeField: "created_at",
            metaField: "metadata",
        },
    }
);

export default mongoose.models.MarketData || mongoose.model("MarketData", MarketData);