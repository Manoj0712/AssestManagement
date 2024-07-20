import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true
    },
    storeQuanity:{
        type:Number,
        required:true
    }
})

export default mongoose.model("Store",StoreSchema)
