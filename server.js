const express = require('express')
const mongoose = require('mongoose')
var app = express()
var Data = require('./notesSchema')


mongoose.connect('mongoDB://localhost/newDB',{
    
  })
mongoose.connection.once("open", () => {
    console.log("connected to DB!")
}).on("error", (error)=>{
    console.log("failed to connect" + error)
})
app.get("/hi", (req,res)=>{
    res.send("Hello World.")
})
// Create a NOTE
app.post("/create", (req, res)=> {
    var note = new Data({
        note: req.get("note"),
        title: req.get("title"),
        date: req.get("date"),
    })
    note.save().then(() => {
        if(note.isNew == false){
            console.log("Saved data!")
            res.json({response: "ok"});
        }else{
            console.log("Failed to save data")
        }
    })
})

// http://192.168.0.100:8081/create
var server = app.listen(8081, "192.168.0.100", ()=>{
    console.log("server is running")
})


mongoose.set('debug', true)

// update a Note
app.post("/update", (req,res)=>{
    Data.findOneAndUpdate({
        _id: req.get("id")
    }, {
        note: req.get("note"),
        title: req.get("title"),
        date: req.get("date"),
    },(err)=>{
        console.log("failed to update  " + err)
    })
    res.send("Updated")
})


// fetch all Notes
app.get("/fetch", (req,res)=>{
    Data.find({}).then((DBitems) => { 
        res.send(DBitems)
    })
})

// Delete a Note
app.post("/delete", (req,res) =>{
    Data.findOneAndRemove({
        _id : req.get("id")
    },(err) => {
        console.log(err)
    })
})