import mongoose from "mongoose"

const GeneralSetUpSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
    },
    priority: {
        type: Number,
    },
    generalSetUpType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GeneralSetUpType'
    },
    active: {
        type: Boolean,
    }
})

export default mongoose.model("GeneralSetUp", GeneralSetUpSchema)