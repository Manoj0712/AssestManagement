import express from 'express';
import Scarp from '../model/Scarp.js';
import dateFillter from './dateFillter.js';
import LineItemList from '../model/LineItemList.js';
const router = express.Router();

router.post("/create", async (req, res) => {
    if (req.body.entryDate) {
        req.body.entryDate = dateFillter(req.body.entryDate)
    }
    const scarpEntry = new Scarp(req.body)
    try {
        const scarpDetail = await scarpEntry.save();
        if (!req.body.lineItem) {
            throw new Error('Please Add Item');
        }
        //lineItemSave(req.body.lineItem,scarp,LineItemList)
        const lineItemList = await Promise.all(req.body.lineItem.map(async (line) => {
            line.scarp = scarpDetail
            const lineItemInstance = new LineItemList(line)
            try {
                const lineItemSave = await lineItemInstance.save()
                return lineItemSave
            } catch (error) {

            }
        }))
        scarpDetail = scarpDetail.toObject()
        scarpDetail.lineItemList = lineItemList
        res.status(200).json(scarpDetail);
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/show/:id', async (req, res) => {
    const scarpInstance = await Scarp.findById(req.params.id)
    const scarpLineItemList = await LineItemList.find({ scarp: req.params.id })
    scarpInstance = scarpInstance.toObject()
    scarpInstance.lineItemList = scarpLineItemList
    res.status(200).json(scarpInstance)
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await LineItemList.deleteMany({ scarp: id });
        await Scarp.findByIdAndDelete(id);
        res.status(200).send("Document deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting document");
    }

})

router.put("/update/:id", async (req, res) => {
    if (req.body.entryDate) {
        req.body.entryDate = dateFillter(req.body.entryDate)
    }
    try {
        await Scarp.updateOne({ _id: req.params.id }, { $set: req.body });
        const scearpInstance = Scarp.findById(req.params.id)
        const scarpLineItemInstance = await Promise.all(req.body.LineItemList.map(async (line) => {
            await LineItemList.updateOne({ _id: line.id }, { $set: line })
            const lineItem = await LineItemList.findById(line.id)
            return lineItem;
        }))
        scearpInstance = scearpInstance.toObject()
        scearpInstance.lineItem = scarpLineItemInstance
        res.status(200).json(scearpInstance)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/index",async (req,res)=>{
const scarpList =await Scarp.find()
const scarpInstance = await Promise.all(scarpList.map(async (scrp)=>{
    let scarpIns 
    const lineItemInstance = await LineItemList.find({scarp:scrp.id})
    scarpIns = scrp.toObject()
    scarpIns.lineItem= lineItemInstance
    return scarpIns
}))
res.status(200).json(scarpInstance)
})

export default router;