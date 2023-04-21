//setting up server.js
const express = require('express')
const app = express();
const path= require('path')
const dotenv = require('dotenv')
require("dotenv").config();
const usermodel = require('./db')
const cors = require('cors')
app.use(cors());
app.use(express.json());
app.listen(process.env.PORT || 4000);


//post route for saving todo sent from frontend
app.post('/todos',async(req,res)=>{
    try{
        const {todo} = req.body;
        const index = req.body.indexx;
        if(!todo){
            return res.status(401).json("no todo");
        }else{
                const saved = await new usermodel({todo,index}).save();
                console.log(saved);
                res.status(201).json("sucessfully saved todo!")
        }
    }catch(e){
        console.log(e);
     res.status(401).json(e);    
    }
})

//put route for saving index sent from frontend of a specific todo
app.put('/puttodo/:id',async(req,res)=>{
    const {id} = req.params;
    const indexx = req.body.index;
    const source = req.body.source;
    try{
        if(!indexx && indexx<0){
            return res.status(401).json("no index");
        }else{

                const prevIndex = await usermodel.findOne({index:indexx})
                console.log("prevIndex",prevIndex);
                if(prevIndex){
                const saveit = await usermodel.findByIdAndUpdate(prevIndex._id,{index:source},{new:true})   
                console.log("saveit",saveit)
                const saveIndex = await usermodel.findByIdAndUpdate(id,{index:indexx},{new:true})
                console.log("saveIndex",saveIndex);
                return res.status(201).json("success")
            }else{
                const saveIndex = await usermodel.findByIdAndUpdate(id,{index:indexx},{new:true})
                console.log("saveIndex",saveIndex);
                return res.status(201).json("success")
            }
        }
    }catch(e){
        return res.status(401).json(e);
    }
})

//getting all todo list
app.get('/gettodo',async(req,res)=>{
    try{
        const findTodo = await usermodel.find({}).sort({index:1})
        console.log(findTodo)
        res.status(201).json(findTodo)
    }catch(e){
        console.log(e)
        res.status(401).json(e)
    }
})

//check
app.put('/check/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const find = await usermodel.findByIdAndUpdate({_id:id},{check:true},{new:true})
        res.status(201).json("Updated")
    }catch(e){
        console.log(e)
        res.status(401).json(e)
    }
})

//uncheck
app.put('/uncheck/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const find = await usermodel.findByIdAndUpdate({_id:id},{check:false},{new:true})
        res.status(201).json("Updated")
    }catch(e){
        console.log(e)
        res.status(401).json(e)
    }
})


// for delteing the commemts only for development purpose not required in the final project..
app.delete('/find',async(req,res)=>{
    const finduser = await usermodel.deleteMany({});
    res.status(201).json(finduser);
})


//production
if(process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname,"dist")));
   app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'dist','index.html'));
   })
}
