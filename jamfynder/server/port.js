const app = require("./server");
const port = 3000
const express = require("express");
require("dotenv").config();
const querystring = require("query-string");
const axios = require("axios");
const { query, response } = require("express");

app.listen(port, () => console.log("server starting on port 3000!"));

app.set("view engine", "ejs");

app.get("/jtest", (req, res) => {
    res.send("here");
    
  });

module.exports = port;
