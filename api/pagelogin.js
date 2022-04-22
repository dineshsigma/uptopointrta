




const express = require('express');
const User = require('../app/login.js');
const router = express.Router();
const server=require('../server.js');
const db=require('../db.js');


const user = new User();


router.post('/login', (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data). 
    
    console.log(req.body.email);
    console.log(req.body.password);
    


    //console.log(req.body.user.password);
    //console.log(req.body.password);
    //console.log(req.body.password);
    
    

    user.login(req.body.email, req.body.password, function(result) {
        if(result) {
           console.log("login successfully");
           res.redirect('/dashboard')
            
         //res.redirect('http://localhost:4200/#/dashboard');
        }else {
            // if the login function returns null send this error message back to the user.
            //res.send('Email/Password Incorrect!');
            console.log("invalid email/password");
           // res.redirect('http://localhost:4200/#/login');
        }
    })

});
module.exports = router;//$2b$10$hjVEkTZZJ79poTjKPKsVzuk6MBJbekSzf1eIebYW58V