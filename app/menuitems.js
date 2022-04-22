const { connection }=require('../db.js');
const con =require('../server.js');
const express=require('express');
const path = require("path") 
const multer = require("multer") 
const app = express() ;
const router=express.Router();



var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
  
        // Uploads is the Upload_folder_name 
        cb(null, "public/uploadimages") ;
    }, 
    filename: function (req, file, cb) { 
      cb(null, file.fieldname + "-" + Date.now()+".jpg") 
    } 
  }) 
  var upload = multer({  
    storage: storage, 
    //limits: { fileSize: maxSize }, 
    fileFilter: function (req, file, cb){ 
    
        // Set the filetypes, it is optional 
        var filetypes = /jpeg|jpg|png/; 
        var mimetype = filetypes.test(file.mimetype); 
  
        var extname = filetypes.test(path.extname( 
                    file.originalname).toLowerCase()); 
        
        if (mimetype && extname) { 
            return cb(null, true); 
        } 
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes); 
      }  
  
// mypic is the name of file attribute 
}).single("image");        
router.post("/",function (req, res, next) { 
        
    // Error MiddleWare for multer file upload, so if any 
    // error occurs, the image would not be uploaded! 
    upload(req,res,function(err) { 
  
        if(err) { 
  
            // ERROR occured (here it can be occured due 
            // to uploading image of size greater than 
            // 1MB or uploading different file type) 
            //res.send(err) 
            console.log(err);
        } 
        else { 
            console.log("dhfbdsfjkgbfjkbg")
            //console.log(req.file.originalname)
            console.log(req.files);
            var id=req.body.id;
        var name=req.body.name;
        var category=req.body.category;
    var image=req.body.image;
        var price=req.body.price;
        var stockquantity=req.body.stockquantity;



        var sql="INSERT INTO `Menu_items`(`id`,`image`,`name`,`category`, `price` ,`stockquantity`) VALUES ('" + id + "','" + image + "','" +name + "','" + category + "','" +price + "','" + stockquantity+ "')";
        connection.query(sql,function(err,res){
            if(err){
                console.log(err);
            }
            else{
                console.log("success");
            }
        })
            






  
            // SUCCESS, image successfully uploaded 
            res.send("Success, Image uploaded!") 
        } 
    }) 
}) 


















module.exports=router;

/*
exports.Menufetch = (req, res) => {
    var  query="select * from Menu_items";
    connection.query(query,
                    function (error, results, fields) {
                        if (error) throw error;
                        res.end(JSON.stringify(results));
                        
                    });
            };*/