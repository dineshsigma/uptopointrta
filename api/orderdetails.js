const { promiseImpl } = require('ejs');
const { request } = require('express');
let express = require('express');
let router = express.Router();
const { connection } = require('../db.js');

router.post('/book', async (req, res, next) => {
  let charecters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  length = charecters.length;
  let otp = '';
  for (i = 0; i < 6; i++) {
    otp += charecters.charAt(
      Math.floor(Math.random() * length)
    );
  }
  OTP = 'UPT-' + otp;

  var char =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  length = char.length;
  otp = '';
  for (i = 0; i < 6; i++) {
    otp += char.charAt(
      Math.floor(Math.random() * length)
    );
  }
  OTP = 'UPT-' + otp;
  let capchar = 'ABCDEFGHIJKLMOPQRSTUVWXYZ';
  let smallchar = capchar.toLowerCase();
  let charpay = smallchar + capchar;
  let number = '0123456789';
  let string = charpay + number;
  let id = '';
  for (i = 0; i <= 12; i++) {
    id += string.charAt(
      Math.floor(Math.random() * string.length)
    );
  }
  let paymentrefid = 'UTP/TXN-' + id;
  let date = new Date().valueOf();

  const orderdetails = {
    ord_id: OTP,
    user_id: req.session.user,

    name: req.body.name,
    bookingDate: date,
    delivaryDate: req.body.delivaryDate,
    paymentMethod:
      req.body.paymentMethod || 'cash',
    paymentReceived:
      req.body.paymentReceived || 'RECIVED',
    paymentReferenceid: paymentrefid,
    address: req.body.address,
    items: req.body.items,
    delivered:
      req.body.delivered || 'PENDING APPROVAL',
    total: req.body.cartTotal$,
  };

  let sql = 'insert into Orders set ?';
  let insert = await connection.query(
    sql,
    orderdetails,
    (err, results) => {
      if (err) {
        console.log(err);
        res
          .status(400)
          .send([{ error: 'Failed' }]);
      } else {
        const user_id = req.session.user,
          notification_id = req.body.token;

        var sql =
          'select * from  notification where user_id=?';
        connection.query(
          sql,
          [user_id],
          (error, results) => {
            if (results.length > 0) {
              var sql =
                'update notification set  notification_id=? where user_id=?';
              connection.query(
                sql,
                [notification_id, user_id],
                (error, results) => {}
              );
            } else {
              var sql =
                'insert into notification (user_id,notification_id) values(?,?)';
              connection.query(
                sql,
                [user_id, notification_id],
                (error, results) => {}
              );
            }
          }
        );
        var sql =
          "select * from notification where user_id  LIKE'%@%' ";
        connection.query(
          sql,
          (error, results) => {
            if (error) {
              res.status(202).send([
                {
                  otp: OTP,
                  user_id: req.session.user,
                  items: req.body.items,
                },
              ]);
            } else {
              res.status(202).send([
                {
                  otp: OTP,
                  user_id: req.session.user,
                  items: req.body.items,
                  results: results,
                },
              ]);
            }
          }
        );
      }
    }
  );
});

router.delete(
  '/delete/:ord_id',
  (req, res, next) => {
    const ord_id = req.params.ord_id;
    var sql =
      'delete from  Orders where ord_id=?';
    connection.query(
      sql,
      [ord_id],
      (error, results) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.status(200).send(results);
        }
      }
    );
  }
);

router.put('/update', (req, res, next) => {
  const ord_id = req.body[0].id,
    paymentReceived = req.body[0].form.payment,
    delivered = req.body[0].form.status;

  let sql =
    'update Orders set paymentReceived=?,delivered=? where ord_id=?';
  let data = [paymentReceived, delivered, ord_id];
  //let sql="update  Orders set   user_id=?,name=?,bookingDate=?,delivaryDate=?,paymentReceived=?,paymentMethod=?paymentReferenceid=?,address=?,items=?,delivered=? where ord_id=?";
  //let data=[req.body.user_id,req.body.name,req.body.bookingDate,req.body.delivaryDate,req.body.paymentReceived,req.body.paymentMethod,req.body.paymentRefernceid,req.body.address,req.body.items,req.body.deliverd,req.body.ord_id]
  connection.query(
    sql,
    data,
    (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(results);
      }
    }
  );
});

