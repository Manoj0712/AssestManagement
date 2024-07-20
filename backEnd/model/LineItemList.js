import mongoose from "mongoose";

const LineItemListSchema = new mongoose.Schema({
    assestMaster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssestMaster'
    },
    scarp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Scarp"
    },
    quanity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    remark: {
        type: String
    }
})

export default mongoose.model("LineItemList", LineItemListSchema)