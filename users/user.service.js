
const {connection}=require('../db.js');
module.exports={
  create :(id,accessLevel,data,callback)=>{
    
    var sql='insert into Register (id,name,email,password,telephone,accessLevel)  values  (?,?,?,?,?,?)';
    connection.query(sql
      ,[
       
       id,
        data.name,
        data.email.toLowerCase(),
        data.password,

        data.telephone,
      accessLevel  
      ],
     (error,results,fields)=>{
       if(error){
        return callback(error)
       }


       return callback(null,results)
     }
     );

   },
   /*
   getUsers:callback=>{
    var sql="select id,firstname,lastname,email,password,telephone from Register";
    con.query(sql,
      [

      ],(error,results,fields)=>{
        if(error){
          return callback(error);
        }
        return callback(null,results);

      })

},
getUserById:(id,callback)=>{
  var sql="select id,firstname,lastname,email,password,confirmPassword,telephone from Register where id=?";
  con.query(sql,[id],(error,results,fields)=>{
    if(error){
      return callback(error);
    }
    return callback(null,results[0]);


  })
},
updateuser:(data,callback)=>{
  var sql="update Register set id=?,firstname=?,lastname=?,email=?,password=?,confirmPassword=?,telephone=?";
  con.query(sql,[
    data.id,
        data.firstname,
        data.lastname,
        data.email,
        data.password,
        data.confirmPassword,
        data.telephone

  ],(error,results,fields)=>{
    if(error){
      return callback(error);
    }
    return callback(null,results[0]);
  })
},
deleteUser:(data,callback)=>{
  var sql="delete from Register where id=?";
  con.query(sql,[data.id],(error,results,fields)=>{
    if(error){
      return callback(error);
    }
    return callback(null,results[0]);

  });
},
/*
getUserBypassword:(password,callback)=>{
 var sql="select * from Register  where password=?" ;
 //var sql="insert into profile(firstname,lastname,email,password,telephone) select * from Register where email=?";
  con.query(sql,
    [password],(error,results,fields)=>{
      if(error){
        return callback(error);
      }





      return callback(null,results[0]);
    })
}*/
getUserByForgetpassword:(password,callback)=>{
  var sql="update Register  set  password=? ";
  con.query(sql,[password],(error,results,fields)=>{//$2b$10$cmTNMxvLh7HzKSBVU59u/eVEYkOgcZbeEaaLYl6u6m8Ci.SdarWri
                                                    //$2b$10$02ED1JVsNTiaplu6.cDMfu/kJzlvC85lWoyQFtkWI185jpPF/toCe
    if(error){
      return callback(error);
    }
    else{
      console.log("password reset")
    }
  })
},


getUserByEmail:(email,callback)=>{
  var sql="select * from Register where email=?";


  con.query(sql,
    [email],(error,results,fields)=>{

      if(error){
        return callback(error);
      }
      return callback(null,results[0]);
    })
}
}

