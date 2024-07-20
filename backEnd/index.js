import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import dotenv from "dotenv"
import employee from "./controller/employee.js"
import assestCatagory from "./controller/assestCatagoryMaster.js"
import assestMaster from "./controller/assestMaster.js"
import materialIssue from "./controller/materialIssue.js"
import materialReturn from "./controller/materialReturn.js"
import generalSetUpType from "./controller/generalSetUpType.js"
import scarp from "./controller/scarp.js"
import stock from './controller/stock.js'
import location from './controller/location.js'

const app = express()
dotenv.config()
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', extended: true }));
app.use(cors());  
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));
     

async function connect() {
  await mongoose.connect(process.env.URL)
    .then(() => {
      console.log('Connected to MongoDB successfully');
    })    
    .catch(error => {
      console.error('Error connecting to MongoDB:', error);
    });    
}    
connect()   

mongoose.connection.on("disconnected",()=>{
  console.log("Mongodb Disconnected")
})

//middleWare
app.use('/employee',employee)
app.use("/assestCatagory",assestCatagory)
app.use("/assestMaster",assestMaster)
app.use("/materialIssue",materialIssue)
app.use("/materialReturn",materialReturn)
app.use("/generalSetUpType",generalSetUpType)
app.use("/scarp",scarp)
app.use("/location",location)
app.use("/stock",stock)



app.listen(5000, () => {
  console.log("on port 5000")
})