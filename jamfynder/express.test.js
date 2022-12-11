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

//Test to see if body has data
describe("Testing / -> Express Server", () => {
  it("Index Body was loaded", async () => {
    const response = await request(app).get("/");
    expect(response.text).toEqual("Root Express Page");
  });
});

//Test to see if Header is JSON
describe("Testing /callback -> Spotify API", () => {
  it("Header is JSON object", async () => {
    const response = await request(app).get("/callback");
    expect(typeof response).toBe("object");
    console.log(response);
  });
});
