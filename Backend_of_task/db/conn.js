const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config()
//Database connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connection is made with DB!!!')
}).catch((err)=>{
    console.error(err.message)
})
