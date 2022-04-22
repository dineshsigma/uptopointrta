const express=require('express');
const 
router= express.Router();
const {connection} =require('../db.js');

//----------------------------------------------fetch staff values-------------------------------------------------//
staffFetch=()=>{
    return new Promise((resolve,reject)=>{
        var sql="select * from Staff";
        connection.query(sql,(error,results)=>{
            if(error){
                return reject(error);
            }
            else{
                return resolve (results); 
            }
            
        })
    })
}

router.get('/fetch',async (req,res)=>{
    
    try{
        const stafffet= await staffFetch();
        res.status(200).send(stafffet);

    }
    catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})


//---------------------------------------------------staff fetch by id----------------------------------------------------//

staffById=(staff_id)=>{
    return new Promise((resolve,reject)=>{
        var sql="select * from Staff where staff_id=?";
        connection.query(sql,[staff_id],(error,results)=>{
            if(error){
                return reject(error);
            }
            else{
                return resolve(results);
            }
        })
    })
}

router.get('/fetch/:staff_id',async (req,res)=>{
    try{
        const staff_id=req.params.staff_id;
        console.log(staff_id);

        const staffid=await staffById(staff_id);
        res.status(200).send(staffid)

    }
    catch(error){
        res.status(400).send(error)

    }
})

//-----------------------------------insert staff members--------------------------------------------------//

staffinsert=(staff_id,name,dateofbirth,staffRole,joiningDate,lastlogin,accessLevel)=>{

    return new Promise((resolve,reject)=>{
        var sql="insert into Staff(staff_id,name,dateofbirth,staffRole,joiningDate,lastlogin,accessLevel) values(?,?,?,?,?,?,?)";
        connection.query(sql,[staff_id,name,dateofbirth,staffRole,joiningDate,lastlogin,accessLevel],(error,results)=>{
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
    console.log(req.body);
    try{    
        const staff_id=req.body.staff_id  ,
        name=req.body.name,
        dateofbirth=req.body.dateofbirth,
        staffRole=req.body.staffRole,
        joiningDate=req.body.joiningdate,
        lastlogin=req.body.lastlogin,
        accessLevel=req.body.accessLevel 

        const insstaff=await  staffinsert(staff_id,name,dateofbirth,staffRole,joiningDate,lastlogin,accessLevel);
        res.status(200).send(insstaff)

    }
    catch(error){
        
        res.status(400).send(error);

    }
})

//----------------------------------------delete by staff_id----------------------------------//

staffDelete=(staff_id)=>{
    console.log(staff_id);
    return new Promise((resolve,reject)=>{
        var sql="delete from  Staff where staff_id=?";
        connection.query(sql,[staff_id],(error,results)=>{
            if(error){
                return reject(error);

            }
            else{
                return resolve(results);
            }
        })
    })
}


router.delete('/delete/:staff_id',async (req,res)=>{
    try{
        const staff_id=req.params.staff_id;
        console.log(staff_id);
        const delstaff= await staffDelete(staff_id);
         res.status(200).send(delstaff);

    }
    catch(error){
        res.status(400).send(error);
    }
})
///-------------------------------------------------------------update stafff------------------------------------------------------------//

staffUpdate=(staff_id,name,dateofbirth,staffRole,joiningDate,lastlogin,accessLevel)=>{
    return new Promise((resolve,reject)=>{
        var sql="update Staff set name=?,dateofbirth=?,staffRole=?,joiningDate=?,lastlogin=?,accessLevel=? where staff_id=?";
        let data=[name,dateofbirth,staffRole,joiningDate,lastlogin,accessLevel,staff_id];
        console.log(data);
        
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
    console.log(req.body);

    try{
        const staff_id=req.body.staff_id,
        name=req.body.name,
        dateofbirth=req.body.dateofbirth,
        staffRole=req.body.staffRole,
        joiningDate=req.body.joiningDate,
        lastlogin=req.body.lastlogin,
        accessLevel=req.body.accessLevel

        const staffupd= await staffUpdate(staff_id,name,dateofbirth,staffRole,joiningDate,lastlogin,accessLevel);
        res.status(200).send(staffupd);

    }
    catch(error){
        res.status(400).send(error);

    }

})

module.exports=router;