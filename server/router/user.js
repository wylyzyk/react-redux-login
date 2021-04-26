const express = require("express");
const isEmpty = require("lodash/isEmpty"); // 验证是否为空
const validator = require("validator"); // 规则验证
const sqlFunc = require("../mysql/index");

const router = express.Router();

const validatorInput = data => {
  const errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.passwd = !isEmpty(data.passwd) ? data.passwd : "";
  data.passwdConfirmation = !isEmpty(data.passwdConfirmation)
    ? data.passwdConfirmation
    : "";

  if (validator.isEmpty(data.username)) {
    errors.username = "please input username";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "please input email";
  }
  if (validator.isEmpty(data.passwd)) {
    errors.passwd = "please input password";
  }
  if (validator.isEmpty(data.passwdConfirmation)) {
    errors.passwdConfirmation = "please comfirm password";
  }
  if (!validator.equals(data.passwd, data.passwdConfirmation)) {
    errors.passwdConfirmation = "Enter password differ";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

router.post("/", (req, res) => {
  const { errors, isValid } = validatorInput(req.body);
  // 接收数据库语句
  const sql = "insert into user values (null, ?, ?, ?, ?)";
  const arr = [
    req.body.email,
    req.body.username,
    req.body.passwd,
    req.body.passwdConfirmation,
  ];
  if (isValid) {
    sqlFunc(sql, arr, data => {
      if (data.affectedRows) {
        res.send({ success: true });
      } else {
        res.status(400).json({ error: "failed login up" });
      }
    });
  } else {
    res.status(400).json(errors);
  }
});

router.get("/", (req, res) => {
  const sql = "select * from user where `username`=?";
  const arr = [req.query.username];
  sqlFunc(sql, arr, data => {
    if(data) {
      res.send(data);
    }else {
      res.send({});
    }
  });
})

module.exports = router;
