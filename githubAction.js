const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('GitHub Action');
});

let id =0;
let datas =[];

app.post('/git', (req, res) => {
    const data = {
        id: id++,
        name: 'Joe',
        attack: 50,
        defense: 30
    };
    datas.push(data);
    res.json(data);  // 返回 JSON
});

app.get('/git/:id',(req,res)=>{
    const data = datas.find(d => d.id === parseInt(req.params.id));
    if(!data) return res.status(404).send('get error');
    res.send(data); 
})

// 如果此應用程式是被測試引用的，則不啟動伺服器
if (require.main === module) {
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });
}

module.exports = app; // 將app導出以供測試使用
