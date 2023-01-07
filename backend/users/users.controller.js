const express = require("express");
const router = express.Router();

const db = require("../db/db")

// create a users
router.post("/signup", function (req, res) {

  try{
    const data = req.body;
    const placeholder= '(?, ?, ?)';
    db.run('INSERT INTO users(email,name,password) VALUES '+placeholder, [data.email,data.name,data.password],function(err){
      if(err){
        // assuming we are getting all data and is correct
        res.status(400).send("User Already Exists"); 
        return console.log(err.message)
      }
      res.send("User Created");
      console.log(this.changes)
    })
  }catch(err){
    console.log(err.message)
  }
});

// authenticateUser
router.post("/login", function (req, res) {
  try{
    const data = req.body;
    let sql = `SELECT * FROM users where email=?`
    db.all(sql,[data.email], (err, row) => {
      if (err) {
        throw err;
      }
      console.log(row)
      if(!row){
        return res.status(404).send("User Not found"); 
      }
      if(row[0].password != data.password){
       return res.status(400).send("Invalid Combination"); 
      }
      res.status(200).send({message:"Success",data:row[0]})
    });
  }catch(err){
    console.log(err.message)
  }
});

module.exports = router;