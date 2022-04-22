const {verify}=require('jsonwebtoken');
const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
/*
module.exports={
    checkToken:(req,res,next)=>{

        console.log("checktoken");


        let toke=req.headers.authorization;
        console.log(toke);

        let token=req.get("authorization");
        console.log(token);
        if(token){
            console.log(token);
            token=token.slice(7);
            verify(token,"qwer123",(error,decoded)=>{
                if(error){
                    res.json({
                        success:0,
                        message:"invalid token"
                    });

                }else{
                    next();
                }

            })

        }
        else{
            res.json({
                success:0,
                message:"access is denied unauturised user"
            })
        }
    }
  }


*/

//function checkToken(req,res,next){
  let checkToken=(req,res,next)=>{

  console.log("heloo check");

  let token=req.headers.authorization;
  console.log(token);
  //let tok=req.get("authorization");
  //console.log(tok);

  if(token){
    console.log("heloo token");


    console.log(token)
verify(token,"qwer123",(error,decoded)=>{
      console.log("heloo decoded");
      console.log(decoded);

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
}




module.exports = (req,res,next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']

  //const token=req.headers.authorization;
  console.log(token);

  if (token) {

    jwt.verify(token, 'qwer123', function(err, decoded) {
        if (err) {
          console.log(err);
            return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
        }
      req.decoded = decoded;
      console.log(req.decoded);
      res.status(200).send("i am secured");
      next();
    });
  } else {

    return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
    });
  }
}



module.exports=checkToken;
