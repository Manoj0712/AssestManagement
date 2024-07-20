import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    assestMaster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssestMaster'
    },
    stockQuanity: {
        type: Number,
        required: true
    },


})
export default mongoose.model("Stock", StockSchema)