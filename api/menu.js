let express = require('express'),
  multer = require('multer'),
  
  router = express.Router();
  const { connection } = require('../db');

  let sharp=require('sharp')
  const path=require('path')
  let compress_images=require('compress-images')

// Multer File upload settings

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
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
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

//-----------------------------------------------------fetch all values from Menu Table-------------------------------------------------------------//
router.get('/fetch',(req,res)=>{
  
  var sql="select * from Menu_items ";
  
  connection.query(sql,(error,results)=>{
    if(error){
      res.status(500).send(error);
    }
    else{
     
      res.status(200).send(results);
    }
  })

})



//---------------------------------------------FETCH ALL DETAILS IN LOCATION,CATEGORIES,MENUITEMS-----------------------------------//
router.get('/nestarray',(req,res)=>{
  

var sql=" select  * from Location,Menu_items,Categories";


  connection.query(sql,(error,results)=>{
    if(error){
      res.status(400).send(error);
    }
    else{
      res.status(200).send(results);
    }
  })
})
  
//------------------------------------------fetch cat_id in category table------------------------------------------------------------//
router.get('/nestcategory',(req,res)=>{
  var sql="select cat_id from Categories";
  connection.query(sql,(error,results)=>{
    if(error){
      res.status(400).send(error);
    }
    else{
      res.status(200).send(results);
    }
  })
})

//----------------------------------------------------------------------INSERT MENU  ITEMS -----------------------------------------------------------------//


menu=(men_id,cat_id,loc_id,menuname,image,price,stockquantity,quantity)=>{
  
  return new  Promise((resolve,reject)=>{
    var sql="insert into Menu_items(men_id,cat_id,loc_id,name,image,price,stockquantity,quantity) values(?,?,?,?,?,?,?,?)";
    connection.query(sql,[men_id,cat_id,loc_id,menuname,image,price,stockquantity,quantity],(error,results)=>{
      if(error){
        return reject(error);
      }
      else{
        return resolve(results);
      }

    })
  })
}

router.post('/create-user',upload.single('avatar'), async (req,res)=>{
    console.log(req.file.filename)

    
/*
    const { filename: image } = req.file;
       
       await sharp(req.file.path)
        .resize(250, 250)
        .jpeg({ quality: 90 })
        .toFile(
            path.resolve(req.file.destination,"resize",image)
        )
        console.log(req.file.destination)
        //fs.unlinkSync(req.file.path)*/
    
   
/*
  let compress=path.join(__dirname,'../','public','uploadimages',req.file.filename)
  compress_images(compress, req.file.path, { compress_force: false, statistic: true, autoupdate: true }, false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
function (error, completed, statistic) {
console.log("-------------");
console.log(error);
console.log(completed);
console.log(statistic);
console.log("-------------");
}
);
  /*
  sharp(resizeimage).resize(250,250)
    .toFile(compress,(err,info)=>{
    if(err){
      console.log(err)
      res.status(400).send(err)
    }
  })*/




  try{


    if(req.file!=null){
   const  men_id=req.body.men_id,
    cat_id=req.body.cat_id,
    loc_id=req.body.loc_id,
    name=req.body.name,
    image=req.file.filename,
    price=req.body.price
    stockquantity=req.body.stockquantity,
    quantity=req.body.quantity


const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
menuname=uppercaseWords(req.body.name)
console.log(menuname)

   

    const createmenu= await menu(men_id,cat_id,loc_id,menuname,image,price,stockquantity,quantity);
    res.status(200).send(createmenu);
    }
    else{
      res.status(400).send("IMAGE FIELD IS MANDATORY")
    }


  }
  catch(error){
    
res.status(400).send(error);
  
    
  }
})



//---------------------------------------------------------------DELETE MENU----------------------------------------------------------------//

const fs=require('fs');
deleteMenu=(men_id)=>{

  return new Promise((resolve,reject)=>{
console.log(men_id)
    var sql="select image from Menu_items where men_id=?"
    connection.query(sql,[men_id],(error,results)=>{
      if(error){
        return reject(error);
      }
      else{
        console.log(results)
       
        fs.unlink('./public/uploadimages/'+results[0].image,(error)=>{
          if(error) throw error;
        })
      }
       var sql="delete from Menu_items where men_id=?";
       connection.query(sql,[men_id],(error,results)=>{
         if(error){
           return reject(error);
         }
         else{
           return resolve(results);
         }

       })


    })

  })
}

router.delete('/delete/:men_id',async (req,res)=>{

  try{
    const men_id=req.params.men_id;
    

    const deletemenu=await deleteMenu(men_id);
    res.status(200).send(deletemenu);

  }
  catch(error){
    res.status(400).send(error);
   

  }

})
//-------------------------------------------------------UPDATE MENU----------------------------------------------------//

