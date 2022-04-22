var express = require('express');
var con = express('./server.js');
var router = express.Router();
var { connection } = require('../db.js');
var fs = require('fs');
var multer = require('multer');


var validation = require('../app/validation');
const { object } = require('joi');
const { json } = require('body-parser');









getmenu = () => {
  return new Promise((resolve, reject) => {
    console.log("hello menu")
    var sql = "select * from Menu_items inner join Categories on Categories.category=Menu_items.category ";
    connection.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      }
      else {
        return resolve(results);
      }
    })
  })
}
router.get('/menu', async (req, res, next) => {
  try {
    const menufetch = await getmenu();

    res.status(200).send(menufetch)

  }
  catch (error) {
    res.status(500).send(error);
  }
})


//FETCH ALL THE VALUES IN menuitems TABLE
/*
router.get('/fetch', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("helooo");

  var sql = "select * from  Menu_items ;";

  connection.query(sql, (err, result, fields) => {
    if (err) {
      //console.log(err);
      res.status(500).send(err);
    } else {
      console.log(result)

      //res.status(200).send(result);

      res.status(200).cookie("menu", 678, { sameSite: "lax", httpOnly: true, Secure: true, expires: new Date(new Date().getTime() + 1000 * 5) }).
        send([result]);
    }


  })


});

*/


/*

var storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    console.log(file);
   
   
    cb(null, 'public/uploadimages');
   
  },
  
  filename: function (req, file, cb) {
   console.log(file);
    cb(null, new Date().toISOString()+ fileExtension(file.originalname));



  }
});

const fileFilter=(req,res,cb)=>{
  if(file.mimetype==='image/jpeg'|| file.mimetype==='image/png'){
  cb(null,true);
  }
  else{
  cb(null,false);
  }
}


let upload = multer({ storage: storage ,limits:{
  fileSize:1000*1000*5
  
},
fileFilter:fileFilter
})

*/
const DIR = './public/uploadimages';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});


const { categoryvalidation } = require('../app/validation');
router.post('/insert',upload.single('avatar'),function (req, res, next) {
console.log("heloooo")
console.log(req.file)
  const url = req.protocol + '://' + req.get('host')
  console.log(req.body);
  console.log(req.file.filename)


 
console.log(req.body);
  


  const menuitems = {
    id: req.body.id,
    image: req.file.originalname,
    name: req.body.name,

    category: req.body.category,
    price: req.body.price,
    stockquantity: req.body.stockquantity,
    quantity: req.body.quantity

  }



  var sql = "insert into Menu_items set ?";

  connection.query(sql, menuitems, function (error, results, fields) {
    if (error) {
      res.status(500).send(error);
    }
    else {
      res.status(200).send(results);
    }

  })


})












//DELETE THE DATA IN  menuitems TABLE

router.delete('/delete/:id', (req, res, next) => {
  const id=req.params.id
  console.log(id);
  
  var sql="delete from Menu_items where id=?";
  connection.query(sql,[id],(error,results)=>{
    if(error){
      res.status(500).send(error);
    }
    else{
      res.status(200).send(results);
    }

  })
  


})


//UPADTE THE DATA IN REGISTARTION TABLE

router.put('/update', categoryvalidation, function (req, res, next) {

  const id = req.body.id,
    image = req.file.filename,
    name = req.body.name,
    category = req.body.category,
    price = req.body.price,
    stockquantity = req.body.stockquantity,
    quantity = req.body.quantity





  var sql = "update Menu_items set image=?, name=? , category=?,price=?,stockquantity=?,quantity=? where id=?";
  let data = [req.body.image, req.body.name, req.body.category, req.body.price, req.body.stockquantity, req.body.quantity, req.body.id];
  connection.query(sql, [image, name, category, price, stockquantity, quantity, id], function (error, results) {
    if (error) {
      res.status(503).send(error);
    } else {
      res.status(200).send(results);
    }

  })

})



