import mongoose from "mongoose"
const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    employeeEmail: {
        type: String,
        required: true
    },
    employeeImage: {
        type: String,
        // required: true
    },
    departMent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GeneralSetUp'
    },
    joinDate: {
        type: Date   
    },
    active: {
        type: Boolean,
    },
})

export default mongoose.model("Employee", EmployeeSchema)