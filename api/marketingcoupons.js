var express = require('express');
let multer=require('multer');

var con=express('./server.js');
//var router = express.Router();
const router=require('express').Router();
var { connection }=require('../db.js');
let {randomnumbers}=require('./random')



const DIR = './public/uploadimages';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});



couponsInsert=(code,couponsimg,name,discription)=>{
  return new Promise((resolve,reject)=>{
    var sql="select couponsimg   from  coupons  where code=?";
    connection.query(sql,[code],(error,results)=>{
      if(error) throw error;
      console.log(results.length);
      if(results.length> 0){
        return reject(error);

      }
      else{
        var sql="insert into coupons (code,couponsimg,name,discription) values(?,?,?,?)";
        let data=[code,couponsimg,name,discription];
        connection.query(sql,data,(error,results)=>{
          if(error){
            return reject(error);
          }
          else{
            return resolve(results);
          }
        })
      }
    })


    
  })
}



router.post('/insert',upload.single('coupon'),async function(req,res,next){
  console.log(req.body);

  const url = req.protocol + '://' + req.get('host');

  
 
  try{
    if(req.file!=null){
    const code=randomnumbers(10),
    couponsimg=req.file.filename,
    name=req.body.name,
   
    discription=req.body.description
  

    const insertcoup= await couponsInsert(code,couponsimg,name,discription);
    res.status(200).send(insertcoup)
    }
    else{
      res.status(400).send('please enter coupons image');
    }

  }
  catch(error){
    console.log(error);
    res.status(400).send('alreadt image is there ');

  }


})

//-----------------------------------fetch coupons table--------------------------------//



couponsFetch=()=>{
  return new Promise((resolve,reject)=>{
    var sql="select * from coupons ";
    connection.query(sql,(error,results)=>{
      if(error){
        return reject(error);
      }
      else{
        return resolve(results);
      }
    })
  })
}
   router.get('/fetch',async (req,res)=>{
try{
  const copfetch=await couponsFetch();
  res.status(200).send(copfetch)

}
catch(error){
  res.status(400).send(error)
}

   })


//--------------------------------------------------coupons table fetch by id------------------------------------//


couponsById=(code)=>{
  return new Promise((resolve,reject)=>{
    var sql="select * from coupons where code=?";
    connection.query(sql,[code],(error,results)=>{
      if(error){
        return reject(error);
      }
      else{
        return resolve(results);
      }
    })
  })
}


router.get('/fetch/:code',async (req,res)=>{
  try{
    const code=req.params.code;
    console.log(code);

    const coupById=await couponsById(code);
    res.status(200).send(coupById)


  }
  catch(error){
res.status(400).send(error)
  }
})

//--------------------------------delete coupons by code--------------------------------------------//
const fs=require('fs');

deleteCoupons=(code)=>{
  return new  Promise((resolve,reject)=>{
    var sql="select couponsimg from  coupons where code=?";
    connection.query(sql,[code],(error,results)=>{
      if(error){
        return reject(error);

      }
      else{
        console.log(results[0].couponsimg);
        fs.unlink('./public/uploadimages/'+results[0].couponsimg,(error)=>{
          if(error) throw error;
        })
      }
      var sql="delete from coupons where code=?";
      connection.query(sql,[code],(error,results)=>{
        if(error){
          return reject(error);
        }
        else{
          return resolve(results);
        }

      })

    })
  })
}



router.delete('/delete/:code',async (req,res)=>{
  try{
    const code=req.params.code;
    console.log(code);

    const delcop=await deleteCoupons(code);
    res.status(200).send(delcop)

  }
  catch(error){
    res.status(400).send(error);
  }
})

//----------------------------------------------update coupons table ---------------------------------------//

couponsUpdate=(code,couponsimg,name,discription)=>{
  return new Promise((resolve,reject)=>{
var sql="select couponsimg from coupons where code=?";
connection.query(sql,[code],(error,results)=>{
  if(error){
    return reject(error)
  }
  else{
    console.log(results[0].coupnsimg);
    fs.writeFile('./public/uploadimages/'+results[0].couponsimg,'./public/uploadimages/'+couponsimg,(error)=>{
      if(error) throw error;
      fs.unlink('./public/uploadimages/'+results[0].couponsimg,(error)=>{
        if(error) throw error;
      })
    })
  }

  var sql="update coupons set couponsimg=?,name=?,discription=? where code=?";
  let data=[couponsimg,name,discription,code];
  connection.query(sql,data,(error,results)=>{
    if(error){
      return reject(error);

    }
    else{
      return resolve(results);;
    }
  })
})
})

}