/*
//nested json array
router.get('/nest', (req, res) => {
  //var sql="select m.id,m.name,m.category,m.price,m.stockquantity,c.id,c.category,c.price,c.quantity,c.items  from Menu_items m,Categories c where m.id=c.id ";
  //var sql = "select v.vegid,v.vegfood,n.nonvegfood,n.nonvegid,c.id,c.category,c.items,m.id,m.name,m.category,m.price from Menu_items m,Categories c,vegetrain v,nonvegetrain n  where v.vegfood=c.category  ";
  var sql="select c.category,c.area,c.items,m.category ,m.name,m.price,m.stockquantity,m.quantity,m.location ,l.area,m.id,c.id,l.id from Menu_items m,Categories c,Location l where m.category=c.category &&  c.area=l.area  &&m.id=c.id  && c.id=l.id" ;
  connection.query(sql, (error, results) => {
    if (error)
      throw error;

    else {
      let data = results;
      let newresults = [];
      let category = [];
      results.map(row => {
        // console.log(newresults[row.id]);
        if (newresults[row.category]) {

          // newresults[row.id].category.push(row.id, row.items, row.category),
          // newresults[row.id].veg.push(row.vegfood),
          // newresults[row.id].itemdetails.push(row.id, row.name, row.category, row.price),

           // newresults[row.id].nonveg.push(row.nonvegfood)
           newresults[row.category].category.push(row.area,row.category,row.name,row.price,row.stockquantity,row.quantity)
           newresults[row.category].items.push(row.name,row.price,row.stockquantity,row.quantity)
         //  newresults[row.id].menuitems.push(row.id,row.name,row.category,row.price,row.stockquantity,row.quantity)



        }
        else {
          
          // newresults[row.id]={id:row.id, name:row.name, category:[{"id":row.id,"items":row.items,"category":row.category,"price":row.price,"quantity":row.quantity}],price:row.price, stockquantity:row.stockquantity};
         // newresults[row.id] = { veg: [{ vegfood: row.vegfood }], category: [{ id: row.id, items: row.items, category: row.category }], itemdetails: [{ id: row.id, name: row.name, category: row.category, price: row.price }], nonveg: [{ nonvegfood: row.nonvegfood }] }
  //newresults[row.id]={category:[{category:row.category}],menuitems:[{id:row.id,name:row.name,category:row.category,price:row.price,stockquantity:row.stockquantity,quantity:row.quantity}]}
 // newresults[row.category]={area:row.area,category:[{category:row.category,name:row.name,price:row.price,stockquantity:row.stockquantity,quantity:row.quantity}]}
// newresults[row.category]=[{area:row.area,category:[{category:row.category,items:[{name:row.name,price:row.price,stockquantity:row.stockquantity,quantity:row.quantity}]}]}]
let v1=[[{name:row.name,price:row.price,stockquantity:row.stockquantity,quantity:row.quantity}]]


//newresults[row.category]=[{area:row.area,category:[{category:row.category,items:v1}]}]
newresults[row.category]=[area=row.area,category=row.category,items=v1]
        }
      })
      
      res.send(newresults);
    }

  })
})
*/
router.get('/nest/:id', async (req,res)=> {

  let id=38;

  var sql=" SELECT * FROM Location where id=?";
  let location=[];

 let results=await connection.query(sql,[id],(error,results)=>{
   if(error){
console.log(error);
   }
   else{
     //console.log(results);
     location.push(results)
     //console.log(results[0].id);
     var sql="select * from Categories where id=?";
     let categories= connection.query(sql,[results[0].id],(error,results)=>{
       if(error){
         console.log(error);
       }
       else{
         console.log(location[0])
        let locwithcat=[
          {id:location[0].id,
          email:location.email,
          city:location.city,          
          pincode:location.pincode,
          phonenumber:location.phonenumber,
          categories:[]
        }];
         

//console.log(locwithcat)

       }
     })



   }
 })
 //console.log(results)
}
)




module.exports = router;
