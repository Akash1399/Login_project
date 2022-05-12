const express=require('express')
const dotenv=require('dotenv')
const app=express()
const PORT=5000
const User=require('./model/userSchema')
require('./db/conn')

app.use(express.json())

//Routing
app.use(require('./routes/auth'))
// app.get('/',(req,res)=>{
//     res.send('Hello brother!!!')
// })

//Server creation
app.listen(PORT,()=>{
    console.log(`server is connected to ${PORT} port`)
})