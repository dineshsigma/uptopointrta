var express = require('express');
var con=express('./server.js');
var router = express.Router();
var connection=require('../db.js');
var expressValidator=require('express-validator');
const {validationResult, body } = require('express-validator');
var sanitizer = require('sanitizer');
var assert=require('assert');

//FETCH ALL THE VALUES IN REGISTARTION TABLE
router.get('/fetch', function(req, res){
   console.log("heloooo");


var sql="select * from  Registration";

connection.query(sql,(error,results,fields)=>{
   if(error) throw error
   console.log(results);
})





});

//INSERT THE VALUES IN REGISTARTION TABLE
var bcrypt=require('bcrypt')
router.post('/insert',function(req,res,next){

var params=req.body;


const id=req.body.id;
   var firstname = req.body.firstname;
   const   lastname=req.body.lastname;
    const  email= req.body.email;
    let password= req.body.password;
    let confirmPassword = req.body.confirmPassword;
    const  telephone=req.body.telephone;


if(id && firstname && lastname && email && password && confirmPassword && telephone){
   connection.query('select * from Register where email=? ',[email],function(error,results,fields){
      if (results.length>0){
          res.send('Email already exists');
      }
      else{

          bcrypt.hash(password, 10, (err, hash)=> {
              if(err)throw err;
              password = hash;
              confirmPassword=hash;
              console.log(hash);
              firstname=req.body.firstname;

              var sql="insert into Register (id,firstname,lastname,email,password,confirmPassword,telephone) values ?";
             //var sql="insert into Registration set ?";
             //var params=req.body;
             //console.log(params);
              var values=[[id,firstname,lastname,email,hash,hash,telephone]]
              connection.query(sql,[values],function(error,results,fields){
                  if(error){
                      console.log(error);
                  }
                  else{
                      console.log("register success");//$2b$10$/8UbxrQw3woKi  $2b$12$X65wE2j77z/DE
                      console.log(results);
                      console.log(firstname);
                  }

              });
          })
      }
  });



}
else{
   console.log("plz enter valid detalis");
}

})












//DELETE THE DATA IN REGISTARTION TABLE
router.delete('/delete',function(req,res){
   console.log(req.body);
   const Register={
      id:req.body.id,
      firstname:req.body.firstname,
    lastname:req.body.lastname,

    email:req.body.email,
    password:req.body.password,
    confirmPassword:req.body.confirmPassword,

    telephone:req.body.telephone


  }

  connection.query("delete from Registration where id=?",[req.body.id],function(error,results,fields){
     if(error){
        console.log(error);
     }
     else{
        console.log("record is deleted");
     }
  })

})


//UPADTE THE DATA IN REGISTARTION TABLE

router.put('/update',function(req,res){
   var sql="update Registration set firstname=?,lastname=?,email=?,password=?,telephone=?, where id=?";
   let data=[req.body.firstname,req.body.lastname,req.body.email,req.body.password,req.body.telephone,req.body.id];
   connection.query(sql,data,function(error,results){
      if(error){
         console.log(error);
      }
      else{
         console.log("user updated successfully");
      }
   })

})


module.exports = router;
