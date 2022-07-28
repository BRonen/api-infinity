// PROJETO ESTÁ EM ANDAMENTO, ESTAMOS INCREMENTANDO AO BANCO DE DADOS AINDA...
// IREMOS IMPLEMENTAR MongoDB, se tem conhecimento e quer ajudar chame um dos supervisores no discord.










const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors")
const jwt = require("jsonwebtoken")
const JWTSecret = "infinitydev"


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


// Get all Projects
app.get("/projects", (req, res) => {
    // RETORNAR LIST ALL DO BANCO DE DADOS
})




// Get one project
app.get("/project", (req, res) => {
    let { id } = req.body
    let projectExist = false // projectExist é uma booleana seria o resultado de um filtro verificando se o ID requisitado realmente existe no bando de dados

    if (projectExist = true) { // verifica se o projeto existe

        // faça se existir

    } else {
        res.sendStatus(404)

    }


})

// Delete a project
app.delete("/project", (req, res) => {



})


// Create new project
app.post("/project", (req, res) => {
    let randomID = Math.floor(Math.random() * (90000 - 10000) + 10000)
    let projectExist = false // projectExist é uma booleana seria o resultado de um filtro verificando se o ID requisitado realmente existe no bando de dados
    let { name, description, supervisor } = req.body
    if (projectExist = true) {
     // try again
    } else {
        let newProject = {
            id: randomID, // ID Do projeto
            name: name, // nome do projeto
            description: description, // descrição
            nextStep: undefined, // proximo passo a ser feito no projeto
            created: Date(), // data de criação do projeto
            supervisor: supervisor, // DiscordID do supervisor
            finished: false // projeto foi finalizado?
        }
        res.sendStatus(200) // colocar isso dentro de um promisse caso consiga escrever no bando de dados.
    }

    console.log(newProject)
})

// Edit or update a data project
app.put("/project", (req, res) => {
    let { id, supervisor } = req.body
    let projectExist = false // projectExist é uma booleana seria o resultado de um filtro verificando se o ID requisitado realmente existe no bando de dados

    if (projectExist = true) { // verificase o projeto existe

        let databaseReturn = { "supervisor": "123123123" } // retorno do projeto no banco de dados que seria achado pelo ID
        if (supervisor == databaseReturn.supervisor) { //  verificaria se o usuario que tentou excluir o projeto é supervisor dele se não negue o acesso

        } else {
            res.sendStatus(403)
        }
    } else {
        res.sendStatus(404)

    }

})


app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})