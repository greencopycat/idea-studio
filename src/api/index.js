const express = require('express')
const fileupload = require('express-fileupload')
const bodyParser = require('body-parser')
require('dotenv').config()
const mongoose = require('mongoose')

const atlasUrl = 'mongodb+srv://dumbify:paperHotDog4Free@cluster0.u1ik8.mongodb.net/bubble?retryWrites=true&w=majority'
mongoose.connect(atlasUrl)
// mongoose.connect('mongodb://127.0.0.1:27017/bubble')

const Bubble = require('./Routes/Bubble')
const FourTwenty = require('./Routes/FourTwenty')


const app = express()
const port = 4000

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(fileupload())

app.use('/bubble', Bubble)

app.use('/*', FourTwenty)

app.listen(port, () => console.log(`Backend API listening on port ${port}!`))
