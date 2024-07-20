import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
    storeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'  
    },
    assestMaster:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssestMaster'
    },
    quanity:{
        type:String,
        required:true
    }
})

export default mongoose.model("Location", LocationSchema)