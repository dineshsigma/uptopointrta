const express = require('express');
const { connection } = require('../db');
const router = express.Router();

statusFetch = () => {
  return new Promise((resolve, reject) => {
    var sql = 'select * from status';
    connection.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(results);
      }
    });
  });
};

router.get('/fetch', async (req, res) => {
  try {
    const fetsta = await statusFetch();
    res
      .status(200)
      .send([
        { status: fetsta },
        { USER_ID: req.session.user },
      ]);
  } catch (error) {
    res.status(400).send(error);
  }
});

statusUpdate = (sta_id, status) => {
  return new Promise((resolve, reject) => {
    var sql =
      'update status set status=? where sta_id=1';
    let data = [status, sta_id];
    connection.query(
      sql,
      data,
      (error, results) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(results);
        }
      }
    );
  });
};

router.put('/update', async (req, res) => {
  try {
    const sta_id = req.body.sta_id,
      status = req.body.valid;
    const staupd = await statusUpdate(
      sta_id,
      status
    );
    res.status(200).send(results);
  } catch (error) {
    res.status(400).send(error);
  }
});

/*
router.get('/fetch',(req,res)=>{
    var sql="select * from status";
    connection.query(sql,(error,results)=>{
        if(error){
            res.status(400).send(error)
        }
        else{
            res.status(200
                ).send(results);
        }
    })
})
router.put('/update',(req,res)=>{
    //console.log(req.body);
     const sta_id=req.body.sta_id,
     status=req.body.valid
     //console.log(status);
     var sql="update status set status=? where sta_id=1";
     let data=[status,sta_id];
     connection.query(sql,data,(error,results)=>{
         if(error){
             console.log(error)
             res.status(400).send(error);

         }
         else{
             res.status(200).send(results);
         }
     })
})
*/

module.exports = router;
