## 進行github action教學
1. 設定你的 GitHub 儲存庫
--創建githubAction.js，並建立get/post方法

2. 在專案根目錄中建立 GitHub Actions 配置
在你的 Node.js 專案中，創建一個 .github/workflows 資料夾。然後在這個資料夾中創建一個 .yml 文件，比如 ci.yml。
mkdir -p .github/workflows
touch .github/workflows/ci.yml

3. 編寫 GitHub Actions 工作流程
在 ci.yml 文件中，加入以下內容：
name: CI/CD Pipeline

on:
  push:
    branches:
      - main # 或者你想要執行 CI/CD 的分支
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20' # 使用的 Node.js 版本，可以根據需要調整

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test # 確保你有一個 test 腳本在 package.json 中

      - name: Deploy to production
        run: |
          # 這裡添加你的部署指令
          # 例如：
          # npm run build
          # pm2 restart your-app # 如果使用 pm2 來管理伺服器

4. 了解 YAML 配置
name:：定義這個工作流程的名稱。
on:：觸發這個工作流程的條件，這裡設置為在 main 分支上有 push 或 pull_request 時執行。
jobs:：定義工作流程中的一個或多個作業（jobs）。
steps:：每個作業中的具體步驟，包括檢出代碼、設置 Node.js 環境、安裝依賴和運行測試。

5. 設定環境變數（可選）
如果你的應用需要某些環境變數（例如，數據庫連接字符串），你可以在 GitHub 儲存庫的 Settings -> Secrets and variables -> Actions 中設定。

6. 查看結果
a. 進入 GitHub 儲存庫
打開你在 GitHub 上的專案儲存庫。
b. 打開 Actions 頁面
在儲存庫的頂部導航欄中，找到 Actions 標籤並點擊它。
c. 查看 Workflow 執行狀態
在 Actions 頁面，你可以看到最近的工作流程（workflow）執行紀錄。
點擊你想要查看的工作流程名稱（例如：CI/CD Pipeline），這會打開該工作流程的詳細執行記錄。
d. 查看作業詳情
打開之後，你可以看到這個工作流程下的不同作業（Jobs）。點擊某個作業來查看具體的執行步驟（steps）。
每個步驟都會顯示成功（綠勾）或失敗（紅叉）的狀態。點擊步驟名稱可以查看詳細的日誌輸出。
e. 確認結果
成功的步驟會顯示 Passed，如果有失敗的步驟，則會顯示 Failed。如果某個步驟失敗，詳細日誌會提供錯誤的具體信息，便於你進行調試和修正。
如果一切執行順利，你應該會在最後看到整個工作流程的 Success 狀態。如果有問題，則需要根據日誌進行調整。



## 若有顯示錯誤
1. 確認package.json /express模組
若無，請安裝: npm init -y / npm install express

2. 安裝測試工具
a. 首先，你需要在專案中安裝 mocha 和 supertest：
b. npm install mocha supertest --save-dev

接著，創建一個新的測試文件，命名為 test/githubAction.test.js。該檔案將包含對 GET 和 POST 路由的測試：
const request = require('supertest');
const express = require('express');

const app = require('../githubAction'); // 引用你的Express應用程式

describe('GET /', () => {
  it('should return GitHub Action', (done) => {
    request(app)
      .get('/')
      .expect(200)  // 預期狀態碼為200
      .expect('GitHub Action', done);  // 預期返回 'GitHub Action'
  });
});

describe('POST /git', () => {
  it('should return an object with name, attack, and defense', (done) => {
    request(app)
      .post('/git')
      .expect(200)
      .expect(res => {
        res.body.name === 'Joe';
        res.body.attack === 50;
        res.body.defense === 30;
      })
      .end(done);
  });
});

c. 修改 githubAction.js
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

d. 修改 package.json
更新 package.json，使 npm test 可以運行測試：
{
  "name": "githubaction",
  "version": "1.0.0",
  "description": "",
  "main": "githubAction.js",
  "scripts": {
    "test": "mocha --exit"
  },
  "dependencies": {
    "express": "^4.19.2"
  },
  "devDependencies": {
    "mocha": "^10.0.0",
    "supertest": "^6.0.0"
  }
}

e. 確保 Mocha 被安裝正確
首先確認 Mocha 是否在你的專案中正確安裝。如果 Mocha 沒有安裝為專案依賴，GitHub Actions 在執行 npm test 時將無法找到它。

你可以通過以下步驟進行檢查和修復：
npm install --save-dev mocha

f. 確認ci.yml
name: Node.js CI/CD

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '20'

    # 安裝專案依賴
    - name: Install dependencies
      run: npm install

    # 確保 mocha 擁有執行權限 (如果需要)
    - name: Grant Mocha execute permissions
      run: chmod +x ./node_modules/.bin/mocha

    # 執行測試
    - name: Run tests
      run: ./node_modules/.bin/mocha --exit

g. 確認資料夾結構
/githubAction
  ├── /node_modules
  ├── /test
      └── githubAction.test.js
  ├── githubAction.js
  ├── package.json
  └── package-lock.json

h. 測試執行
npm test

7. 上傳至github，確認github action之資訊
