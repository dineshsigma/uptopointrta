const express=require('express');
const router=express.Router();
const db=require('../db.js');
router.get('/fetch',(req,res)=>{
    console.log("heloooo");
    var sql="select * from customers";
    db.query(sql,(error,results)=>{
        if(error){
            res.status()
        }
    })
})


module.exports=router;