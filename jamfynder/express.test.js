const request = require("supertest");
const app = require("./server.js");

const baseURL = "http://localhost:3000";

//Test to see Status of Calling API
describe("Testing /callback -> Spotify API", () => {
  it("Status is equal to 200", async () => {
    const response = await request(app).get("/callback");
    expect(response.status).toBe(200);
  });
});

// //Test to see if body has data
// describe("Testing / -> Express Server", () => {
//   it("Index Body was loaded", async () => {
//     const response = await request(app).get("/");
//     expect(response.text).toEqual("Root Express Page");
//   });
// });

//Test to see if Header is JSON
describe("Testing /callback -> Spotify API", () => {
  it("Header is JSON object", async () => {
    const response = await request(app).get("/callback");
    expect(typeof response).toBe("object");
  });
});

//Test to see if clientID is correct
describe("Testing /checkClientID -> Is Correct", () => {
  it("Client ID matches", async () => {
    const response = await request(app).get("/checkClientID");
    expect(response.text).toEqual("f12088ba0b0c45018df4dad44b51b83d");
  });
});

//Test to see if clientSecret is correct
describe("Testing /checkClientisSecret-> Is Correct", () => {
  it("Client Secret matches", async () => {
    const response = await request(app).get("/checkClientSecret");
    expect(response.text).toEqual("e5b6433d5bd94b7a945830ce7b990e36");
  });
});

//Test to see if Redirect is correct
describe("Testing /checkRedirectURI-> Is Correct", () => {
  it("Client Redirect URI matches", async () => {
    const response = await request(app).get("/checkRedirectURI");
    expect(response.text).toEqual("http://localhost:8888/callback");
  });
});

//Test to see if Port is correct
describe("Testing /checkPort-> Is Correct", () => {
  it("Port matches", async () => {
    const response = await request(app).get("/checkPort");
    expect(response.text).toEqual("8888");
  });
});
