const express = require('express');
const port = 3000;
const app = express();

app.get('/', (req,res)=>{
    res.send('GitHub Action');
});

app.post('/git',(req,res)=>{
    const data = {
        name: 'Joe',
        attack: 50,
        denfense: 30
    };
});

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});