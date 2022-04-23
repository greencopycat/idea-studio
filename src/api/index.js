const express = require('express')
const fileupload = require('express-fileupload')
require('dotenv').config()
// const postgres = require('@metamodules/postgres')()
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/bubble')

const Bubble = require('./Routes/Bubble')


const app = express()
const port = 4000

app.use(fileupload())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/bubble', Bubble)

// postgres.query(`CREATE TABLE IF NOT EXISTS clicks (
//   id BIGSERIAL PRIMARY KEY,
//   created_at TIMESTAMP DEFAULT NOW()
// )`)

// app.get('/api/count', (req, res) => {
//   postgres.query('SELECT count(*) AS count FROM clicks', (err, resp) => {
//     res.send({ count: resp.rows[0].count || 0 })
//   })
// })

// app.post('/api/count/increment', (req, res) => {
//   postgres.query('INSERT INTO clicks DEFAULT VALUES', (err, insert) => {
//     postgres.query('SELECT count(*) AS count FROM clicks', (err, resp) => {
//       res.send({ count: resp.rows[0].count || 0 })
//     })
//   })
// })

app.listen(port, () => console.log(`Example backend API listening on port ${port}!`))
