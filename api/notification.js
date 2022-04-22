const { rejects } = require('assert');
let express=require('express');
const { resolve } = require('path');
let router=express.Router();
let {connection} =require('../db.js');


//---------------------------------------------fetch notification------------------------------------------//

notificationFetch=()=>{
    return new Promise((req,res)=>{
        var sql="select * from notification";
        connection.query(sql,(error,results)=>{
            if(error){
                return rejects(error);
            }
            else{
                return resolve(results)
            }
        })
    })
}

router.get('/fetch',async (req,res)=>{
    try{
        const  notfetch=await notificationFetch();
        res.status(200).send(notfetch);

    }
    catch(error){
        res.status(400).send(error);
    }
})


//-----------------------------------------------------------insert notification-----------------------------------------------------//

notificationinsert=(user_id,notification_id)=>{
    return new Promise((resolve,reject)=>{
        var sql="insert into notification (user_id,notification_id) values(?,?)";
        connection.query(sql,[user_id,notification_id],(error,results)=>{
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
        
        user_id=req.body.user_id,
        notification_id=req.body.notification_id

        const notifiinsert= await notificationinsert(user_id,notification_id);
        res.status(200).send(notifiinsert)

    }
    catch(error){
        res.status(400).send(error)
    }
})

//-----------------------------------------------------------delete notification byg id----------------------------------------------//




notificationDelete=(user_id)=>{
    return new Promise((resolve,reject)=>{
        var sql="delete from notification where user_id=?";
        connection.query(sql,[user_id],(error,results)=>{
            if(error){
                return reject(error);
            }
            else{
                return resolve(results);
            }
        })
    })
}

router.delete('/delete/:user_id',async (req,res)=>{
    try{
        var  user_id=req.params.user_id;
        
        const deletenot= await notificationDelete(user_id);
        res.status(200).send(notdelete);

    }
    catch(error){
        res.status(400).send(error);

    }
})


//-----------------------------------------------------------fetch notification by id----------------------------------------//



notificationById=(id)=>{
    return new Promise((resolve,reject)=>{
        var sql="select * from notification where user_id=? ";
        connection.query(sql,[user_id],(error,results)=>{
            if(error){
                return reject(error)
            }
            else{
                return resolve(results);
            }

        })
    })
}

router.get('/fetch/:user_id',async (req,res)=>{
    try{
        const  user_id=req.params.user_id;
 const notfiByid= await notificationById(user_id);
        res.status(200).send(notfiByid);

    }
    catch(error){
        res.status(400).send(error);
    }
})


//----------------------------------update by notification---------------------------------------------------//



notificationUpdate=(user_id,notification_id)=>{
    return new Promise((resolve,reject)=>{
        var sql="update notification set notification_id=? where user_id=?";

        let data=[notification_id,user_id];
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
        
        user_id=req.body.user_id,
        notification_id=req.body.notification_id
        const updatenot =await notificationUpdate(user_id,notification_id);
        res.status(200).send(updatenot)
    }
    catch(error){
        res.status(400).send(error)
    }

})

module.exports=router;