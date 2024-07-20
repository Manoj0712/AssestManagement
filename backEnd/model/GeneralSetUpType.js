import mongoose from "mongoose"

const GeneralSetUpTypeSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
    },
})

export default mongoose.model("GeneralSetUpType", GeneralSetUpTypeSchema)