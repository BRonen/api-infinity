const express = require('express')

const Project = require('./models/Project')

const router = express.Router()

// Get all Projects
router.get('/projects', (req, res) => {
    Project.find({}).then(resposta => {
        res.send(resposta)
    }).catch(() => {
        res.send('ERROR AO ENCONTRAR PROJETO')
    })
})

// Get one project
router.get('/project', (req, res) => {
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
router.delete('/project', (req, res) => {
    let { pjid } = req.body
    Project.deleteMany({ 'pjid': pjid }).then(() => {
        res.sendStatus(200)
    }).catch(() => {
        res.sendStatus(400)
    })
})

// Create new project
router.post('/project', (req, res) => {
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
router.put('/project', (req, res) => {
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

module.exports = router
