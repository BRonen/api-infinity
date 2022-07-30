// PROJETO ESTÁ EM ANDAMENTO, ESTAMOS INCREMENTANDO AO BANCO DE DADOS AINDA...
// IREMOS IMPLEMENTAR MongoDB, se tem conhecimento e quer ajudar chame um dos supervisores no discord.









const mongoose = require("mongoose")
const projectModel = require("./projects.js")
mongoose.connect("mongodb://127.0.0.1:27017/infinityAPI").then(() =>
    console.log("Conexão com banco de dados foi realizada com sucesso!")
).catch(() => console.log("ERROR na conexão com banco de dados")
)

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors")
const jwt = require("jsonwebtoken")
const JWTSecret = "infinitydev"


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())



const Project = mongoose.model("Project", projectModel);

// Get all Projects
app.get("/projects", (req, res) => {

    Project.find({}).then(resposta=>{
        res.send(resposta)
        }).catch(()=>{
           res.send("ERROR AO ENCONTRAR PROJETO")
        })
    
})




// Get one project
app.get("/project", (req, res) => {
    let { pjid } = req.body

    if(Project.exist({"pjid":pjid})){
        Project.find({"pjid":pjid}).then(resposta=>{
            res.send(resposta) 
            }).catch(()=>{
               res.send(400)
            })
    }else{

    }


})

// Delete a project
app.delete("/project", (req, res) => {
Project.deleteMany({"pjid": pjid}).then(() =>{
res.sendStatus(200)
}).catch(()=>{
    res.sendStatus(400)
})


})


// Create new project
app.post("/project", (req, res) => {
    let { name, about, next, finished, supervisor, members} = req.body
    const resultID = Math.random()*(90000 - 10000) + 10000

    
    const nProject = new Project({ pjid: Math.floor(resultID), name: name, about: about, next: next, finished: finished, supervisor: supervisor ,members: members})
    nProject.save().then(() => {
 
    }).catch(() => {
        res.sendStatus(403)
        res.send("Erro ao salvar projecto!")
    })


})

// Edit or update a data project
app.put("/project", (req, res) => {
  let {pjid} = req.body
    Project.find({"pjid": pjid}).then(resposta=>{
        res.send(resposta)
        }).catch(()=>{
           res.send("ERROR AO ENCONTRAR PROJETO")
        })

})


app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})