UpdateMenu=(men_id,loc_id,cat_id,menuname,image,price,stockquantity,quantity)=>{
  
  
  return new Promise((resolve,reject)=>{

var sql="select image from  Menu_items where  men_id=?";
connection.query(sql,[men_id],(error,results)=>{
  if(error){
    return reject(error);
  }
  else{
   
    fs.writeFile('./public/uploadimages/'+results[0].image,'./public/uploadimages/'+image,(error)=>{
      if(error) throw error;
      fs.unlink('./public/uploadimages/'+results[0].image,(error)=>{
        if(error) throw error;
      })
    })
  }

  var sql="update Menu_items set loc_id=?,cat_id=?,name=?,image=?,price=?,stockquantity=?,quantity=? where men_id=?";

  let data=[loc_id,cat_id,menuname,image,price,stockquantity,quantity,men_id];
  
  
  connection.query(sql,data,(error,results)=>{
    if(error){
      return reject(error);
    }
    else{
      return resolve(results);
    }
  })
})

})



}


fetchUpdate=(men_id,loc_id,cat_id,menuname,image,price,stockquantity,quantity)=>{
 
  
  return new Promise((resolve,reject)=>{
    var sql="select image from Menu_items where men_id=?";
    connection.query(sql,[men_id],(error,results)=>{
      if(error){
        return reject(error);
      }
      else{
        
         image=results[0].image
         
        const category=cat_id;
        
        var sql="update Menu_items set loc_id=?,cat_id=?,name=?,image=?,price=?,stockquantity=?,quantity=? where men_id=?";
        let data=[loc_id,cat_id,menuname,results[0].image,price,stockquantity,quantity,men_id];
        connection.query(sql,data,(error,results)=>{
          if(error){
            return reject(error);
          }
          else{
            return resolve(results);
          }
        })
      }

    })

  })

}


router.put('/update',upload.single('avatar'),async (req,res)=>{

  
  try{
    if(req.file!=null){
      const men_id=req.body.id,
      loc_id=req.body.area,
      cat_id=parseInt(req.body.category),
      name=req.body.name,
      image=req.file.filename,
      price=req.body.price,
      stockquantity=req.body.stockquantity,
      quantity=req.body.quantity

const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
menuname=uppercaseWords(req.body.name)
console.log(menuname)

      const update=await UpdateMenu(men_id,loc_id,cat_id,menuname,image,price,stockquantity,quantity);
      res.status(200).send(update);

    }
    else{

      try{
      
       
        
        const men_id=req.body.id,
        loc_id=req.body.area,
        cat_id=req.body.category,
        name=req.body.name,
       image=req.body.avatar,
        price=req.body.price,
        stockquantity=req.body.stockquantity,
        quantity=req.body.quantity

const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
menuname=uppercaseWords(req.body.name)
console.log(menuname)
        const fetchupdate= await fetchUpdate(req.body.id,loc_id,cat_id,menuname,image,price,stockquantity,quantity);
        res.status(200).send(fetchupdate);


      }
      catch(error){
        console.log(error)
        
        res.status(400).send(error)

      }

    }

  }
  catch(error){
    
res.status(400).send(error);

  }
})

//--------------------------------------------FETCH ALL THREE TABLRES DETAILS---------------------------------------------------------------//

fetchDetails=()=>{
  return  new Promise((resolve,reject)=>{
    var sql="select m.men_id,l.area,m.image,c.cat_id,c.category,m.name,m.price,m.stockquantity,m.quantity \
    from Menu_items m,Location l,Categories c \
    where m.loc_id=l.loc_id and m.cat_id=c.cat_id" ;
    connection.query(sql,(error,results)=>{
      if(error){
        return  reject(error);
      }
      else{
        return resolve(results);
      }
    })
  })
}


router.get('/fetch/menu/menu' ,async (req,res)=>{
  try{
    const fetchAll= await  fetchDetails();
    res.status(200).send(fetchAll)

  }
  catch(error){
    
    res.status(400).send(error)

  }
})


//---------------------------------------------------FETCH MENU BY ID-------------------------------------------------------------//
MenuById=(men_id)=>{
  return new Promise((resolve,reject)=>{
    var sql="select * from Menu_items where men_id=?";
   
    connection.query(sql,[men_id],(error,results)=>{
      if(error){
        return reject(error);
      }
      else{
        return resolve(results);
      }
    })
  })

}

router.get('/fetch/:men_id',async (req,res)=>{
  try{ 
    const men_id=req.params.men_id;
    console.log(men_id);

    const fetchByid= await MenuById(men_id);
    res.status(200).send(fetchByid);

  }
  catch(error){
    res.status(400).send(error);

  }


})




module.exports = router;

