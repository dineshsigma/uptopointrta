const { connection }=require('../db.js');
const con =require('../server.js');
let express=require('express');


//CURD OPERATIONS FOR MARKETING_COUPONS
 //INSERT VALUES IN MARKETING_COUPONS

exports.Marketinginsert = (req, res) => {
var params = req.body;
console.log(params);
var query="INSERT INTO Marketing_coupons SET ? "
   connection.query(query, params,
      function (error, results, fields) {
          if (error) throw error;
          return res.send({
              data: results,
              message: 'NEW RECORD IS INSERTED SUCCESSFULLY.'
          });
      });
};

//FETCH ALL VALUES IN MARKETING_COUPONS

exports.Marketingfetch = (req, res) => {
connection.query(' SELECT * FROM Marketing_coupons ',
      [req.params.id],
      function (error, results, fields) {
          if (error) throw error;
          res.end(JSON.stringify(results));
      });
};
//DELETE THE MARKETING_COUPONS

exports.Marketingdelete = (req, res) => {

  const{id,name,code,discount,validity,status}=req.body;
  var query="DELETE FROM Marketing_coupons where id=?";
  connection.query(query,
      [req.body.id], function (error, results, fields) {
          if (error) throw error;
          res.end('Record has been deleted!');
  });
};
//UPDATE THE VALUES IN MARKETING_COUPONS TABLE

exports.Marketingupdate = (req, res) => {

  var query='UPDATE `Marketing_coupons` SET name=?,code=?,discount=?,validity=?,status=? where id=?'

      connection.query(query,
[req.body.name, req.body.code,req.body.discount,req.body.validity,req.body.status, req.body.id],
    function (error, results, fields) {
      if (error) throw error;
    res.end(JSON.stringify(results));
  });
  };
