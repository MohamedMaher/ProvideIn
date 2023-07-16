const express = require('express')
const cors = require('cors')

const app = express()
const port = 7070
const corsOptions = {
    origin: 'htps:\\localhost:7070'
}

app.set('view engine', 'ejs')

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use('/', require('./routers/router'))

app.listen(port, () => {
    console.log(`server run on http://localhost:${port}`)
})