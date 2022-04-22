//const { genSaltSync, hashSync, compareSync, hash } = require('bcrypt');
const{create,getUserById,getUsers,updateuser,deleteUser,getUserByEmail,getUserByForgetpassword}=require('./user.service');
const{jwt,sign}=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const bodyParser = require('body-parser');
//const router = require('../api/categories');
const tokenList={};

const{genSaltSync,hashSync,compareSync}=require('bcrypt');

module.exports={



      createUser: (req,res)=>{
            const id=req.session.user;
            const body=req.body;
            
            const salt=genSaltSync(10);
            body.password=hashSync(body.password,10);
            

            
const accessLevel=req.body.accessLevel || 0



            create(id,accessLevel,body,(err,results)=>{
                  if(err){
                  
                      res.status(500).send(err);

                  }
                  else{
                   res.status(202).send({
                        success:1,
                        message:"register success",
                        data:results

                  })
            }

            })


      },
      /*
      getUserById:(req,res)=>{
            const id=req.params.id;
            getUserById(id,(error,results)=>{
                  if(error){
                        console.log(error);
                        return;
                  }
                  if(!results){
                        return res.json({
                              success:0,
                              message:"record not found"
                        });
                  }
                  return res.json({
                        success:1,
                        data:results
                  })
            })
      },
      getUsers:(req,res)=>{
            getUsers((error,results)=>{
                  if(error){
                        console.log(error);
                        return;
                  }
                  return res.json({
                        success:1,
                        data:results
                  })

            })
      },
      updateuser:(req,res)=>{
            const body=req.body;
            const salt=genSaltSync(10);
            body.password=hashSync(body.password,salt);
            updateuser(body,(error,results)=>{
                  if(error){
                        console.log(error);
                        return;
                  }
                  /*if(!results){
                        return res.json({
                              success:0,
                              message:"failed to update"

                        })
                  }
                  return res.json({
                        success:1,
                        message:"updated successfully"
                  })
            })
      },
      deleteUser:(req,res)=>{
            const data=req.body;
            deleteUser(data,(error,results)=>{
                  if(error){
                        console.log(error);
                        return;
                  }
                 /* if(!results){
                        return res.json({
                              success:0,
                              message:"record not found"
                        })

                  }
                  return res.json({
                        success:1,
                        message:"deleteed successfully"
                  })

            })
      },*/
login:(req,res,next)=>{
      let body=req.body;
      let token=req.headers.authorization;
      console.log(token);
      console.log(body);






      getUserByEmail(body.email,(err,results)=>{
            console.log("heloo email");
            console.log(body.email);
            console.log(body.password);
           
            //console.log(results.password);
            console.log(results);


           if(err){
                 console.log(error);

           }

          if(!results){
                 return res.status(401).send("Invalid UserName or password")


           }

           const hash=hashSync(body.password,10);

           console.log(body.password);
           console.log(results.password)

          const result=compareSync(body.password,results.password);
          console.log(result);


          if(result){
                 results.password=undefined;
                 const jsonwebtoken=sign({result:results},"qwer123",{expiresIn:'30sec'},
                 //refreshToken=jwt.sign()
                 {

                 })




               return res.status(200).send({//$2b$10$qzZXNYzhuS1EUqP4ozJh6uhkKUxBCa6qXY9FIiTMZO3Pk6mOrsoz.
                      success:1,
                      message:"login successfully",
                      token:jsonwebtoken,




                })


           }
           else{
                 return res.status(401);



           }

     // })




      });


},
forgetpassword:(req,res)=>{
      const body=req.body;
            const salt=genSaltSync(10);
            body.password=hashSync(body.password,salt);
           getUserByForgetpassword(body,(error,results)=>{
                  if(error){
                        console.log(error);
                        return;
                  }
                  return res.json({
                        success:1,
                        message:" password updated successfully"
                  })
})
}



}
