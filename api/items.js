const express=require('express');
const router=express.Router();
const db=require('../db');

router.get('/fetch',(req,res)=>{
    var sql="select * from items";
    db.query(sql,(error,results)=>{
        if(error){
            res.status(500).send(error);
        }
        else{
            res.status(200).cookie("items",101,{sameSite:"lax",httpOnly:true,Secure:true,expires:new Date(new Date().getTime()+1000*5)}).send(results);
        }
    })
})

router.get('/fetch/:id',(req,res)=>{
    var id=req.params.id;
    console.log(id)
    var sql="select * from items where id=?";
    db.query(sql,[id],(error,results)=>{
        if(error){
            res.status(500).send(error);
        }
        else{
            res.status(200).send(results);
        }
    })
})

router.post('/iteminsert',(req,res,next)=>{
    const items={

        bookingid:req.body.bookingid,
        id:req.body.id,
        quantity:req.body.quantity,
        bookingtime:req.body.bookingtime
        
    }


var sql="insert into items set ?";
db.query(sql,items,(error,results)=>{
    if(error){
        res.status(500).send(error);
    }
    else{
        res.status(200).send(results);
    }
    
})

})



router.delete('/itemdelete/:id',(req,res,next)=>{
    var id=req.params.id;
    console.log(id);

    var sql="delete from items where id=?";
    db.query(sql,[id],(error,results)=>{
        if(error){
            res.status(500).send(error);
        }
        else{
            res.status(200).clearCookie("items").send(results);
        }
    })
})




router.put('/itemupdate',(req,res,next)=>{
   var bookingid=req.body.bookingid,
    id=req.body.id,
   quantity=req.body.quantity,
    bookingtime=req.body.bookingtime

   var sql="upadte items set  "
   let data=[bookingid,id,quantity,bookingtime];
   db.query(sql,data,(error,results)=>{
       if(error){
           res.status(500).send(error);
       }
       else{
           res.status(200).send(results);
       }
   })
})


module.exports=router;