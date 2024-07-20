import express from 'express';

const router = express.Router();

router.get('/:id',(req,res)=>{
    res.send("Manojkumar");
})

export default router;