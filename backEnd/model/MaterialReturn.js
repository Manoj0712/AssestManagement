import mongoose from "mongoose";

const MaterialReturnSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    entryDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    generalRemarks: {
        type: String
    }
})
export default mongoose.model("MaterialReturn", MaterialReturnSchema)