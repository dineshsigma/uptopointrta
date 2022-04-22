
const connection=require('../db.js');
const con =require('../server.js');
let express=require('express');

//var Cryptr = require('cryptr');

//cryptr = new Cryptr('myTotalySecretKey');



exports.login = (req, res)  =>{
    //var params = req.body;
            //console.log(params);
            var id=req.body.id;
            var email=req.body.email;
            var password=req.body.password;
            //var query="select  * from Registration  where email=?";
            var query="insert into Login(email,password) select email,password from Registration where  email=?  and password=?" ;
             //var query="INSERT INTO  Registration SET ? "
             //var query="INSERT  INTO Location SET ?"
             connection.query(query,[email,password],function(error,results,fields){
                 if(error){
                     console.log(error);

                 }
                 else{
                     
                     
                     
                     
             console.log("login success");
        
            
                        
                    }
                });
            }




            
                
                    
            
        