//------------------------------------------------------------fetch all oder details----------------------------------------------------//

fetchOrder = () => {
  return new Promise((resolve, reject) => {
    var sql =
      'select * from Orders order by  bookingDate DESC';
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
    const fetch = await fetchOrder();
   
    res.status(200).send(fetch);
  } catch (error) {
    console.log(error);
    res.status(400).send('orderfetch');
  }
});

//----------------------------------------------------------ORDER FETCH BY ID-----------------------------------------------//

fetchOrderById = ord_id => {
  return new Promise((resolve, reject) => {
    var sql =
      'select * from Orders where ord_id=?';
    connection.query(
      sql,
      [ord_id],
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

router.get('/fetch/:ord_id', async (req, res) => {
  try {
    const ord_id = req.params.ord_id;

    const fetchid = await fetchOrderById(ord_id);

    res.status(200).send(fetchid);
  } catch (error) {
    res.status(400).send(error);
  }
});
//---------------------------------------------order fetch by user_id-----------------------------------------------------//
/*
userById = user_id => {
  return new Promise((resolve, reject) => {
    var sql =
      'select * from Orders where user_id=?';
    connection.query(
      sql,
      [user_id],
      (error, results) => {
        console.log(results.length)
        if(results.length ==0){
        
          return reject(error)
        }
        else{
          return resolve(results);
        }
      }
    );
  });
};

router.get(
  '/fetch/user/:user_id',
  async (req, res) => {
    console.log(req.params.user_id);
    try {
      const user_id = req.params.user_id;
      const user = await userById(user_id);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);*/
//---------------------------------------fetch order by user_id---------------------------------//
router.get('/fetch/user/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  var sql =
    'select * from Orders where user_id=? ORDER BY bookingDate DESC';
  connection.query(
    sql,
    [user_id],
    (error, results) => {
      if (results.length == 0) {
        res
          .status(400)
          .send(
            'there is  no user with that id '
          );
      } else {
        

        res.status(200).send(results);
      }
    }
  );
});

//------------------------------------------------get notification both tables in order and notification table------------------------------//

router.get('/match/:ord_id', (req, res) => {
  const ord_id = req.params.ord_id;

  var sql =
    'select  n.notification_id,o.ord_id,o.user_id,o.items,o.bookingdate,o.name,o.address,o.delivaryDate,o.paymentMethod,o.paymentReferenceId,o.paymentReceived,o.delivered,o.total from Orders o,notification n where o.user_id=n.user_id && ord_id=?';
  connection.query(
    sql,
    [ord_id],
    (error, results) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(results);
      }
    }
  );
});
//------------------------------------------------update Location status------------------------------------------------//
router.put('/status', async (req, res) => {
  const status = req.body.valid;

  var sql = 'update  Location  set status=?';
  connection.query(
    sql,
    [status],
    (error, results) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(results);
      }
    }
  );
});
//-------------------------fetch status values in Location Table--------------------------------//
router.get('/status/fetch', (req, res) => {
  var sql = 'select status from Location';
  connection.query(sql, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});
//------------------------------------count no of delieveres in order table---------------------------------------//
router.get('/orderdetails', (req, res) => {
  var sql =
    'select delivered as name  ,count(*)  as orders from Orders group by delivered ';
  connection.query(sql, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});
//---------------------------------------------FETCH  ORDER STATUS="PENDING APPROVAL"-----------------------------------------------//
router.get('/count', (req, res) => {
  var sql =
    "select  delivered,count(*) as  NumberOforders  from Orders  where delivered='PENDING APPROVAL'";

  connection.query(sql, (error, results1) => {
    if (error) {
      res.status(400).send(error);
    } else {
      var sql =
        'select logoimages from logotable';
      connection.query(sql, (error, result) => {
        if (error) {
          res.status(400).send(error);
        } else {
          res.status(200).send([
            {
              results: results1,
              email: req.session.email,
              logoimages: result,
            },
          ]);
        }
      });


    }
  });
});

/*
///------------------------------------------------------------INSERT ORDER-----------------------------------------------------------//

insertorder=(ord_id,user_id,cat_id,men_id,bookingDate,delivaryDate,paymentMethod,paymentReceived,paymentReferenceId,address,items,delivered)=>{
  return new Promise((resolve,reject)=>{
    var sql="insert into Orders(ord_id,user_id,cat_id,men_id,bookingDate,delivaryDate,paymentMethod,paymentReceived,paymentRefereneceId,address,items,delivered) values(?,?,?,?,?,?,?,?,?,?,?,?)";
    let data=[ord_id,user_id,cat_id,men_id,bookingDate,delivaryDate,paymentMethod,paymentReceived,paymentReferenceId,address,items,delivered];
    connection.query(sql,data,(error,results)=>{
      if(error){
        return reject(error);
      }
      else{
        return resolve(results);
      }
    })
  })

}





router.post('/insert',async (req,res)=>{
  try{
    const ord_id=req.body.ord_id,
    user_id=req.body.user_id,
    cat_id=req.body.cat_id,
    men_id=req.body.men_id,
    bookingDate=req.body.bookingDate,
    delivaryDate=req.body.delivaryDate,
    paymentMethod=req.body.paymentMethod,
    paymentReferenceId=req.body.paymentReferenceId,
    paymentReceived=req.body.paymentReceived,
    address=req.body.address,
    items=req.body.items,
    delivered=req.body.delivered

    const insert= await insertorder(ord_id,user_id,cat_id,men_id,bookingDate,delivaryDate,paymentMethod,paymentReceived,paymentReferenceId,address,items,delivered);
    res.status(200).send(insert);

  }
  catch(error){
    console.log(error);
    res.status(400).send('insert');

  }
})

//---------------------------------------------------DELETE  ORDER----------------------------------------//




orderDelete=(ord_id)=>{
  return new Promise((resolve,reject)=>{
    var sql="delete from Orders where ord_id=?";
    connection.query(sql,[ord_id],(error,results)=>{
      if(error){
        return reject(error);
      }
      else{
        return resolve(results);
      }

    })
  })
}


router.delete('/delete/:ord_id',async (req,res)=>{
  try{
  const ord_id=req.params.ord_id;
  console.log(ord_id);
  const del=await oderDelete(ord_id);
  res.status(200).send(del)
  }
  catch(error){
    console.log(error);
    res.status(400).send(error);

  }

})

///-----------------------------------------------------Update Order--------------------------------------------//


updateorder=(ord_id,user_id,cat_id,men_id,bookingDate,delivaryDate,paymentMethod,paymentReferenceId,paymentReceived,address,items,delivered)=>{
  return new Promise((resolve,reject)=>{
    var sql="update Orders set user_id=?,cat_id=?,men_id=?,bookingDate=?,delivaryDate=?,paymentMethod=?,paymentReferenceId=?,paymentReceived=?,address=?,items=?,delivered=? where ord_id=?";
    let data=[user_id,cat_id,men_id,bookingDate,delivaryDate,paymentMethod,paymentReferenceId,paymentReceived,address,items,delivered,ord_id];
    connection.query(sql,data,(error,results)=>{
      if(error){
        return reject(error);
      }
      else{
        return resolve(results);
      }
    })
  })

}






router.put('/update',async (req,res)=>{
   try{
     const ord_id=req.body.ord_id,
     user_id=req.body.user_id,
     cat_id=req.body.cat_id,
     men_id=req.body.men_id,
     bookingDate=req.body.bookingDate,
     delivaryDate=req.body.delivaryDate,
     paymentMethod=req.body.paymentMethod,
     paymentReferenceId=req.body.paymentReferenceId,
     paymentReceived=req.body.paymentReceived,
     address=req.body.address,
     items=req.body.items,
     delivered=req.body.deliverd

     const update=await updateorder(ord_id,user_id,cat_id,men_id,bookingDate,delivaryDate,paymentMethod,paymentReferenceId,paymentReceived,address,items,delivered);
     res.status(200).send(update);


   }
   catch(error){
     console.log(error);
     res.status(400).send(error)

   }
})
*/ 
router.get('/clause',(req,res)=>{
  var sql="select user_id,count(*) as number from Orders   group by user_id   ";
 //var sql="select * from Categories where cat_id <> 31"
  connection.query(sql,(error,results)=>{

    if(error){

      res.status(400).send(error);
    }
    else{

      res.status(200).send(results);
    }

  })
})




module.exports = router;
