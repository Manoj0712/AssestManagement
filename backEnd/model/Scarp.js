import mongoose from "mongoose"
// import LineItemList from "./LineItemList.js";

const ScarpSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    generalSetUp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GeneralSetUp'
    },
    entryDate: {
        type: Date,
        required: true
    },
    remark:{
        type:String
    }
})

export default mongoose.model("Scarp", ScarpSchema)