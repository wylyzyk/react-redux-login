const express = require("express");
const user = require("./router/user");
const auth = require("./router/auth")
const debug = require("debug")("my-application");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}))
app.use("/api/user", user);
app.use("/api/auth", auth);

app.listen(3030, () => {
  debug("server running port 3030");
});
