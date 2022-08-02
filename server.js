// PROJETO ESTÁ EM ANDAMENTO, ESTAMOS INCREMENTANDO AO BANCO DE DADOS AINDA...
// IREMOS IMPLEMENTAR MongoDB, se tem conhecimento e quer ajudar chame um dos supervisores no discord.

const mongoose = require('mongoose')

const projectModel = require('./projects.js')

mongoose.connect(process.env.MONGO_URI).then(() =>
    console.log('Conexão com banco de dados foi realizada com sucesso!')
).catch(() => console.log('ERROR na conexão com banco de dados'))

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const Project = mongoose.model('Project', projectModel);

// Get all Projects
app.get('/projects', (req, res) => {
    Project.find({}).then(resposta => {
        res.send(resposta)
    }).catch(() => {
        res.send('ERROR AO ENCONTRAR PROJETO')
    })
})

// Get one project
app.get('/project', (req, res) => {
    let { pjid } = req.body
    const existResult =  Project.findOne({ 'pjid': pjid }).select('pjid').lean();

    if (existResult) {
        Project.find({ 'pjid': pjid }).then(resposta => {
            res.send(resposta)
        }).catch(() => {
            res.send(400)
        })
    } else {
        res.send(400)
    }

})

// Delete a project
app.delete('/project', (req, res) => {
    let { pjid } = req.body
    Project.deleteMany({ 'pjid': pjid }).then(() => {
        res.sendStatus(200)
    }).catch(() => {
        res.sendStatus(400)
    })
})

// Create new project
app.post('/project', (req, res) => {
    let { name, about, next, supervisor, members } = req.body
    const resultID = Math.random() * (90000 - 10000) + 10000

    const nProject = new Project({ pjid: Math.floor(resultID), name: name, about: about, next: next, finished: false, supervisor: supervisor, members: members })
    nProject.save().then(() => {
  res.sendStatus(200)
    }).catch(() => {
        res.sendStatus(403)
        res.send('Erro ao salvar projecto!')
    })
})

// Edit or update a data project
app.put('/project', (req, res) => {
    let { pjid, name, about, next, finished, supervisor, members } = req.body

    const existResult = Project.findOne({ 'pjid': pjid }).select('pjid').lean();

    if (existResult) {

        Project.find({ 'pjid': pjid }).then(resposta => {

            if (name == undefined) { let name = resposta.name }
            if (about == undefined) { let about = resposta.about }
            if (next == undefined) { let next = resposta.next }
            if (finished == undefined) { let finished = resposta.finished }
            if (supervisor == undefined) { let supervisor = resposta.supervisor }
            if (members == undefined) { let members = resposta.name }

            Project.findOneAndUpdate({ 'pjid': pjid }, { 'name': name, 'about': about, 'next': next, 'finished': finished, 'supervisor': supervisor, 'members': members })
                .then(() => {
                    res.send(200)
                }).catch(() => {
                    res.send(400)
                });

        }).catch(() => {
            res.send(400)
        })
    } else {

    }

})

app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})
