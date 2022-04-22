const express=require('express');
const router=express.Router();
const db=require('../db.js');


getCancel=()=>{
  return new Promise((resolve,reject)=>{
    var sql="select * from  cancel";
    db.query(sql,(error,results)=>{
      if(error){
        return reject(error);
      }
      else{
        return resolve(results);
      }
    })
  })
}


router.get('/fetch',async (req,res,next)=>{
  try{
const getcancel= await getCancel();
res.status(200).json({getcancel:getcancel})
  }
  catch(error){
    res.status(500).send(error);
  }


})



insertCancel=(cancelid,paymentReferenceid,id,refundStatus,refundReferenceid,refundAmount,listofitems,reason,bookingdate,bookingid,cancelReqdate,cancelCharges)=>{
  return new Promise((resolve,reject)=>{
    var sql="insert into cancel (cancelid,paymentReferenceid,id,refundStatus,refundReferenceid,refundAmount,listofitems,reason,bookingdate,bookingid,cancelReqdate,cancelCharges) values(?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(sql,[cancelid,paymentReferenceid,id,refundStatus,refundReferenceid,refundAmount,listofitems,reason,bookingdate,bookingid,cancelReqdate,cancelCharges],(error,results)=>{
      if(error){
        return reject(error);
      }
      else{
        return resolve(results);
      }
    })
  })
}

router.post('/insert',async (req,res,next)=>{
  try{
    const cancelid=req.body.cancelid,
    paymentReferenceid=req.body.paymentReferenceid,
    id=req.body.id,
    refundStatus=req.body.refundStatus,
    refundReferenceid=req.body.refundReferenceid,
    refundAmount=req.body.refundAmount,
    listofitems=req.body.listofitems,
    reason=req.body.reason,
    bookingdate=req.body.bookingdate,
    bookingid=req.body.bookingid,
    cancelReqdate=req.body.cancelReqdate,
    cancelCharges=req.body.cancelCharges
    const insertcancel= await insertCancel(cancelid,paymentReferenceid,id,refundStatus,refundReferenceid,refundAmount,listofitems,reason,bookingdate,bookingid,cancelReqdate,cancelCharges);
    res.status(200).json({insertcancel:insertcancel});
  }
  catch(error){
    res.status(500).send(error);
  }
})



deletecancel=(id)=>{
  return new Promise((resolve,reject)=>{
    var sql="delete from cancel where cancelid=?";
    db.query(sql,[id],(error,results)=>{
      if(error){
        return reject(error);
      }
      else{
        return resolve(results);
      }
    })
  })
}

router.delete('/delete',async (req,res,next)=>{
  try{
    const  cancelid=req.body.cancelid;
    const delid=await deletecancel(cancelid);
    res.status(200).json({delid:delid})

  }
  catch(error){
    res.status(500).send(error);
  }

})


cancelupdate=(cancelid,paymentReferenceid,id,refundStatus,refundReferenceid,refundAmount,listofitems,reason,bookingdate,bookingid,cancelReqdate,cancelCharges)=>{
  return new Promise((resolve,reject)=>{
    var sql="update cancel set paymentReferenceid=?,id=?,refundStatus=?,refundReferenceid=?,refundAmount=?,listofitems=?,reason=?,bookingdate=?,bookingid=?,cancelReqdate=?,cancelCharges=? where  cancelid=?";
    db.query(sql,[paymentReferenceid,id,refundStatus,refundReferenceid,refundAmount,listofitems,reason,bookingdate,bookingid,cancelReqdate,cancelCharges,cancelid],(error,results)=>{
      if(error){
        return reject(error);
      }
      else{
        return resolve(results);
      }
    })
  })
}

router.put('/update',async (req,res,next)=>{
try{
  const cancelid=req.body.cancelid,
  paymentReferenceid=req.body.paymentReferenceid,
  id=req.body.id,
  refundStatus=req.body.refundStatus,
  refundReferenceid=req.body.refundReferenceid,
  refundAmount=req.body.refundAmount,
  listofitems=req.body.listofitems,
  reason=req.body.reason,
  bookingdate=req.body.bookingdate,
  bookingid=req.body.bookingid,
  cancelReqdate=req.body.cancelReqdate,
  cancelCharges=req.body.cancelCharges

  const updatecal=await cancelupdate(cancelid,paymentReferenceid,id,refundStatus,refundReferenceid,refundAmount,listofitems,reason,bookingdate,bookingid,cancelReqdate,cancelCharges);
   res.status(200).json({
     updatecal:updatecal
   })
}
catch(error){
  res.status(500).send(error);
}

})

module.exports=router;
