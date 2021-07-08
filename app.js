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

app.post('/',(req,res)=>{
    res.redirect(`${req.body.url}`);
})

app.get('/type/:room',(req,res)=>{
    res.render('joinType', {roomId: req.params.room});
})

app.post('/type/:room',(req,res)=>{
    if(req.body.call!='1'){
        res.redirect(`/conversation/${req.params.room}/${req.body.name}`);
    }
    else{
        res.redirect(`/${req.params.room}?name=${req.body.name}`);
    }
})

app.get('/conversation/:room/:name',(req,res)=>{
    res.render('conversation',{roomId: req.params.room, displayName: req.params.name});
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