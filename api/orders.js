var express = require('express');
var con=express('./server.js');
var router = express.Router();
var { connection }=require('../db.js');


//FETCH ALL THE VALUES IN ORDER  TABLE
router.get('/fetch', function(req, res,next){



var sql="select * from  salorders";

connection.query(sql,(error,results,fields)=>{
   if(error) {
     res.status(500).send(error);
   }
   else{
     res.status(200).cookie("order",5433,{sameSite:"lax",httpOnly:true,Secure:true,expires:new Date(new Date().getTime()+1000 *5)}).send(results)
   }
})


});

//INSERT THE VALUES IN ORDER TABLE

router.post('/insert', function (req, res, next) {
  


const orders={
    id:req.body.id,
    category:req.body.category,
    Location:req.body.Location,
    customerName:req.body.customerName,
    Type:req.body.Type,
    OrderType:req.body.OrderType,
    OrderDate:req.body.OrderDate,
    status:req.body.status,
    payment:req.body.payment,
    total:req.body.total
}




connection.query("insert into salorders set ?" ,orders,function(error,results,fields){
   if(error){
      res.status(500).send(error);
   }
   else{
      res.status(200).send(results);

   }
})

})












//DELETE THE DATA IN  ORDER TABLE
router.delete('/delete',function(req,res,next){
   const id=req.body.id;
   if(req.body.id){
    var sql='select * from  salorders where id=?';
    connection.query(sql,[req.body.id],function(error,results){
      console.log(results.length);
      if(results.length > 0){
        connection.query('delete from  salorders where id=?',[req.body.id],(error,results)=>{
          if(error){
            console.log(error);
          }
          else{
            res.status(200).clearCookie('name').send("cookie cleared");
          }
        })

      }
      else{
        res.status(404).send("record not found");
      }
    })

  }else{
    res.status(400).send("enter id")
  }


})


//UPADTE THE DATA IN REGISTARTION TABLE

router.put('/update',function(req,res,next){
   var sql="update Menu_items set category=?,Location=?,customerName=?,Type=?,OrderType=?,OrderDate=?,status=?,payment=?,total=? where id=?";
   let data=[req.body.category,req.body.Location,req.body.customerName,req.body.Type,req.body.OrderType,req.body.OrderDate,req.body.status,req.body.payment,req.body.total,req.body.id];
   connection.query(sql,data,function(error,results){
      if(error){
         res.status(500).send(error);
      }
      else{
         res.status(200).send(results);
      }
   })

})


module.exports = router;
