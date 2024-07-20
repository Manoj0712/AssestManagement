import mongoose from "mongoose";

const MaterialIssueSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    entryDate: {
        type: Date,
        required: true
    },
    generalRemarks: {
        type: String
    }
})
export default mongoose.model("MaterialIssue",MaterialIssueSchema)