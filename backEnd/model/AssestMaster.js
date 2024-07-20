import mongoose from "mongoose"
const AssestMasterSchema = new mongoose.Schema({
    assestName: {
        type: String,
        required: true
    },
    assestCatagory: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    make: {
        type: String,
    },
    uom: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    departMent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GeneralSetUp'
    },
    model: {
        type: String,
        required: true
    },
    assestImage: {
        type: String,
        required: true
    },
    active: {
        type: Boolean
    },
})

export default mongoose.model("AssestMaster", AssestMasterSchema)