const { connection }=require('../db.js');
const con =require('../server.js');
let express=require('express');




//CURD OPERATION FOR LOCATION TABLE

  //INSERT THE VALUES IN LOCATION TABLE

  exports.Locationinsert=(req,res)=>{
    var params=req.body;
    console.log(params);
  
    var query="INSERT INTO Location SET ? ";
  
    connection.query(query, params,
        function (error, results, fields) {
            if (error) throw error;
            return res.send({
                data: results,
                message: 'NEW RECORD IS INSERTED SUCCESSFULLY.'
            });
        });
  
  }
  
  
  //DELETE THE RECORD IN LOCATION TABLE
  
  
  exports.Locationdelete = (req, res) => {
   
    console.log(req.body);
    const{id,email,city,area,pincode,phoneNumber}=req.body;
    var query='DELETE FROM `Location` WHERE `id`=?';
    connection.query(query, 
        [req.params.id], function (error, results, fields) {
            if (error) {
                console.log(error);
            }
            else{
            console.log(results);
            res.end('Record has been deleted!');
            }
   
   });
  };

  //FETCH ALL VALUES IN LOCATION TABLES
  exports.Locationfetch = (req, res) => {
    var  query="select * from Location";
    connection.query(query,
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
  };
  
  //UPDATE THE LOCATION TABLE
  
  exports.Locationupdate = (req, res) => {
    
    var query='UPDATE `Location` SET email=?,city=?,area=?,pincode=?,phoneNumber=? where id=?'
        
        connection.query(query,
            [req.body.email, req.body.city,req.body.area,req.body.pincode,req.body.phoneNumber, req.body.id],
            function (error, results, fields) {
                if (error) throw error;
                res.end(JSON.stringify(results));
            });
    };