fetcopbyid=(code,couponsimg,name,discription)=>{
  return new Promise((resolve,reject)=>{
    var sql="select couponsimg from coupons where code=?";
    connection.query(sql,[code],(error,results)=>{
      if(error){
        return reject(error);
      }
      else{
        couponsimg=results[0].couponsimg;
        var sql="update coupons set couponsimg=?,name=?,discription=? where code=?";
        let data=[results[0].couponsimg,name,discription,code];
        connection.query(sql,data,(error,results)=>{
          if(error){
            console.log(error)
            return reject(error);
          }
          else{
            return resolve(results);
          }
        })



      }
    })

  })
}

router.put('/update',upload.single('coupon'),async (req,res)=>{
  console.log(req.body);
  console.log(req.file);
  try{
    if(req.file!=null){
    const code=req.body.code,
    couponsimg=req.file.filename,
    name=req.body.name,
   
    discription=req.body.description
   

    const updatecop= await couponsUpdate(code,couponsimg,name,discription);
    res.status(200).send(updatecop);

    }
    else{
      console.log(req.body);
      try{
        const code=req.body.code,
    couponsimg=req.body.couponsimg,
    name=req.body.name,
  
    discription=req.body.description,
    minimumTotal=req.body.minimumTotal

    const fetchcop= await  fetcopbyid(code,couponsimg,name,discription);
    res.status(200).send(fetchcop);

      }
      catch(error){
        res.status(400).send(error);
      }

    }
}
  catch(error){
    res.status(400).send(error);
  }
})
/*

const fs=require('fs');

router.delete('/delete/:id',function(req,res,next){
   const id=req.params.id;
   console.log(id);

var sql="select couponsimg  from Marketing_coupons where id=?";
connection.query(sql,[id],(error,results)=>{
  if(error){
    res.status(500).send(error);
  }
  else{
    console.log(results);
    console.log(results[0].couponsimg);
    fs.unlink('./public/uploadimages/'+results[0].couponsimg,(error)=>{
      if(error){
        res.status(500).send(error);
      }

   var sql="delete from Marketing_coupons where id=?";
   connection.query(sql,[id],(error,results)=>{
     if(error){
       res.status(500).send(error);
     }
     else{
       res.status(200).send(results);
     }
   })

    })
  }
})




   



})


//UPADTE THE DATA IN REGISTARTION TABLE

router.put('/update',upload.single('couponsimg'),function(req,res,next){

  var sql="select couponsimg from Marketing_coupons where id="+req.body.id;
  connection.query(sql,(error,results)=>{
    if(error){
      res.status(500).send(error);
    }
    console.log(req.file.filename);
    console.log(results[0].couponsimg);
    fs.writeFile('./public/uploadimages/'+results[0].couponsimg,'./public/uploadimages/'+req.file.filename,(error)=>{
      if(error){
        res.status(500).send(error);
      }
      else{
        fs.unlink('./public/uploadimages/'+results[0].couponsimg,(error)=>{
          res.status(500).send(error);
        })
      }
    })
  })


   var sql="update Marketing_coupons set name=?,couponsimg=?code=?,discount=?,validity=?,minimumTotal=? where id=?";
   let data=[req.body.name,req.file.filename,req.body.code,req.body.discount,req.body.validity,req.body.minimumTotal,req.body.id];
   console.log(data);
   connection.query(sql,data,function(error,results){
      if(error){
        res.status(500).send(error);
      }
      else{
         res.status(200).send(results);
      }
   })

})


router.get('/fetch/:id',(req,res,next)=>{
  console.log("heloooo frtch");
  const id=req.params.id;
  console.log(id);
  var sql="select * from Marketing_coupons where id=?";
  connection.query(sql,[id],(error,results)=>{
    if(error){
      res.status(500).send(error);
    }
    else{
      res.status(200).send(results);
    }
  })
})

/*
router.get('/coupons/image',(req,res,next)=>{
  console.log("heloooo");
  var sql="select couponsimg from Marketing_coupons ";
  connection.query(sql,(error,results)=>{
    if(error){
      res.status(400).send(error);
    }
    else{
      res.status(200).send(results);
    }
  })
})
*/


couponFetchimage=()=>{
  return new Promise ((resolve,reject)=>{
    var sql="select couponsimg from  coupons";
    connection.query(sql,(error,results)=>{
      if(error){
        return reject(error);
      }
      else{
        return resolve(results);
      }
    })
  })

}

router.get('/coupons/image',async (req,res)=>{
  try{
  const fetchcop=await couponFetchimage();
  res.status(200).send(fetchcop)
  }
  catch(error){
    res.status(200).send(error);
  }

})

module.exports = router;
