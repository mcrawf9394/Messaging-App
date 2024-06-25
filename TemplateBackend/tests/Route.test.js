const request = require('supertest')
const express = require('express')
const app = express()
const indexRouter = require('../routes/index')
app.use('/', indexRouter)
test("this is a test", async () => { 
    const response = await request(app).get('/')
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
})