const express = require("express");
const sqlFunc = require("../mysql");
const jwt = require("jsonwebtoken");
const config = require("../config");

const router = express.Router();

router.post("/", (req, res) => {
  const { username, passwd } = req.body;
  const sql = "select * from user where `username`=? AND `password`=?";
  const arr = [username, passwd];
  sqlFunc(sql, arr, data => {
    if (data.length > 0) {
      // console.log(data[0])
      const token = jwt.sign(
        {
          id: data[0].id,
          username: data[0].username,
        },
        config.jwtSecret
      );
      res.send(token);
    } else {
      res.status(401).json({ errors: { from: "username or password error" } });
    }
  });
});

module.exports = router;
