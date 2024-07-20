import express from 'express';
import GeneralSetUpType from '../model/GeneralSetUpType.js';
import GeneralSetUp from '../model/GeneralSetUp.js'
const router = express.Router();
router.post('/create', async (req, res) => {
    const geneatSetupExits = await GeneralSetUpType.findOne({ description: req.body.description })
    if (!geneatSetupExits) {
        const currentDate = new Date()
        const createdDateString = `${req.body.createdDate} ${currentDate.getHours()>9?currentDate.getHours():"0"+currentDate.getHours()}:${currentDate.getMinutes()>9?currentDate.getMinutes():"0"+currentDate.getMinutes()}:${currentDate.getSeconds()>9?currentDate.getSeconds():"0"+currentDate.getSeconds()}`;
        const generalSetUpType = {
            description: req.body.description,
            createdDate: new Date(createdDateString),
            active: req.body.active
        }
        const newGeneralSetUpType = new GeneralSetUpType(generalSetUpType)
        try {
            const saveGeneralSetUpType = await newGeneralSetUpType.save()
            if (!req.body.generalSetUp) {
                throw new Error('Please add decription');
            }
            if (req.body.generalSetUp) {
                req.body.generalSetUp.map(async (general) => {
                    general.generalSetUpType = saveGeneralSetUpType
                    const newGeneralSetUp = new GeneralSetUp(general)
                    try {
                        await newGeneralSetUp.save()
                    } catch (err) {

                    }
                })
            }
            res.status(200).json(saveGeneralSetUpType)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(200).send("You have already add the description.So add another unique name.")
    }
})
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await GeneralSetUp.deleteMany({ generalSetUpType: id });
        await GeneralSetUpType.findByIdAndDelete(id);
        res.status(200).send("Document deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting document");
    }
})

router.put('/update/:id', async (req, res) => {
    const id = req.params.id
    const currentDate = new Date()
    if (req.body.createdDate) {
        req.body.createdDate = `${req.body.createdDate} ${currentDate.getHours()>9?currentDate.getHours():"0"+currentDate.getHours()}:${currentDate.getMinutes()>9?currentDate.getMinutes():"0"+currentDate.getMinutes()}:${currentDate.getSeconds()>9?currentDate.getSeconds():"0"+currentDate.getSeconds()}`;
    } else {
        req.body.createdDate = generalSetUpInstance.createdDate
    }
    try {
        await GeneralSetUpType.updateOne({ _id: id }, { $set: req.body });
        if (req.body.generalSetUp) {
            req.body.generalSetUp.map(async (general) => {
                let generalId = general.id
                await GeneralSetUp.updateOne({ _id: generalId }, { $set: general });
            })
        }
        return res.status(200).send("Document update successfully");
    } catch (err) {
        return res.status(500).json("Document Can't Update")
    }
})

router.get("/show/:id", async (req,res) => {     
    const id = req.params.id
    let generalSetupInstance = await GeneralSetUpType.findById(id)
    const generalSetUp=await GeneralSetUp.find({generalSetUpType:id})
    generalSetupInstance = generalSetupInstance.toObject()
    generalSetupInstance.generalSetUp = generalSetUp
    return res.status(200).json(generalSetupInstance) 
})

router.get("/index",async(req,res)=>{  
const startDate = new Date('2024-03-03T00:00:00.00');
const endDate = new Date('2024-03-10T23:59:59.99');
const generalSetUpTypeInstanceList= await GeneralSetUpType.find({
    createdDate: {   
      $gte: startDate, // Greater than or equal to the start date
      $lte: endDate    // Less than or equal to the end date
    },
    description:"Department"  
})
const generalSetUpType =await Promise.all(generalSetUpTypeInstanceList.map(async(gen)=>{
let general
const generalSetUp=await GeneralSetUp.find({generalSetUpType:gen.id})
general = gen.toObject()  
general.generalSetUp = generalSetUp 
return general
}))
return res.status(200).json(generalSetUpType);
})    

export default router;