const express = require('express')
const app = express()
const port = 8080

app.use(express.urlencoded({ extended: true }));

const path = require("path")
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs") 
app.use(express.static(path.join(__dirname, "public")));

const { v4: uuidv4 } = require('uuid')

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


let posts=[]

app.get("/",(req,res)=>{
    let edit=req.query.edit
    res.render("main.ejs",{posts,edit})
})

app.post("/",(req,res)=>{
    let id=uuidv4()
    let task=req.body.task;
    posts.push({id,task})
    res.redirect("/") 
})

app.patch("/:id",(req,res)=>{
    let { id } = req.params;
    let new_task = req.body.task
    let post = posts.find((p)=> id === p.id)
    if(post){
        post.task = new_task
    }
    res.redirect("/")
})

app.delete("/:id",(req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p)=> id !== p.id)
    res.redirect("/")
})

app.listen(port,()=>{
    console.log(`connected to the port ${port}`)
})