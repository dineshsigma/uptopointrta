const connection=require('../db.js');
const con =require('../server.js');
let express=require('express');
let router=express.Router();
const bcrypt=require('bcrypt');



router.get('/fetch', function(req, res){
    console.log("heloooo");
    var params=req.body;

 var sql="select * from  Register";

 connection.query(sql,params,(error,results,fields)=>{
    if(error) throw error
    console.log(results);
 })
})












router.post('/',function(req,res,next){
    console.log("helooo");
    //var params=req.body;
   const id=req.body.id;
   var firstname = req.body.firstname;
   const   lastname=req.body.lastname;
    const  email= req.body.email;
    let password= req.body.password;

    const  telephone=req.body.telephone;

    //phone=telephone.length;
    //console.log(phone);
    let errors = [];

    if(errors.length>0){

    }else{
        if(email){
            connection.query('select email from Register where email=? ',[email],function(error,results,fields){
                if (results.length>0){
                    res.send('Email already exists');
                }
                else{

                    bcrypt.hash(password, 10, (err, hash)=> {
                        if(err)throw err;
                        password = hash;

                        console.log(hash);
                        firstname=req.body.firstname;

                        var sql="insert into Register (id,firstname,lastname,email,password,telephone) values ?";

                        var values=[[id,firstname,lastname,email,hash,telephone]]
                        connection.query(sql,[values],function(error,results,fields){
                            if(error){
                                console.log(error);
                            }
                            else{
                                console.log("register success");
                                console.log(results);

                            }

                        });
                    })
                }
            });
            }else{
                res.send('enter email');
            };
        }


});









module.exports=router;

/*
exports.registerinsert=(req,res)=>{



var params=req.body;
//console.log(params);
    const password=req.body.password;
    //const confirmPassword=req.body.confirmPassword;
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const email=req.body.email;
    const telephone =req.body.telephone;
    if(firstname && lastname && email && password  && telephone){



        var sql="insert into Register(email,password) select email,password from login ";
        connection.query(sql,params,(error,results,fields)=>{
            if(error)throw error;

            console.log("USER REGISTRATION SUCCESS");
            res.send('/app/logincurd/insert');
        })

    }
    else{

        res.send({
            status:"false",
            message:"Incorrect password"
        })



    //console.log("please fill all the details as required");
}
}




        exports.fetch = (req, res) => {
            var  query="select * from Registration";
            connection.query(query,
                function (error, results, fields) {
                    if (error) throw error;
                    res.end(JSON.stringify(results));
                });
        };



        exports.update = (req, res) => {

            var query='UPDATE `Registration` SET firstname=?,lastname=?,email=?,password=?,confirmPassword=?,telephone=? where id=?'

                connection.query(query,
                    [req.body.firstname, req.body.lastname,req.body.email,req.body.password,req.body.confirmPassword,req.body.telephone, req.body.id],
                    function (error, results, fields) {
                        if (error) throw error;
                        res.end(JSON.stringify(results));
                    });
            };



            exports.delete = (req, res) => {
                //console.log(req.body);
                const{id,fullname,lastname,email,password,confirmPassword,telephone}=req.body;
                var query='DELETE FROM `Registration` WHERE `Id`=?'
                connection.query(query,
                    [req.body.id], function (error, results, fields) {
                        if (error) throw error;
                        res.end('Record has been deleted!');
                });
            }


        */



