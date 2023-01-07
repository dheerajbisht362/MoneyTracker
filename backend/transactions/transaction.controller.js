const express = require("express");
const router = express.Router();

const db = require("../db/db")


router.post("/", function (req, res) {
    try{
      const data = req.body;
      console.log(data)
      let sql = `SELECT * FROM transactions where email=?`
      db.all(sql,[data.email], (err, rows) => {
        if (err) {
          throw err;
        }
        res.status(200).send({message:"Success",data:rows})
      });
    }catch(err){
      console.log(err.message)
    }
  });

// authenticateUser
router.post("/add", function (req, res) {
  try{
    const data = req.body;
    console.log(data)
    const placeholder= '(?, ?, ?)';
    db.run('INSERT INTO transactions(email,amount,category) VALUES '+placeholder, [data.email,data.amount,data.category],function(err){
      if(err){
        res.status(400).send("Error Occured"); 
        return console.log(err.message)
      }
      res.send("Transacion Created");
      console.log(this.changes)
    })
  }catch(err){
    console.log(err.message)
  }
});

module.exports = router;