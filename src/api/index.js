const express = require('express')
const fileupload = require('express-fileupload')
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/bubble')

const Bubble = require('./Routes/Bubble')
const FourTwenty = require('./Routes/FourTwenty')


const app = express()
const port = 4000

app.use(fileupload())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/bubble', Bubble)

app.use('/*', FourTwenty)

app.listen(port, () => console.log(`Example backend API listening on port ${port}!`))
