var {connection}=require('../db.js');
var {compareSync}=require('bcrypt');

//validation for email in registration table
let emailvalidation=(req,res,next)=>{
  email=req.body.email;
  if(email){
    var sql="select * from Register where email=?";
    connection.query(sql,[email],function(err,results){
      if(results.length > 0){
        res.send("email already register");
      }
      else{
        next();
      }
    })

  }

}

//validation for phonenumber in registration table
let validation=(req,res,next)=>{


    telephone=req.body.telephone;
  
  let phone=telephone.length;
  
  email=req.body.email;
  if(phone!==10) res.status(400).send("phone number is not  valid");
  if(phone==10){
    var sql="select * from  Register where telephone=?";
    connection.query(sql,[telephone],function(err,result){
      if(result.length > 0){
        res.status(409).send({error:"ALREADY REGISTERD  WITH THIS MOBILENUMBER"})

      }
      else{
        next();
      }

    })
  }


}

//validation for category in MENU_ITEMS table
  let categoryvalidation=(req,res,next)=>{
    category=req.body.category;

    if(category){
    var sql="select * from Categories where category=?";
    connection.query(sql,[category],(error,results)=>{
      if(results.length > 0){
        res.send(category +"  " +"THIS CATEGORY IS ALREADY ADD:PLEASE ADD NEW  CATEGORY")

      }
      else{

        next();
      }
    })
    }

  }
//validation for category in category table

  let menucategory=(req,res,next)=>{
    category=req.body.category;
    if(category){
      var sql="/select * from  Categories where category=?";
      connection.query(sql,[category],(error,results)=>{
        if(results.length > 0){
          res.send(category+" "+"THIS ITEM IS ALREADY ADDED:PLEASE ADD NEW ITEMS")
        }
      })
    }
  }


//email validation for Register
  let email=(req,res,next)=>{

      email=req.body.email,
      password=req.body.password
     // console.log(email);

      if(email){

    var sql="select * from Register  where email=?";
    connection.query(sql,[email],(error,results)=>{
      //console.log(results.length);
      //console.log(results);
      //console.log(results);
      if(results.length > 0){

next();
      }
      else{
        res.status(404).send("invalid email:email not found");
      }

    })
  }
  else{
    res.status(400).send("please enter email");
  }

  }

/*
const {verify}=require('jsonwebtoken');
const { compareSync } = require('bcrypt');

let token=(req,res,next)=>{
  const token=req.headers.authorization;
  console.log(token);
  if(token){
    console.log(token);
    verify(token,'qwer123',(error,results)=>{
      if(error){
        res.status(401).json({

          success:0,
          message:"invalid token"
      });
      }
      else{
        next();
      }
    })

  }
  else{

    res.status(401).json({

      success:0,
      message:"access is denied unauturised user"
  })


  }
}*/


//validation for password in register table in data base

let password=(req,res,next)=>{
  const password=req.body.password;
  const email=req.body.email;
  //console.log(password);

if(password){
var sql="select password from Register where email=?";
connection.query(sql,[req.body.email],(error,results)=>{
  const compare=compareSync(req.body.password,results[0].password);
  //console.log(compare);
  if(compare){
    next();

  }
  else{
    return res.status(404).send("incorrect password:please enter valid password");
  }

})

}
else{
  res.status(400).send("please enter password")
}
}


let logout=(req,res,next)=>{

  if(req.session.id){
    console.log(req.session.id)
    next();

  }
  else{
  res.status(401).send('unthorised user');
  }
}


let auth=function(req,res,next){
  console.log(req.body.email);
  if(req.body!=undefined){
    
  }
  else{
  res.status(400).send("please login first")
  }

}

let locationemail=function(req,res,next){
  const email=req.body.email;
  next();
    

}

module.exports={
  validation,
  emailvalidation,
  categoryvalidation,
  menucategory,
  password,
  email,
  locationemail,

  logout,
  auth
};

