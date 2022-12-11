const express = require("express");
require("dotenv").config();
const app = express();
const querystring = require("query-string");
const axios = require("axios");
const { query, response } = require("express");
const port = 8888;

//Spotify Vars
const CLIENT_ID = process.env.client_id;
const CLIENT_SECRET = process.env.client_secret;
const REDIRECT_URI = process.env.redirect_uri;

const SCOPE = "user-read-private user-read-email";
const STATEKEY = "spotify_auth_state";

app.set("view engine", "ejs");

function generateRandomString(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

app.get("/", (req, res) => {
  res.send("Root Express Page");
});

const stateKey = "spotify_auth_state";

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = ["user-read-private", "user-read-email", "user-top-read"].join(
    " "
  );

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
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
        const { access_token, refresh_token, expries_in } = response.data;
        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
          expries_in,
        });
        res.redirect(`http://localhost:3000/?${queryParams}`);
      } else {
        res.redirect(`/?${querystring.stringify({ error: "invalid token" })}`);
      }
    })
    .catch((error) => {
      res.send(error);
    });

  app.get("/refresh_token", (req, res) => {
    const { refresh_token } = req.query;
    axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${new Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString(`base64`)}`,
      },
    })
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        res.send(error);
      });
  });
});

module.exports = app;
