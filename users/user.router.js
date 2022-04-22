const {createUser,login,forgetpassword}=require('./user.controller');
const router=require('express').Router();

const {connection}=require('../db');
const {validation,emailvalidation}=require('../app/validation');


const {checkToken,token}=require('../app/token_validation')

const {refreshToken} =require('../refresh/refreshtoken');

router.post('/',
    validation, emailvalidation, createUser);

   

router.post('/login',login);
router.put('/forgetpassword',forgetpassword);

router.post('/checktoken',login);


router.post('/checktoken',login);


router.get('/fetchuser',(req,res)=>{
    var sql="select * from Register where accessLevel=0";
    connection.query(sql,(error,results)=>{
        if(error){
            res.status(400).send(error)
        }
        else{
            res.status(200).send(results);
        }
    })

})

router.get('/fetchuser/:id',(req,res)=>{
    const id=req.params.id;

    var sql="select * from Register where id=?";
    connection.query(sql,[id],(error,results)=>{
        if(error){
            res.status(400).send(error)
        }
        else{
            res.status(200).send(results);
        }
    })
})

module.exports=router;
