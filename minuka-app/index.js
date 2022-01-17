// const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv')
dotenv.config()
const env = process.env;
const bodyParser = require('body-parser');

const express = require('express')
const services = require('./services');
var cors = require('cors')
const app = express()

const NODE_DOCKER_PORT = env.NODE_DOCKER_PORT;

app.use(bodyParser.json()); 
app.use(cors())


app.get('/', (req, res) => res.send(`Server is Healthy on Port: ${NODE_DOCKER_PORT}`));

app.get('/users', async function (req, res) {
    var result = await services.getUsers();
    res.send(result)
})

app.post('/users', async function (req, res) {
    await services.addUser(req.body)
    res.sendStatus(200);
})

app.patch('/users', async function (req, res) {
    await services.patchUser(req.body)
    res.status(200)
    res.send(`Successfully Updated the User: ${req.body.id}.`)
})

app.delete('/users', async function (req, res) {
    await services.removeUser(req.query.id)
    res.status(200)
    res.send(`Successfully Deleted User: ${req.query.id}.`)
})

// init();
console.log(`Server Running on port ${NODE_DOCKER_PORT}`);
app.listen(NODE_DOCKER_PORT);