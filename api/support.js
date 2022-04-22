const express=require('express');
const router=express.Router();

const {connection}=require('../db.js');

//-------------------------------------fetch   all avlues from support table--------------------------------------//
fetchsupport=()=>{
    return new Promise((resolve,reject)=>{
        var sql="select * from support";
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



router.get('/fetch', async (req,res)=>{
    try{
        const fetch=await fetchsupport();
        res.status(200).send(fetch);

    }
    catch(error){
        res.status(400).send(error)

    }
})

//-----------------------------------------------insert values in support table---------------------------------------------------//
supportInsert=(sup_id,email,mobNumber,reservationNum,start_At,end_At,supportNum,address)=>{
    return new Promise((resolve,reject)=>{
        var sql="insert into support (sup_id,email,mobNumber,reservationNum,start_At,end_At,supportNum,address) values (?,?,?,?,?,?,?,?)";
        connection.query(sql,[sup_id,email,mobNumber,reservationNum,start_At,end_At,supportNum,address],(error,results)=>{
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
        const sup_id=req.body.sup_id,
        email=req.body.email,
        mobNumber=req.body.mobNumber,
        reservationNum=req.body.reservationNum,
       start_At=req.body.start_At,
       end_At=req.body.end_At,
        supportNum=req.body.supportNum,
        address=req.body.address
         const  insertinfo= await supportInsert(sup_id,email,mobNumber,reservationNum,start_At,end_At,supportNum,address);
         res.status(200).send(insertinfo);

    }
    catch(error){
        res.status(400).send(error);

    }
})

//-----------------------------------------------------fetch by  id support table--------------------------------------//
supByid=(sup_id)=>{
    return new Promise((resolve,reject)=>{
        var sql="select * from support where sup_id=?";
        connection.query(sql,[sup_id],(error,results)=>{
            if(error){
                return reject(error);
            }
            else{
                return resolve(results);
            }
        })
    })
}

router.get('/fetch/:sup_id',async (req,res)=>{
    try{
        const sup_id=req.params.sup_id
        console.log(sup_id);
        const supid=await supByid(sup_id);
        res.status(200).send(supid);

    }
    catch(error){
        res.status(400).send(error);
    }
})

//------------------------------------------update support-----------------------------------------------//

updateSupport=(sup_id,email,mobNumber,reservationNum,start_At,end_At,supportNum,address)=>{
    return new Promise((resolve,reject)=>{
        var sql="update support set email=?,mobNumber=?,reservationNum=?,start_At=?,end_At=?,supportNum=?,address=? where sup_id=?";
        let data=[email,mobNumber,reservationNum,start_At,end_At,supportNum,address,sup_id];
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
    const sup_id=req.body.sup_id,
    email=req.body.email,
    mobNumber=req.body.mobNumber,
    reservationNum=req.body.reservationNum,
    start_At=req.body.start_At,
    end_At=req.body.end_At,
    supportNum=req.body.supportNum,
    address=req.body.address

    const supupdate= await update
    Support(sup_id,email,mobNumber,reservationNum,start_At,end_At,supportNum,address);
    res.status(200).send(supupdate);
    }
    catch(error){
        res.status(400).send(error)

    }

})

//-------------------------------------------delete data in support table-------------------------------------------//
deleteSupport=(sup_id)=>{
    return new Promise((resolve,reject)=>{
        var sql="delete from  support where sup_id=?";
        connection.query(sql,[sup_id],(error,results)=>{
            if(error){
                return reject(error);
            }
            else{
                return resolve(results);
            }
        })
    })
}




router.delete('/delete/:sup_id',async (req,res)=>{
    try{
        const sup_id=req.params.sup_id

        const supdelete= await deleteSupport(sup_id);
        res.status(200).send(supdelete);

    }
    catch(error){
        res.status(400).send(error);
    }
})
module.exports=router;