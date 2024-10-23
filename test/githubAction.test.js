// npm test

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
