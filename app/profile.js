const connection=require('../db.js');
const con =require('../server.js');
let express=require('express');
exports.registerinsert=(req,res)=>{
var params=req.body;
//console.log(params);
    var password=req.body.password;
    var id=req.body.id;
    //var firstname=req.body.firstname;
    //var lastname=req.body.lastname;
    var email=req.body.email;
    //var telephone =req.body.telephone;


    var sql="insert into  profile (id,email,password) select id,password  from Register where email=?";
    //var sql="insert into Register set ?"
    connection.query(sql,params,function(error,results){
        if(error){
            console.log(error);
        }
        else{
            console.log(results);
        }
    })
}
exports.profile=(req,res)=>{
    var  query="select * from  profile";
connection.query(query,
                function (error, results, fields) {
                    if (error) throw error;
                    res.end(JSON.stringify(results));
                });

}