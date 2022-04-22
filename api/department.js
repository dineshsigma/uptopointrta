var express=require('express');
var router=express.Router();
var connection=require('../db.js');


router.get('/vegfetch',(req,res)=>{
  var sql="select * from vegetrain";
  connection.query(sql,(error,results)=>{
    if(error){
      res.status(500).send(error);
    }
    else{
      res.status(200).send(results);
    }
  })
})


  //INSERT THE VALUES IN VEGETRAIN  TABLE

  router.post('/veginsert',function(req,res,next){

  const  vegfood={
     vegid :req.body.vegid,

      vegfood:req.body.vegfood,

  }




    connection.query("insert into vegetrain set ?" ,vegfood,function(error,results,fields){
      if(error){
         res.status(500).send(error);
      }
      else{
         res.send({

            status:"true",
            message:"inserted values successfully",

         })

      }
   })


  })


//FETCH DATA IN NONVEG TABLE
router.get('/nonvegfetch', function(req, res){



  var sql="select * from  nonvegetrain";

  connection.query(sql,(error,results,fields)=>{
     if(error){
       res.status(500).send("error");
     }
     else{
       res.status(200).send(results);
     }
  })


  });

  //INSERT THE VALUES IN NONVEG TABLE

  router.post('/nonveginsert',function(req,res,next){

  const  vegfood={
     nonvegid :req.body.nonvegid,

      nonvegfood:req.body.nonvegfood,

  }




    connection.query("insert into nonvegetrain set ?" ,vegfood,function(error,results,fields){
      if(error){
         res.status(500).send(error);
      }
      else{
         res.send({

            status:"true",
            message:"inserted values successfully",

         })

      }
   })


  })



  const {auth} =require('../app/validation')

  router.get('/auth',auth,(req,res)=>{
    res.send("admin");
  })


module.exports=router;
