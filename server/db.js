const mongoose = require("mongoose");
const dotenv = require('dotenv')
require("dotenv").config();
mongoose.connect(process.env.MONGO)
.then((res)=>{
    console.log("connected!")
})
.catch((e)=>{
    console.log(e);
})

const userSchema = new mongoose.Schema({
    todo:{
        type:String
    },
    index:{
        type:Number,
        default:0
    }
})

const usermodel = new mongoose.model('todos',userSchema)
module.exports = usermodel