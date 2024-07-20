import mongoose from "mongoose";

const MaterialReturnItemSchema = new mongoose.Schema({
    assestMaster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssestMaster'
    },
    materialReturn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MaterialReturn"
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
export default mongoose.model("MaterialReturnItem",MaterialReturnItemSchema)