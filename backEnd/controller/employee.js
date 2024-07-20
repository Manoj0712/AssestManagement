import express from 'express';
import multer from'multer';
import Employee from '../model/Employee.js';
import fs from 'fs';
import GeneralSetUpType from '../model/GeneralSetUpType.js';
import GeneralSetUp from '../model/GeneralSetUp.js'

const router = express.Router();

const upload = multer({ dest: 'uploads/' }); 

router.post('/create',upload.single('employeeImage'), async (req, res) => {
    const currentDate = new Date()
    const createdDateString = `${req.body.joinDate} ${currentDate.getHours() > 9 ? currentDate.getHours() : "0" + currentDate.getHours()}:${currentDate.getMinutes() > 9 ? currentDate.getMinutes() : "0" + currentDate.getMinutes()}:${currentDate.getSeconds() > 9 ? currentDate.getSeconds() : "0" + currentDate.getSeconds()}`;
    req.body.joinDate = createdDateString
    if (req.body.employeeImage) {  
        console.log(req.body.employeeImage)
        // const employeeImage = req.body.employeeImage.file.filename; 
        // const imageData = fs.readFileSync(req.body.employeeImage);
        // const base64ImageData = imageData.toString('base64');
        // req.body.employeeImage = base64ImageData;
    }      
    const newEmployee = new Employee(req.body)
    try {
        const saveEmployee = await newEmployee.save()
        res.json(saveEmployee)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put("/update/:id", async (req, res) => {
    const currentDate = new Date()
    let createdDateString
    if (req.body.joinDate) {
        createdDateString = `${req.body.joinDate} ${currentDate.getHours() > 9 ? currentDate.getHours() : "0" + currentDate.getHours()}:${currentDate.getMinutes() > 9 ? currentDate.getMinutes() : "0" + currentDate.getMinutes()}:${currentDate.getSeconds() > 9 ? currentDate.getSeconds() : "0" + currentDate.getSeconds()}`;
        req.body.joinDate = createdDateString
    }
    if (req.body.employeeImage) {
        const imageData = fs.readFileSync(req.body.employeeImage);
        const base64ImageData = imageData.toString('base64');
        req.body.employeeImage = base64ImageData;
    }
    try {
        const updateEmployee = await Employee.findByIdAndUpdate(req.params.id, { $set: req.body })
        const employee = await Employee.findOne({ _id: req.params.id })
        const department = await employee.populate("departMent")
            .then(populatedEmployee => {
                return populatedEmployee.departMent
            })
            .catch(error => {   
                console.error('Error populating department:', error);
            });
        updateEmployee.departMent = department;
        res.status(200).json(updateEmployee)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/show/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
       const departMent = await GeneralSetUp.findById(employee.departMent)
        employee.departMent = departMent
        res.status(200).json(employee)       
    } catch (err) { 
        res.status(500).json(err)       
    }
})

router.get("/department",async(req,res)=>{
const department = await GeneralSetUpType.findOne({description:"Department"})
const departmentInstanceList = await GeneralSetUp.find({generalSetUpType:department})
const departmentId=[]
const departmentdescriptionList =[]
console.log(departmentInstanceList)
departmentInstanceList.map(async(dept)=>{
    departmentId.push(dept.id)
    departmentdescriptionList.push(dept.description)
})
console.log(departmentId)
console.log(departmentdescriptionList)
const departmentInstance = {departmentId:departmentId,departmentdescriptionList:departmentdescriptionList}
return res.json(departmentInstance)   
})


router.get('/index', async (req, res) => {
    try {  
        console.log("Manoj")
        const employees = await Employee.find().lean()
const emp=employees.populate("departMent")
console.log(emp)     
// const employeeInstance=await Promise.all(employees.map(async(emp,j)=>{
// let employee
// const departMent = await GeneralSetUp.findById(emp.departMent)
// employee = emp
// employee.departMent=departMent
// return employee
// }))
        res.status(200).json(employeeInstance)
    } catch (err) {
        res.status(500).json(err)
    }   
})

router.delete('/delete/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id)
        res.status(200).json("Employee has been Deleted.")
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router;