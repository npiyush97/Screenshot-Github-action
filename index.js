const express = require('express')
const app = express()

app.use(express.static(__dirname+'/frontend'))

app.all('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})
app.listen(process.env.PORT || 3000)