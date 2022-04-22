
const connection=require('../db.js');
const con =require('../server.js');
let express=require('express');
     

  

    exports.Orderdelete=(req,res)=>{
        const{id,Location,customerName,Type,OrderType,OrderDate,ststus,paymeny,total,category}=req.body;
        var query="DELETE FROM salorders where id=?";
        connection.query(query, 
         [req.body.id], function (error, results, fields) {
             if (error) throw error;
             res.end('Record has been deleted!');
     });
    };


    exports.Orderfetch = (req, res) => {
     var  query="select * from salorders";
     connection.query(query,
         function (error, results, fields) {
             if (error) throw error;
             res.end(JSON.stringify(results));
         });
 };

 exports.Orderinsert = (req, res) => {
     var params = req.body
     console.log(params);
    var query="INSERT INTO  salorders SET ? ";
    connection.query(query, params,
    function (error, results, fields) {
         if (error) throw error;
         return res.send({
         data: results,
        message: 'ORDER SUCCESSFULLY.'
         });
 });

};

exports.Orderupdate = (req, res) => {

var query='UPDATE `salorders` SET category=?,Location=?,customerName=?,Type=?,OrderType=?,OrderDate=?,status=?,payment=?,total=? where id=?'
                 
    connection.query(query,
[req.body.id,req.body.Location, req.body.customerName,req.body.Type,req.body.OrderType,req.body.orderDate, req.body.status, req.body.payment,req.body.total, req.body.id],
         function (error, results, fields) {
                         if (error) throw error;
                         res.end(JSON.stringify(results));
                     });
                 };


                 