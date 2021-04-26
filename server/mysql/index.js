const mysql = require("mysql");

const client = mysql.createConnection({
  host: "localhost",
  port: "3316",
  user: "root",
  password: "root",
  database: "login_user",
});

function sqlFunc(sql, arr, callback) {
  client.query(sql, arr, (err, result) => {
    if (err) {
      console.log(new Error(err));
      return;
    }
    callback(result);
  });
}

module.exports = sqlFunc;
