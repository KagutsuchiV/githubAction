// npm test

import request from 'supertest';
import { expect } from 'chai'; // 如果要使用 expect 進行測試，請導入它
import app from '../githubAction'; // 引用你的Express應用程式
// const express = require('express');

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

describe('GET /git/:id', ()=>{
  it('should return data with specific id', (done)=>{
    // 需先POST獲得id
    request(app)
      .post('/git')
      .expect(200)
      .end((err, res)=>{
        if(err) return done(err);
        const id = res.body.id;

        // 測試get
        request(app)
          .get(`/git/${id}`)
          .expect(200)
          .expect(res=>{
            expect(res.body.id).toBe(id);
            expect(res.body.name).toBe('Joe');
            expect(res.body.attack).toBe(50);
            expect(res.body.defense).toBe(30);
          })
          .end(done);
      });
  });

  it('should return 404 if data not found', (done)=>{
    request(app)
      .get('/git/999') //假設999 不存在
      .expect(404)
      .expect('get error', done);
  });
});
