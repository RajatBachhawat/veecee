const express = require('express');
const app = express()

var port = process.env.PORT || 8080

app.use(express.static('./public'))

app.get('/',(res,req) => {
    res.render('index')
})

app.listen(port,() => {
    console.log(`server is listening on port ${port}`)
})