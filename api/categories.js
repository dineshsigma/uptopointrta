var express = require('express');

var con = express('./server.js');

var router = express.Router();

var { connection } = require('../db.js'); //database connection

const {
  categoryvalidation,
} = require('../app/validation.js'); //category validation(to check already item is there are not in db table )

//-------------------------------------------------FETCH CATEGORIES----------------------------------------------//
fetchCategories = () => {
  return new Promise((resolve, reject) => {
    var sql = 'select * from Categories ';
    connection.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      } else {
        console.log(results)
        return resolve(results);
      }
    });
  });
};

router.get('/fetch', async (req, res, next) => {
  try {
    const fetchcategories = await fetchCategories();
    res.status(200).send(fetchcategories);
  } catch (error) {
    res.status(400).send(error);
  }
});

//------------------------------------------------------------------FETCH CATEGORIES VALUES---------------------------------------------------//

fetchCat = () => {
  return new Promise((resolve, reject) => {
    var sql =
     'select c.category,c.cat_id,l.area,c.loc_id  from Location l,Categories c  where  c.loc_id=l.loc_id ';

    connection.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(results);
      }
    });
  });
};

router.get('/fetch/cat/cat/all', async (req, res) => {
  try {
    const fetchCategories = await fetchCat();
    res.status(200).send(fetchCategories);
  } catch (error) {
    res.status(400).send(error);
  }
});

//-------------------------------------------------------INSERT CATEGORIES TABLE---------------------------------------------------------------//

Insert = (cat_id, loc_id, category, items) => {
  return new Promise((resolve, reject) => {
    var sql =
      'insert into  Categories(cat_id,loc_id,category,items) values(?,?,?,?)';
    connection.query( sql,[cat_id, loc_id, category, items],(error, results) => {
        if (error) {
          return reject(error);
        } 
        else {
          return resolve(results);
        }
      });
  });
};

router.post('/insert', async (req, res) => {
  try {
    const cat_id = req.body.cat_id,
      loc_id = req.body.loc_id,
      category = req.body.category.toUpperCase(),
      items = req.body.items;

    
    const InsertCategories = await Insert( cat_id,loc_id,category,items);
    res.status(200).send(InsertCategories);
  } catch (error) {
    res.status(400).send(error);
  }
});

//--------------------------------------------------------------CATEGORIES FETCH BY ID-----------------------------------------------//

CategoriesFetch = cat_id => {
  return new Promise((resolve, reject) => {
    var sql = 'select   * from Categories where cat_id=?';

    connection.query( sql,[cat_id],(error, results) => {
        if (error) {
          return reject(error);
        }
         else {
          return resolve(results);
        }
      });
  });
};

router.get('/fetch/:cat_id', async (req, res) => {
  try {
    const cat_id = req.params.cat_id;

    const catfetch = await CategoriesFetch(
      cat_id
    );
    res.status(200).send(catfetch);
  } catch (error) {
    res.status(400).send(error);
  }
});

//------------------------------------DELETE CATEGORIES BY ID---------------------------------------------//

CategoryDelete = cat_id => {
  return new Promise((resolve, reject) => {
    var sql = 'select * from Menu_items where cat_id=?';
    connection.query(sql, [cat_id],(error, results) => {
        if (results.length > 0) {
          return reject(error);
        } 
        else {
          var sql ='delete from Categories where cat_id=?';
          connection.query(sql, [cat_id], (error, results) => {
              if (error) {
                return reject(error);
              } 
              else {
                return resolve(results);
              }
            });
        }
      });
  });
};

router.delete( '/delete/:cat_id', async (req, res) => {
    try {
      const cat_id = req.params.cat_id;

      const catdelete = await CategoryDelete( cat_id);

      res.status(200).send(catdelete);
    } 
    catch (error) {
      res
        .status(400)
        .send('delete data in Menu_items table');
    }
  }
);
//------------------------------------------------------update Categories Table------------------------------------------------------------------//
CatUpdate = (cat_id, loc_id, category) => {
  return new Promise((resolve, reject) => {
    var sql ='update Categories set loc_id=?,category=? where cat_id=? ';
    let data = [loc_id, category, cat_id];
    connection.query(  sql,data, (error, results) => {
        if (error) {
          return reject('error');
        } 
        else {
          return resolve(results);
        }
      });
  });
};

router.put('/update', async (req, res) => {
  try {
      const loc_id = req.body.loc_id,
      cat_id = req.body.cat_id,
      category = req.body.category;

    const update = await CatUpdate(  cat_id,loc_id, category );
    res.status(200).send(update);
  } 
  catch (error) {
    res.status().send(error);
  }

});


//----------------------------------------------count no of items in using group by--------------------------------------------//
router.get('/count', (req, res) => {
  
  var sql =
    'select cat_id ,count(*) from  Menu_items   cat_id   ';
  
  connection.query(sql, (error, results) => {
    if (error) {
      console.log(error);
    }
    res.status(200).send(results);
  });
});

//-----------------------------------fetch all values  from different table--------------------------------------------------------//
router.get('/fetch/cat/cat',(req,res)=>{


  var sql="select c.category,c.cat_id,l.area,c.loc_id,count(m.cat_id) as items \
   from Location l join Categories c on c.loc_id=l.loc_id  \
                   left outer join Menu_items m on m.cat_id=c.cat_id \
                   group by m.cat_id";

 
   connection.query(sql,(error,results)=>{
      if (error){
        

         res.status(400).send(error);
      }
      else{
           res.status(200).send(results);
      
        
      }
   })
})




module.exports = router;
