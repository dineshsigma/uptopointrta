const express=require('express');

const router=express.Router();

const {connection} =require('../db.js');

//----------------------------------------------fetch all values from supportcontact table------------------------------------//

supfet=()=>{
    return new Promise((resolve,reject)=>{
        var sql="select * from supportcontact";
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
        const  fetchsupcon= await supfet();
        res.status(200).send(fetchsupcon)

    }
    catch(error){
        res.status(400).send(error);
    }
})

///------------------------------------------insert support contact table---------------------------------------------------------//
coninsert=(supcon_id,name,email,telephone,category,ord_id,text,timeslot)=>{
    return new Promise((resolve,reject)=>{
        var sql="insert into supportcontact(supcon_id,name,email,telephone,category,ord_id,text,timeslot) values(?,?,?,?,?,?,?,?)";
        connection.query(sql,[supcon_id,name,email,telephone,category,ord_id,text,timeslot],(error,results)=>{
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
        const supcon_id=req.body.supcon_id,
        name=req.body.name,
        email=req.body.email,
        telephone=req.body.telephone,
        category=req.body.cat,
        ord_id=req.body.orderid,
        text=req.body.text,
        timeslot=req.body.timeslot
        const supcon=await coninsert(supcon_id,name,email,telephone,category,ord_id,text,timeslot);
        res.status(200).send(supcon)



    }
    catch(error){
        res.status(400).send(error);
    }
})
//-------------------------------------------------------delete supportcontact-----------------------------------------------//
deletesupcon=(supcon_id)=>{
    return new Promise((resolve,reject)=>{
        var sql="delete from supportcontact where supcon_id=?";
        connection.query(sql,[supcon_id],(error,results)=>{
            if(error){
                return reject(error);
            }
            else{
                return resolve(results);
            }
        })
    })
}


router.delete('/delete',async (req,res)=>{
    try{
        const supcon_id=req.params.supcon_id;

        const supdel=await deletesupcon(supcon_id);
        res.status(200).send(supdel);

    }
    catch(error){
        res.status(400).send(error)
    }
})


//---------------------------------------------------fetch support contact by id----------------------------------------------//

supconbyid=(supcon_id)=>{
    return new Promise((resolve,reject)=>{
        var sql="select * from supportcontact where supcon_id=? ";
connection.query(sql,[supcon_id],(error,results)=>{

    if(error){
        return reject(error);
    }
    else{
        return resolve(results);
    }
})

    })
}

router.get('/fetch/:supcon_id',async (req,res)=>{
    try{
        const supcon_id=req.params.supcon_id;
        const fetchsup=await supconbyid(supcon_id);
        res.status(200).send(fetchsup)

    }
    catch(error){
        res.status(400).send(error)
    }
})

//-----------------------------------------------------------update support contact by id-------------------------------------------------------//
updatesupcon=(supcon_id,name,telephone,category,ord_id,text,timeslot,)=>{
    return new Promise((resolve,reject)=>{
        var sql="update supportcontact set name=?,telephone=?,category=?,ord_id=?,text=?,timeslot=? where supcon_id=?";
        let data=[name,telephone,category,ord_id,text,timeslot,supcon_id];
        
connection.query(sql,data,(error,results)=>{
    if(error){
        return reject (error)
    }
    else{
        return resolve(results);
    }
})

    })
}

router.put('/update',async (req,res)=>{

    try{
        const supcon_id=req.body.supcon_id,
        name=req.body.name,
        telephone=req.body.telephone,
        category=req.body.cat,
        ord_id=req.body.orderid,
        text=req.body.text,
        timeslot=req.body.timeslot

        const upsup=await updatesupcon(supcon_id,name,telephone,category,ord_id,text,timeslot);
        res.status(200).send(upsup);


    }
    catch(error){
        res.status(400).send(error);
    }
})

module.exports=router;