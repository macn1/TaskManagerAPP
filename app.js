
require('dotenv').config()

const express = require('express')

const cors = require('cors')

const bodyParser = require('body-parser')

const app = express()

const db = require('./db/db')

app.use(cors())
app.use(bodyParser.json());




const userRouter = require('./routes/userRouter')

const taskRouter = require('./routes/taskRouter')

db()

const port = process.env.port ||4000

app.use(express.json())

app.use('/user',userRouter)

app.use('/task',taskRouter)

app.listen(port,()=>console.log(`server running on ${port}`))