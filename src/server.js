// PROJETO ESTÁ EM ANDAMENTO, ESTAMOS INCREMENTANDO AO BANCO DE DADOS AINDA...
// IREMOS IMPLEMENTAR MongoDB, se tem conhecimento e quer ajudar chame um dos supervisores no discord.

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(
    () => console.log('Conexão com banco de dados foi realizada com sucesso!')
).catch(
    (e) => console.log('ERROR na conexão com banco de dados', e)
)

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.use(routes)

app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})
