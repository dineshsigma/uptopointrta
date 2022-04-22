const express=require('express');
const router=express.Router();
var {connection}=require('../db')

/*
router.get('/fetch',(req,res,next)=>{
    console.log("heloooo");
    var sql="select * from contact_info";
    db.query(sql,(error,results)=>{
        if(error){
            res.status(400).send(error);
        }
        else{
            res.status(200).send(results);
        }
    })
})

router.get('/fetch/:id',(req,res,next)=>{
    console.log("fetch by id");
    const id=req.params.id;
    console.log(id);
    var sql="select * from contact_info where id=?";
    db.query(sql,[id],(error,results)=>{
        if(error){
            res.status(400).send(error);
        }
        else{
            res.status(200).send(results);
        }
    })
})


router.post('/insert',(req,res,next)=>{
    console.log("heloooo post");
    const contact={
        id:req.body.id,
        address:req.body.address,
        pincode:req.body.pincode,
        email:req.body.email,
        phonenumber:req.body.phonenumber


    }

    var sql="insert into contact_info set ?";
    db.query(sql,contact,(error,results)=>{
        if(error){
            res.status(400).send(error);
        }
        else{
            res.status(200).send(results);
        }
    })
})



router.delete('/delete/:id',(req,res)=>{
    var id=req.params.id;
    console.log(id);
    var sql="delete from contact_info where id=?";
    db.query(sql,[id],(error,results)=>{
        if(error){
            res.status(400).send(error);
        }
        else{
            res.status(200).send(results);
        }
    })

})

router.put('/update',(req,res,next)=>{
    console.log("helooo");
    var sql="update contact_info set address=?,pincode=?,email=?,phonenumber=? where id=? ";
    let data=[req.body.address,req.body.pincode,req.body.email,req.body.email,req.body.phonenumber,req.body.id];
    db.query(sql,data,(error,results)=>{
        if(error){
            res.status(400).send(error);
        }
        else{
            res.status(200).send(results);
        }
    })
})*/
//-----------------------------------------------contact info-------------------------------------------------//
contactfetch=()=>{
    return new Promise((resolve,reject)=>{
        var sql="select * from contact_info";
        connection.query(sql,(error,results)=>{
            if(error){
                return reject(error);
            }
            else{
                return resolve(results);
            }
        })

    })
}




router.get('/fetch',async (req,res)=>{
    try{
        const fetch=await contactfetch();
        res.status(200).send(fetch)

    }
    catch(error){
        res.status(400).send(error);

    }

})

//----------------------------------------------------insert contactinfo-----------------------------------------------------//

contactinsert=(con_id,address,email,pincode,phonenumber)=>{
    return new Promise((resolve,reject)=>{
        var sql="insert into contact_info(con_id,address,email,pincode,phonenumber) values(?,?,?,?,?)";
        let data=[con_id,address,email,pincode,phonenumber];
        connection.query(sql,data,(error,results)=>{
            if(error){
                return reject(error);
            }
            else{
                return resolve(results);
            }
        })
    })

}



router.post('/insert',async (req,res)=>{
    try{
        const con_id=req.body.con_id,
        address=req.body.address,
        email=req.body.email,
        pincode=req.body.pincode,
        phonenumber=req.body.phonenumber

        const insert=await contactinsert(con_id,address,email,pincode,phonenumber)
        res.status(200).send(insert);

    }
    catch(error){
        res.status(400).send(error);

    }
})

////--------------------------------------------delete Contact_info-------------------------------------------------------//
deleteContactById=(con_id)=>{
    return  new Promise((resolve,reject)=>{
        var sql="delete from contact_info where con_id=?";
        connection.query(sql,[con_id],(error,results)=>{
            if(error){
                return reject(error);
            }
            else{
                return resolve(results);
            }
        })

    })
}




router.delete('/delete/:con_id',async (req,res)=>{
    
    try{
        const  con_id=req.params.con_id;
    
    const deletecontact=await deleteContactById(con_id);
    res.status(200).send(deletecontact)

    }
    catch(error){
        res.status(500).send(error);

    }

})
///---------------------------------------update contact_info----------------------------------------------------//

updatecontact=(con_id,address,email,pincode,phonenumber)=>{
    
    return  new Promise((resolve,reject)=>{
        var sql="update contact_info set  address=?,email=?,pincode=?,phonenumber=? where con_id=?";
        let data=[address,email,pincode,phonenumber,con_id]
        connection.query(sql,data,(error,results)=>{
            if(error){
                return reject(error);
            }
            else{
                return resolve(results);
            }
        })

    })
}




router.put('/update',async (req,res)=>{
    
    try{
        const con_id=req.body.con_id,
        address=req.body.address,
        email=req.body.email,
        pincode=req.body.pincode,
        phonenumber=req.body.phonenumber

        const update=await updatecontact(con_id,address,email,pincode,phonenumber);
        res.status(200).send(update);

    }
    catch(error){
        res.status(400).send(error)

    }
})

///------------------------------------------contact fetch by id---------------------------------------------------------------///

fetchId=(con_id)=>{
    return new Promise((resolve,reject)=>{
        var sql="select * from  contact_info where con_id=?";
        connection.query(sql,[con_id],(error,results)=>{
            if(error){
                return reject(error);
            }
            else{
                return resolve(results);
            }
        })
    })

}


router.get('/fetch/:con_id',async (req,res)=>{
    try{
        const con_id=req.params.con_id;
        
        const fetchcontactById=await fetchId(con_id); 
        res.status(200).send(fetchcontactById)
        

    }
    catch(error){
        res.status(400).send(error)
    }
})
module.exports=router;