const express = require('express')
const app = express()
const port = 4000

const cors = require('cors');
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(cors({
  origin: '*'
}));

const usersController = require("./users/users.controller")
app.use("/user", usersController)
const transactionsController = require("./transactions/transaction.controller")
app.use("/transactions", transactionsController)

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})