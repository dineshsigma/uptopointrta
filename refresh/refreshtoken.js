const express = require('express');
const router = express.Router();
const { connection } = require('../db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

const tokenList = {};

const app = require('../server.js');
const {
  hashSync,
  compareSync,
} = require('bcrypt');
const {
  email,
  token,
  password,
} = require('../app/validation');

const { login } = require('../users/user.router');

//login
router.post('/checkadmin', (req, res) => {
  //console.log(req.session.ADMIN_EMAIL);//user_id
  // console.log(req.body.token);//Notification_id

  if (req.session.ADMIN) {
    const notification_id = req.body.token,
      user_id = req.session.ADMIN_EMAIL;

    var sql =
      'select * from  notification where user_id=?';
    connection.query(
      sql,
      [user_id],
      (error, results) => {
        if (results.length > 0) {
          var sql =
            'update notification set notification_id=? where user_id=?';
          connection.query(
            sql,
            [notification_id, user_id],
            (error, results) => {
              if (error) {
                console.log(error);
              } else {
                res.status(200).send(results);
              }
            }
          );
        } else {
          var sql =
            'insert into notification(user_id,notification_id) values(?,?)';
          connection.query(
            sql,
            [user_id, notification_id],
            (err, result) => {
              if (result) {
                res.status(200).send(result);
              }
            }
          );
        }
      }
    );
  } else {
    res.status(401).send({
      login: 'USER IS NOT LOGGED IN',
    });
  }
});

/*
router.post('/login',email,password, (req,res) => {
  

  const postData = req.body;
  
 

  const user = {
    
      "email": postData.email,
      "password": postData.password
    }



if(user.email){
  var sql="select password,id,accessLevel from Register where email=?  ";
  connection.query(sql,[user.email],(error,results)=>{
 

const result=compareSync(user.password,results[0].password);
    if (result) {

  const token = jwt.sign(user, process.env.TOKENSECRET, {expiresIn:'10min'})

  const refreshToken = jwt.sign(user, process.env.REFRESHTOKEN_SECRET, {expiresIn:'10min'})

     const id=results[0].id;
      const accessLevel = results[0].accessLevel;
      if (accessLevel === 1) {
        req.session.ADMIN = accessLevel
        
      }

      const response = {
    id :id,
    AccessLevel:accessLevel,
success:1,
message:"login successfully",
    "token":token,
    "refreshToken":refreshToken
  }
  tokenList[refreshToken] = response;
 
  req.session.user=token;
  

      res.status(200)
        .cookie("login", token,
          {
            httpOnly: true,
            sameSite: "strict",
            path:"/",
            Secure: true,
            expires: new Date(new Date().getTime() + 1000*45*60 )
          }).send([response]);

}
else{
  return res.status(401).send("incorrect password:please enter valid password");
}


})


}
else{
  res.status(400).send("enter email  ");
}

})
*/

//token

router.post('/token', (req, res) => {
  const postData = req.body;

  if (
    postData.refreshToken &&
    postData.refreshToken in tokenList
  ) {
    const user = {
      email: postData.email.trim(),
      password: postData.password.trim(),
    };
    const token = jwt.sign(
      user,
      process.env.TOKEN
    );
    const response = {
      token: token,
    };

    tokenList[
      postData.refreshToken
    ].token = token;
    res.status(200).json(response);
  } else {
    res
      .status(404)
      .send('your request is invalid ');
  }
});

//token validation

const ga = require('../app/token_validation');
router.use('/fresh', ga, function (req, res) {
  res.send(200).send('my code is securd');
});

///logout

const { logout } = require('../app/validation'); //validation for logout
const { decodeBase64 } = require('bcryptjs');
const {
  default: formatErrorResponse,
} = require('payload/dist/express/responses/formatError');

router.get('/logout', function (req, res) {
  req.session.destroy(function (error) {
    if (error) {
      res.status(500).send(error);
    }
  });
  res.status(200).clearCookie('login').send({
    message: 'cookie cleared',
    logout: 'Logout Sucessfull',
  });
});

UserDetails = (email, password) => {
  return new Promise((resolve, reject) => {
    if (email) {
      var sql =
        'select * from Register where email=?';
      connection.query(
        sql,
        [email],
        (error, results) => {
          if (error) throw error;
          else if (results.length > 0) {
            //console.log(results[0].email);
            var sql =
              'select password,id,accessLevel from Register where email=?';
            connection.query(
              sql,
              [results[0].email],
              (error, results) => {
                const compare = compareSync(
                  password,
                  results[0].password
                );

                if (compare) {
                  const user = {
                    email,
                    password,
                  };

                  console.log(
                    process.env.TOKENSECRET
                  );
                  console.log(
                    process.env
                      .REFRESHTOKEN_SECRET
                  );
                  const token = jwt.sign(
                    user,
                    process.env.TOKENSECRET,
                    { expiresIn: '10min' }
                  );

                  const refreshToken = jwt.sign(
                    user,
                    process.env
                      .REFRESHTOKEN_SECRET,
                    { expiresIn: '10min' }
                  );
                  console.log(refreshToken)

                  const accessLevel =
                    results[0].accessLevel;

                  const id = results[0].id;

                  const response = {
                    ID: id,
                    AccessLevel: accessLevel,
                    message: 'login success',
                    token: token,
                    refreshToken: refreshToken,
                  };
                  return resolve(response);
                } else {
                  return reject(error);
                }
              }
            );
          } else {
            return reject(error);
          }
        }
      );
    }
  });
};

router.post('/login', async (req, res, next) => {
 
  try {
    let email = req.body.email.trim();
    let password = req.body.password.trim();

    const users = await UserDetails(
      email,
      password
    );
    req.session.email = email;

    if (users.AccessLevel === 1) {
      req.session.ADMIN = users;
      req.session.ADMIN_EMAIL = email;
    }

    res
      .status(200)
      .cookie('login', token, {
        httpOnly: true,
        sameSite: true,
        path: '/',
        Secure: true,
        signed: true,
        expires: new Date(
          new Date().getTime() + 1000 * 45 * 60
        ),
      })
      .send([users]);
  } catch (err) {
    res
      .status(400)
      .send('invalid email/password');
  }
});

module.exports = router;
