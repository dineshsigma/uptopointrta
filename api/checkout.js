var express=require('express');
let router=express.Router();
const db=require('../db.js');

router.get('/fetch',(req,res,next)=>{
  var sql="select * from checkout";
  db.query(sql,(error,results)=>{
    if(error){
      res.status(500).send(error);
    }
    else{
      res.status(200).send(results);
    }

  })
})

router.post('/insert',(req,res,next)=>{

  const checkout={
    checkid:req.body.checkid,
    id:req.body.id,
    listofitems:req.body.listofitems

  }
  
var sql="insert into checkout set ?";
db.query(sql,checkout,(error,results)=>{
  if(error){
    res.status(500).send(error);
  }
  else{
    res.status(200).send(results);
  }
})

})
router.delete('/delete',(req,res,next)=>{
  var checkid=req.body.checkid
  var sql="delete from checkout where id=?";
  db.query(sql,[checkid],(error,results)=>{
    if(error){
      res.status(500).send(error);
    }
    else{
      res.status(200).send(results);
    }
  })
})


router.put('/update',(req,res,next)=>{
  var sql="update checkout set id=?,listofitems=? where id=?";
  let data=[req.body.id,req.body.listofitems,req.body.checkid];
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
