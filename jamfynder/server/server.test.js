
const request = require("supertest");

const app = require('./server.js');
const port = require('./port.js');




describe('Testing /callback -> Spotify API', () => {
  it('Status is equal to 200', async () => {
    const response = await request(app).get('/callback');
    expect(response.status).toBe(200);

  });
});


//Test to see if Header is JSON
describe('Testing /callback -> Spotify API', () => {
  it('Header is JSON object', async () => {
    const response = await request(app).get('/callback');
    expect(typeof response).toBe('object');
    console.log(response)

  });
});

//Test to see if body has data
describe('Confirm index has body text', ()=> {
  it('Index Body was loaded', async () => {
    const response = await request(app).get('/jtest');
    expect(response.text).toEqual('here');
  })
  })

//Test to see if body has data
describe('Confirm dev port is running', ()=> {
  it('Dev port is running on 8888', async () => {
    const response = await request(app).get('/portTest');
    expect(response.text).toBe('8888');
  })
  })

//Test to see if Header is JSON
describe('Client ID', () => {
  it('Client ID is correct?', async () => {
    const response = await request(app).get('/login');
    expect(response.text).toBe('f12088ba0b0c45018df4dad44b51b83d');
    console.log(response)

  });
});

//Test to see if Header is JSON
describe('redorect_uri', () => {
  it('redirect uri is correct?', async () => {
    const response = await request(app).get('/redirect');
    expect(response.text).toBe(process.env.redirect_uri);
    console.log(response)

  });
});




  