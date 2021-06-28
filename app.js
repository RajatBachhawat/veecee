const express = require('express');
const { readFileSync } = require('fs');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid')

var port = process.env.PORT || 8080;

app.set('view engine','ejs')

app.use(express.static('./public'));
app.use(express.static('./public/js'));
// parses the body of req
app.use(express.urlencoded({'extended':false}))

app.post("/",function(req,res){
    res.redirect(req.body.url);
})

app.get('/:room', function(req, res){
    res.render('meet', {roomId: req.params.room});
});

app.listen(port,() => {
    console.log(`server is listening on port ${port}`);
});