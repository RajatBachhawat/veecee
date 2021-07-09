const express = require('express');
const { readFileSync } = require('fs');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid')

var port = process.env.PORT || 8080;

app.set('view engine','ejs')

app.use(express.static('./public'))
app.use(express.static('./public/js'))
// parses the body of req
app.use(express.urlencoded({'extended':false}))
app.get('/conversation/:room',(req,res)=>{
    res.render('conversation',{roomId: req.params.room, displayName: req.query.name});
})

app.get('/:room',(req,res)=>{
    res.render('waitRoom',{roomId: req.params.room, displayName: req.query.name});
})

app.post('/:room',(req,res,next)=>{
    next();
},
(req,res)=>{
    // console.log(req.params.room);
    // console.log(req.body.name);
    // console.log(req.body.video);
    // console.log(req.body.audio);
    res.render('meet',{
        roomId: req.params.room,
        displayName: req.body.name,
        startVideoMuted: req.body.video,
        startAudioMuted: req.body.audio});    
})

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})