const express = require('express')
const path = require('path')
const app = express()
const ip = require('ip')

const port = 9050

app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'examples', 'index.html'))
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
    console.log(`http://${ip.address()}:${port}`)
})
