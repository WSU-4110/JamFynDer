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

if (process.env.NODE_ENV !== 'test') {
  app.listen(port);
}
module.exports = app;

app.get("/jtest", (req, res) => {
  res.send("here");
  
});

app.get("/redirect", (req, res) =>{
  res.send(`${REDIRECT_URI}`)
})

app.get("/portTest", (req, res) => {
  res.send(`${port}`);
  
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
  res.send(`${CLIENT_ID}`)

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
        const { access_token, token_type } = response.data;
        axios
          .get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `${token_type} ${access_token}`,
            },
          })
          .then((response) => {
            const jsonObj = response.data;
            res.send(`<pre>${JSON.stringify(jsonObj, null, 2)}</pre>`);
          })
          .catch((error) => {
            res.send(error);
          });
      } else {
        res.send(response);
        console.log(response)
      }
    })
    .catch((error) => {
      res.send(error);
    });

});
