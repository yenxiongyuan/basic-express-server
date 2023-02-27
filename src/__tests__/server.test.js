'use strict';

const supertest = require('supertest');
const { app } = require('../server');
const request = supertest(app);

describe('API Server', () => {

  it('handles invalid requests', async () => {
    const response = await request.get('/notHere');

    expect(response.status).toEqual(404);
  });

  it('handles bad method', async () => {
    const response = await request.post('/', {
      method: 'bad method',
    });
    expect(response.status).toEqual(404);
  });

  it('handles root path', async () => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy();
    expect(response.text).toEqual('hello, how are you?');
  });

  it('handles \'/person\' route without query correctly', async () => {
    const response = await request.get('/person');

    expect(response.status).toEqual(500);
  });

  it('handles \'/person\' route with query correctly', async () => {
    const response = await request.get('/person').query({personName: 'John'});

    // console.log(response.body);

    expect(response.body.message).toEqual('John, what do you like to eat?');
  });
});
