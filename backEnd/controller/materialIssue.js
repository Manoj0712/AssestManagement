import express from 'express';
import MaterialIssue from '../model/MaterialIssue.js';
import MaterialIssueItem from '../model/MaterialIssueItem.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    const currentDate = new Date()
    let createdDateString
    if (req.body.entryDate) {
        createdDateString = `${req.body.entryDate} ${currentDate.getHours() > 9 ? currentDate.getHours() : "0" + currentDate.getHours()}:${currentDate.getMinutes() > 9 ? currentDate.getMinutes() : "0" + currentDate.getMinutes()}:${currentDate.getSeconds() > 9 ? currentDate.getSeconds() : "0" + currentDate.getSeconds()}`;
        req.body.entryDate = createdDateString
    }
    const materialIssue = {
        entryDate: req.body.entryDate,
        generalRemarks: req.body.generalRemarks,
        employee: req.body.employee
    }
    const newMaterialIssue = new MaterialIssue(materialIssue)
    try {
        let materialIssueInstance = await newMaterialIssue.save()
        const materialIssueItemList = await Promise.all(req.body.materialIssueItem?.map(async (issueItem) => {
            issueItem.materialIssueId = materialIssueInstance
            const materialIssueItemInstance = new MaterialIssueItem(issueItem)
            try {
                const materialIssueItemIns = await materialIssueItemInstance.save()
                console.log(materialIssueItemIns)
                return materialIssueItemIns
            } catch (error) {

            }
        }))
        materialIssueInstance = materialIssueInstance.toObject()
        materialIssueInstance.materialIssueItem = materialIssueItemList
        console.log(materialIssueInstance)
        res.status(200).json(materialIssueInstance)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/update/:id", async (req, res) => {
    const currentDate = new Date()
    let createdDateString
    if (req.body.entryDate) {
        createdDateString = `${req.body.entryDate} ${currentDate.getHours() > 9 ? currentDate.getHours() : "0" + currentDate.getHours()}:${currentDate.getMinutes() > 9 ? currentDate.getMinutes() : "0" + currentDate.getMinutes()}:${currentDate.getSeconds() > 9 ? currentDate.getSeconds() : "0" + currentDate.getSeconds()}`;
        req.body.entryDate = createdDateString
    }
    try {
        await MaterialIssue.updateOne({ _id: req.params.id }, { $set: req.body })
        let materialIssueInstance = await MaterialIssue.findById(req.params.id)
        const materialItemInstance = await Promise.all(req.body.materialIssueItem?.map(async (matItm) => {
            await MaterialIssueItem.updateOne({ _id: matItm.id }, { $set: matItm })
            const materialItem = await MaterialIssueItem.findById(matItm.id)
            return materialItem
        }))
        materialIssueInstance = materialIssueInstance.toObject()
        materialIssueInstance.materialIssueItem = materialItemInstance
        res.status(200).json(materialIssueInstance)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await MaterialIssueItem.deleteMany({ materialIssueId: id });
        await MaterialIssue.findByIdAndDelete(id);
        res.status(200).send("Document deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting document");
    }
})
router.get("/show/:id", async (req, res) => {
    let materialIssueInstance = await MaterialIssue.findById(req.params.id)
    const materialItemInstance = await MaterialIssueItem.find({ materialIssueId: req.params.id })
    materialIssueInstance = materialIssueInstance.toObject()
    materialIssueInstance.materialIssueItem = materialItemInstance
    res.status(200).json(materialIssueInstance)
})

router.get("/index",async(req, res) => {
    const startDate = new Date('2024-03-03T00:00:00.00');
    const endDate = new Date('2024-03-10T23:59:59.99');
    const materialIssueInstanceList = await MaterialIssue.find({
        // entryDate: {
        //     $gte: startDate, // Greater than or equal to the start date
        //     $lte: endDate    // Less than or equal to the end date
        // },
    })
const materialIssueInstance = await Promise.all(materialIssueInstanceList.map(async(matItm)=>{
let materialIssue
const materialItemInstance = await MaterialIssueItem.find({materialIssueId:matItm.id})
materialIssue = matItm.toObject()
materialIssue.materialIssueItem = materialItemInstance
return materialIssue
}))
res.status(200).json(materialIssueInstance)
})

export default router;