const express = require('express')
require('dotenv').config()
const app = express()
const connectToDB = require('./database')
const PORTNO = process.env.PORT || 7000
const cors = require('cors')


app.use(cors())
// app.use(cors({
//     origin: "http://localhost:5173"
// }))
// app.use(cors({
//     origin: ["http://localhost:5173", "origin2",".....3"],
//     methods:['GET']
// }))
app.use(express.json())

connectToDB()
app.get('/', (req, res) => {
    res.send("hello User!")
})

app.use('/api/v3.2/auth', require('./router/auth.router'))
app.use('/api/v3.2/note', require('./router/note.router'))

app.listen(PORTNO, () => {
    console.log(`Server is running on http://localhost:${PORTNO}`)
})