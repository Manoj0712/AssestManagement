import express from 'express';
import dateFillter from './dateFillter.js';
import MaterialReturn from '../model/MaterialReturn.js';
import MaterialReturnItem from "../model/MaterialReturnItem.js"

const router = express.Router();

router.post("/create", async (req, res) => {
    if (req.body.entryDate) {
        req.body.entryDate = dateFillter(req.body.entryDate)
    }
    const newMaterialReturn = new MaterialReturn(req.body)
    
        const materialReturnInstance = await newMaterialReturn.save()
        const materialRteurnItemInstance = await Promise.all(req.body.materialReturnItem.map(async (returnItem) => {
            returnItem.MaterialReturn = materialReturnInstance
            const newMaterialReturnItem = new MaterialReturnItem(returnItem)
            try {
                const materialReturnItemInstance = await newMaterialReturnItem.save()
                return materialReturnItemInstance;
            } catch (error) {
            }
        }))
        materialReturnInstance = materialReturnInstance.toObject()
        materialReturnInstance.materialReturnItemInstance =materialRteurnItemInstance
        res.status(200).json(materialReturnInstance)
    })

router.put("/update/:id",async(req,res)=>{
    if (req.body.entryDate) {
        req.body.entryDate = dateFillter(req.body.entryDate)
    }
    await MaterialReturn.updateOne({_id:req.params.id},{$set:req.body}) 
    let materialReturnInstance = await MaterialReturn.findById(req.params.id)
    const materialReturnItemInstance = await Promise.all(req.body.materialReturnItem.map(async (returnItem)=>{
await MaterialReturnItem.updateOne({_id:returnItem.id},{$set:returnItem})
const materialReturnItemInstance = MaterialReturnItem.findById(returnItem.id)
return materialReturnItemInstance
    }))
    materialReturnInstance = materialReturnInstance.toObject()
    materialIssueInstance.materialReturnItem = materialReturnItemInstance
    res.status(200).json(materialReturnInstance)
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await MaterialReturnItem.deleteMany({ materialReturn: id });
        await MaterialReturn.findByIdAndDelete(id);
        res.status(200).send("Document deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting document");
    }
})

router.get("/show/:id", async (req, res) => {
    let materialReturnInstance = await MaterialReturn.findById(req.params.id)
    const materialReturnItemInstance = await MaterialReturnItem.find({ materialReturn: req.params.id })
    materialReturnInstance = materialReturnInstance.toObject()
    materialReturnInstance.materialIssueItem = materialReturnItemInstance
    res.status(200).json(materialReturnInstance)
})

router.get("/index",async(req, res) => {
    // const startDate = new Date('2024-03-03T00:00:00.00');
    // const endDate = new Date('2024-03-10T23:59:59.99');
    const materialReturnInstanceList = await MaterialReturn.find({
        // entryDate: {
        //     $gte: startDate, // Greater than or equal to the start date
        //     $lte: endDate    // Less than or equal to the end date
        // },
    })
const materialReturnInstance = await Promise.all(materialReturnInstanceList.map(async(matItm)=>{
let materialReturn
const materialReturnItemInstance = await MaterialReturnItem.find({materialReturn:matItm.id})
materialReturn = matItm.toObject()
materialReturn.materialIssueItem = materialReturnItemInstance
return materialReturn
}))
res.status(200).json(materialReturnInstance)
})   

export default router;