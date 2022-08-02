const express = require('express')

const Project = require('./models/Project')

const router = express.Router()

// Get all Projects
router.get('/projects', async (req, res) => {
    const projects = await Project.find()
    
    res.json(projects)
})

// Get one project
router.get('/project/:pjid', async (req, res) => {
    const { pjid } = req.params
    const result = await Project.findOne({ pjid })

    if (!result)
        return res.status(404).json({error: 'project not found.'})

    return res.json(result)
})

// Delete a project
router.delete('/project', async (req, res) => {
    const { pjid } = req.body
    const projectDeleted = await Project.findOneAndDelete({ pjid })

    if (!projectDeleted)
        return res.status(404).json({error: 'project not found.'})
    
    return res.json(projectDeleted)
})

// Create new project
router.post('/project', async (req, res) => {
    const {
        name, about, next,
        supervisor, members
    } = req.body

    const resultID = Math.random() * (90000 - 10000) + 10000

    const projectExists = await Project.findOne({ name })

    if(projectExists)
      return res.status(400).json({ error: 'project already exists.' })

    const project = await Project.create({
        pjid: Math.floor(resultID),
        name, about, next,
        supervisor, members,
        finished: false
    })

    return res.json(project)
})

// Edit or update a data project
router.put('/project', async (req, res) => {
    const {
        pjid, name, about,
        next, finished,
        supervisor, members
    } = req.body

    const project = Project.findOneAndUpdate({ pjid }, {
        name, about,
        next, finished,
        supervisor, members
    })

    return res.json(project)
})

module.exports = router
