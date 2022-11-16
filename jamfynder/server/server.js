const express = require("express");
require("dotenv").config();
const app = express();
const querystring = require("query-string");
const axios = require("axios");
const { query, response } = require("express");

//Spotify Vars
const CLIENT_ID = process.env.client_id;
const CLIENT_SECRET = process.env.client_secret;
const REDIRECT_URI = process.env.redirect_uri;

const SCOPE = "user-read-private user-read-email";
const STATEKEY = "spotify_auth_state";

function generateRandomString(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log("here");
  res.render("index");
});

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(STATEKEY, state);
  const queryParams = querystring.stringify({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
    state: STATEKEY,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
      } else {
        res.send(response);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(3000);
