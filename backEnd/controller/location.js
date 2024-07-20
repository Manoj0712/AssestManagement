import express from 'express';
import Location from '../model/Location.js'
const router = express.Router();

// router.post("/create",async(req,res)=>{
// const newLocationInstance =new Location(req.body)
// try{
//     const locationInstance = await newLocationInstance.save()
//     res.status(200).json(locationInstance)
// }catch(error){
// res.status(500).json(error)
// }
// })

// router.put("/update/:id",async()=>{
//     try{
// const locationInstance =await Location.updateOne({_id:req.params.id},{$set:req.body})
// res.status(200).json(locationInstance)   
// }catch(error){
//         res.status(500).json(error)
//     }
// })
// router.delete("/delete/:id",async(req,res)=>{
// await Location.findByIdAndDelete(req.params.id);
// res.status(200).send("Document deleted successfully");
// })
router.get("/show/:id",async()=>{
const locationInstance = await Location.findById(req.params.id)
res.status(200).json(locationInstance)
});

router.get("/index",async(req,res)=>{
const locationInstanceList = await Location.find()
res.status(200).json(locationInstanceList)
})

export default router;