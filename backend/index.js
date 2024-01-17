require('./mongoose');
const Todolist = require("./userSchema");

const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 4200;
const mongoose= require('mongoose');

app.use(cors())
app.use(express.json());

app.get('/',async(req,res)=>{
    let data = await Todolist.find()
    res.send(data);
})

app.post('/',async(req,res)=>{
    let data = new Todolist(req.body)
    let result = await data.save();
    res.send(result);
    // console.log(result);
})

app.put('/:_id',async(req,res)=>{
    let data = await Todolist.updateOne(req.params,
       { $set: req.body}
    )
    res.send(data);
    console.log(data);
})
app.delete('/:_id',async(req,res)=>{
    let data = await Todolist.deleteOne(req.params)
    res.send(data);
    console.log("deleted :"+ data);
})

app.listen(PORT,()=>{
console.log("Server is listening on http://localhost:" + PORT);
})