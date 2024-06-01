require('dotenv').config()
console.log("chai aur code")

const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login',(req,res) => {
    res.send("hello neha this side")
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})