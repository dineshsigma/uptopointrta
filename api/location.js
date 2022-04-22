var express = require('express');

var con=express('./server.js');

var router = express.Router();

var { connection }=require('../db.js');

const {locationemail} =require('../app/validation');
//another method for fetch the location

//---------------------------------------------------LOCATION FETCH-----------------------------------------------------------//
getLocation=()=>{
  return new Promise((resolve,reject)=>{
    var sql="select   * from Location";
    connection.query(sql,(err,results)=>{
     if(err) return reject(new Error('sql query error'));
       
     
     return resolve(results)
  })
})
}

//fetch location table values
router.get('/locfet',async (req,res,next)=>{
  try{
  const fetchlocation=await getLocation();
  var jsondata=fetchlocation;

res.status(200).send(jsondata);


  }
  catch(err){
    
    
  res.status(400).send(err.message);
    
  }
})

//-------------------------------LOCATION INSERT----------------------------------------------------------------//


locationInsert=(loc_id,email,city,status,area,pincode,phonenumber)=>{
  return new Promise((resolve,reject)=>{

    var sql="insert into Location(loc_id,email,city,status,area,pincode,phonenumber) values(?,?,?,?,?,?,?)";

    connection.query(sql,[loc_id,email,city,status,area,pincode,phonenumber],(error,results)=>{
      if(error){
        return reject (error);
      }else{
      return resolve (results);
      }
    })

  })
}


router.post('/insert',async (req,res)=>{
  try{
    const loc_id=req.body.loc_id,
    email=req.body.email,
    city=req.body.city,
    area=req.body.area,
    status=req.body.status,
    pincode=req.body.pincode,
    phonenumber=req.body.phonenumber

    const LocationInsert= await locationInsert(loc_id,email,city,status,area,pincode,phonenumber);

    res.status(200).send(LocationInsert);

  }
  catch(error){
     res.status(400).send(error);

  }
})


//-------------------------------------------DELETE LOCATION--------------------------------------------------------//

fetchchild=(loc_id)=>{
  return  new Promise((resolve,reject)=>{
   if(loc_id){
     var sql="select * from Categories where loc_id=?";
     connection.query(sql,[loc_id],(error,results)=>{
      if(results.length>0){
        
        
return reject(new Error('DELETE CHILD-TABLE:CATEGORIES'))
      }
      else{
        var sql="delete from Location where loc_id=?";
        connection.query(sql,[loc_id],(error,results)=>{
          if(error){
            return reject(error);
          }
          else{
            return resolve (results);
          }
        })

      }
     })

   }
  })

}





router.delete('/delete/:loc_id', async function(req,res,next){
  try{
    const  loc_id=req.params.loc_id;
  

    const fetch =await fetchchild(loc_id);
    
    res.status(200).send(fetch);
    
    
    
  }
  catch(error){
  
res.status(400).send(error.message)
}
})






//--------------------------------------------LOCATION FETCH BY ID---------------------------------------------------------------//



locationFetchByid=(loc_id)=>{
  return new  Promise((resolve,reject)=>{
    var sql="select * from Location where loc_id=?";
    connection.query(sql,[loc_id],(error,results)=>{
      if(error){
        return reject(error);

      }
      else{
         return resolve(results); 
       
      }
    })
  })

}



router.get('/fetch/:loc_id',async (req,res)=>{
  
  try{

    var loc_id=req.params.loc_id;

  const LocationById=  await  locationFetchByid(loc_id);
  res.status(200).send(LocationById);

  }
  catch(error){
 
    res.status(400).send(error);
    

  }
})




//-------------------------------------------------------LOCATION FETCH------------------------------------------------------------//

fetLocation=()=>{

  return new Promise((resolve,reject)=>{

    var sql="select * from Location ";

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

    const fetch=await fetLocation();

    res.status(200).send(fetch)

  }
  catch(error){
    
    res.status(400).send(error);
    

  }
})




//-------------------------------------------LOCATION UPDATE--------------------------------------------------//



router.put('/update',(req,res)=>{

    var sql="update Location set email=?,city=?,status=?,area=?,pincode=?,phonenumber=? where loc_id=?";

    let data=[req.body.data.email,req.body.data.city,req.body.data.status,req.body.area,req.body.data.pincode,req.body.data.phonenumber,req.body.data.loc_id];

    connection.query(sql,data,(error,results)=>{

    if(error){
res.status(400).send(error);
    }
    else{
res.status(200).send(results);
}

  })

  
})

module.exports = router;
