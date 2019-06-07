require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const proxy = require("http-proxy-middleware");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const jwtDecode = require("jwt-decode");
const appConfig = require("./box-config.js");

const PORT = process.env.PORT || 1234;

const corsOptions = {
  origin: ["*"]
};

express()
  .use(cors(corsOptions))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(express.static(path.join(__dirname, "dist")))
  .use(express.static(path.join(__dirname, "public")))
  .use(
    proxy("/api", {
      target: "https://example.com",
      changeOrigin: true,
      pathRewrite: { "^/api": "" }
    })
  )
  .get("/box-authenticate", (req, res) => {
    const qs = querystring.stringify({
      response_type: "code",
      client_id: appConfig.oauthClientId
    });
    res.redirect(`https://account.box.com/api/oauth2/authorize?${qs}`);
  })
  .get("/redirect", ({ query, cookies }, res) => {
    const { code } = query;
    const { idtoken: idToken } = cookies;
    const { user_id: userId } = jwtDecode(idToken);
    console.log("userid", userId);
    res.redirect(
      `https://example.com/v0.1/account/2/box-return/${userId}?code=${code}`
    );
  })
  .get("*", (req, res) => res.sendFile(`${__dirname}/dist/index.html`))
  .listen(PORT, () => console.log("__CLIENT_RUNNING__", PORT));
