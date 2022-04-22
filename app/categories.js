

const { connection }=require('../db.js');
const con =require('../server.js');
let express=require('express');


//INSERT VALUES IN CATEGORIES TABLE
exports.Categoryinsert = (req, res) => {

var params = req.body;

console.log(params);

var query="INSERT INTO  Categories SET ? ";

connection.query(query, params,
                function (error, results, fields) {
                if (error) throw error;
                return res.send({
                data: results,
                message: 'NEW RECORD IS INSERTED SUCCESSFULLY.'
                    });
                });  
};

//FETCH ALL VALUES FROM CATEGORIES TABLE
exports.Categoryfetch = (req, res) => {
var  query="select * from Categories";
connection.query(query,
                function (error, results, fields) {
                    if (error) throw error;
                    res.end(JSON.stringify(results));
                });
        };
//UPDATE VALUES  FROM CATEGORIES TABLE        
exports.Categoryupdate = (req, res) => {
var query='UPDATE `Categories` SET category=?,items=?,quantity=?,price=? where id=?'
                connection.query(query,
                    [req.body.category, req.body.items,req.body.quantity,req.body.price, req.body.id],
                    function (error, results, fields) {
                    if (error) throw error;
                    res.end(JSON.stringify(results));
                    });
            };
//DELETE THE VALUE FROM CATEGORIES TABLE            
exports.Categorydelete = (req, res) => {
const{Id,category,items,quantity,price}=req.body;
var query='DELETE FROM `Categories` WHERE `id`=?'
                connection.query(query, 
                    [req.body.id], function (error, results, fields) {
                        if (error) throw error;
                        res.end('Record has been deleted!');
                });
            };