const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('GitHub Action');
});

app.post('/git', (req, res) => {
    const data = {
        name: 'Joe',
        attack: 50,
        defense: 30
    };
    res.json(data);  // 返回 JSON
});

// 如果此應用程式是被測試引用的，則不啟動伺服器
if (require.main === module) {
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });
}

module.exports = app; // 將app導出以供測試使用
