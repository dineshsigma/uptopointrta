const {connection} = require('../db');
const bcrypt = require('bcrypt');
function User() {};

User.prototype = {

    
    // Find the user data by id or username.
find : function(user = null, callback)
    {
        // if the user variable is defind


     /*  if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'email';
        }
*/

        // prepare the sql query
        //let sql = `SELECT * FROM Register WHERE ${field} = ?`;


       let sql = 'SELECT * FROM Register WHERE  email=? ';


        connection.query(sql, user, function(err, result) {
            if(err) throw err
            //console.log("helooo");

            if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },






/*
   create : function(body, callback) 
    {

        var pwd = body.password;
        
        // Hash the password before insert it into the database.
        body.password = bcrypt.hashSync(pwd,bcrypt.genSaltSync(10));
        

        // this array will contain the values of the fields.
        var bind = [body.email,body.password];
        //console.log(bind);
        // loop in the attributes of the object and push the values into the bind array.
        for(prop in body){
            bind.push(body[prop]);
        }
        // prepare the sql query
        let sql = `INSERT INTO  Register(email,  password) VALUES (?, ?)`;
        // call the query give it the sql string and the values (bind array)
        db.query(sql, bind, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            callback(result.insertId);
        });
    },

*/



    login : function(email, password, callback)

    {
        
        // find the user data by his username.
       this.find(email, function(user) {
         
           if(user) {
               console.log(user);
               console.log(user.password);
              


               
              if(bcrypt.compareSync(password, user.password)) {
                
                    callback('/dashboard');
                    return;
                
        
                }  

 






          }
           
            callback(null);
        });
        
    }

}

module.exports = User;