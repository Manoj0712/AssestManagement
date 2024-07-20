import express from 'express';
import AssestMaster from '../model/AssestMaster.js';
import fs from 'fs';

const router = express.Router();

router.post("/create", async (req, res) => {
    const alreadyExits = await AssestMaster.findOne({ assestName: req.body.assestName });
    if (alreadyExits) {
        res.status(500).json("Already in the database,so try another unique name.")
    } else {
        if (req.body.assestImage) {
            const imageData = fs.readFileSync(req.body.assestImage);
            const base64ImageData = imageData.toString('base64');
            req.body.assestImage = base64ImageData;
        }
        const saveAssest = new AssestMaster(req.body);
        try {
            const savedAssestMaster = await saveAssest.save()
            res.status(200).json(savedAssestMaster)
        } catch (err) {
            res.status(500).json(err)
        }
    }
})

router.put("/update/:id", async (req, res) => {
    const id = req.params.id
    if (req.body.assestImage) {
        const imageData = fs.readFileSync(req.body.assestImage);
        const base64ImageData = imageData.toString('base64');
        req.body.assestImage = base64ImageData;
    }
    try {
        await AssestMaster.findByIdAndUpdate(id, { $set: req.body })
        const assestmasterInstance = await AssestMaster.findOne({ _id: id })
        const department = await assestmasterInstance.populate("departMent").then((dept) => { return dept.departMent })
        assestmasterInstance.departMent = department
        res.status(200).json(assestmasterInstance)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/show/:id', async (req, res) => {
    try {
        const assestMasterInstance = await AssestMaster.findById(req.params.id)
        const department = assestMasterInstance.populate("departMent").then((dept) => { return dept.departMent })
        assestMasterInstance.departMent = department
        res.status(200).json(assestMasterInstance)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/delete/:id",async (req,res)=>{
    try {
        await AssestMaster.findByIdAndDelete(req.params.id)
        res.status(200).json("Employee has been Deleted.")
    } catch (err) {
        res.status(500).json(err)
    } 
})

router.get("/index",async (req,res)=>{
    try {
        const assestMasterInstance = await AssestMaster.find()
        console.log(assestMasterInstance.length)
        res.status(200).json(assestMasterInstance)
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router;