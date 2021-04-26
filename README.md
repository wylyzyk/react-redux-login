# react-redux-login

## 准备工作(arrange)

1.安装依赖

- dependencies:
  redux
  react-redux
  redux-thunk
- devDependencies:
  redux-logger
  redux-devtools-extension

2.搭建服务器

服务器在 server 目录下

1.初始化
npm init 2.安装依赖
npm install express --save 3.启动热更新(nodemon)
npm install nodemon -g

+ 创建 nodemon.json, 添加配置

    ```json
    {
    "restartable": "rs",
    "ignore": [
      ".git",
      ".svn",
      "node_modules/**/node_modules"
    ],
    "verbose": true,
    "execMap": {
      "js": "node --harmony"
    },
    "watch": [],
    "env": {
      "NODE_ENV": "development"
    },
    "ext": "js json"

  }

  ````
+ 修改启动路径package.json

  ```json
  {
    "scripts": {
      "start" :"nodemon ./index.js
    }
  }
  ````

## 搭建页面(build page)

1.登录页面(App.jsx) 
2.注册页面(Signup) 
  + 表单提交页(form)
3.引入样式,在index.html
  ```html
  <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
  ```
4.安装依赖
  样式库
  - npm install classnames --save

## 搭建路由(build route)

1.路由主页面(/router/index.js)

  ```javascript
  import { Route } from "react-router-dom";
  <div>
    <Route exact path="/" component={App}></Route>
    <Route path="/signup" component={SignUp}></Route>
  </div>;
  ```
2.使用`Link`进行跳转
```javascript
  <Link className="navbar-brand" to="/">
    Login功能
  </Link>
  <Link className="nav-link" to="/signup">
    注册
  </Link>
```

3.在 src/index.js 中配置

  ```javascript
  import { BrowserRouter } from "react-router-dom";
  import router from "./router";

  <BrowserRouter routes={router}>
    {router}
  </BrowserRouter>;
  ```

## 使用redux
  1.安装依赖

    ```shell
    # 发送请求
    npm install axios --save
    # 使用中间件 解决跨域
    npm install http-proxy-middleware --save
    ```
  2.在Action中向服务端发送请求, 进行表单提交

  ```javascript
  import axios from "axios";
  export const signupAction = userInfo => {
    return dispatch => {
      return axios.post("api/user", userInfo);
    }
  }
  ```

  3.与服务端不在一个端口, 需要解决跨域
  > 创建src/setupProxy.js <br>
  > 新版本 http-proxy-middleware, 使用 proxy()
  > 会报错` proxy is not a function` , 将proxy换成 `createProxyMiddleware`解决
  ```javascript
  import { createProxyMiddleware} from "http-proxy-middleware";
   
   export default = function (app) {
     app.use(
       "/api",
       createProxyMiddleware({
         "target": "localhost:3030",
         "changeOrigin": true
       })
       );
   }
  ```
## 服务端处理请求
1.安装依赖
```shell
npm install express --save
# lodash中的isEmpty
npm install lodash --save
# validator 进行规则校验
npm install validator --save
# express 4.x+ 不用安装
npm install body-parser --save
```
2.编写路由页面 ./router/user.js
```javascript
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send({
    msg: "hello"
  });
});
```
3.对数据进行规则校验
```javascript
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

// 处理请求
router.post("/", (req, res) => {
  const {errors, isValid} = validatorInput(req.body);
  if(isValid) {
    res.tatus(200).send({
      "msg": "success"
    });
  }else {
    res.status(400).json(errors);
  }
});
```
4.注册路由 /index.js
```javascript
const user = require("./router/user");

app.use(express.json());  // express 4.x+ 
app.use("/api/user", user);
```
### 服务端踩坑
1.使用`router.post();` 浏览器控制台, 发生`404 NOT FOUND`, 在postman中测试没问题, 数据不能显示, `TODO: 还没解决`.
<br>2.对数据一开始, 没做非空处理,报错`TypeError: Expected string but received a undefined`, ---`RESOLVED: 已解决`
## 返回请求, 路由跳转

## status:200, 实现页面跳转
  1.请求成功
  ```javascript
  onSubmit = e => {
    this.props.signupActions.userSignupRequest(this.state).then(
      () => {
        this.props.history.push("/");
      },
      () => {}
    );
  }
  ```
  2.实现页面跳转的两种方式
  > SignupForm组件属于路由控制组件的`子组件`, **props**上没有history, 获取到 history 有两种方式 .
 
 - 通过父组件, 进行传值, 然后使用props获取history
 
  ```jsx
 <SignUpForm history={this.props.history} />
  ```

- 使用`withRouter`获取

 ```js
  import { withRouter } from "react-router-dom";
  
  withRouter(SignUpForm);
 ```

## 建立数据库
1. 安装xampp, [教程及配置](https://blog.csdn.net/qq_36595013/article/details/80373597)
2. 启动服务器
- 查看是否启动成功: http://localhost:8081/dashboard/
- 登录数据库: http://localhost:8081/phpmyadmin/
> 有可能登录失败, 查看端口号是否与配置文件中的保持一致
- 创建数据库

## 连接数据库
1. 安装依赖
```shell
npm install mysql --save
```
2. 创建 ./mysql/index.js
```javascript
const mysql = require("mysql");
// 数据库配置信息, 需与已创建的保持一致
const client = mysql.createConnection({
  host: "localhost",
  port: "3316",
  user: "root",
  password: "root",
  database: "login_user"  // 数据库名称
});

/**
 * sql sql语句
 * arr 查询的数据
 * callback 成功的回调函数
 */
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

```
3. 在验证过程中, server可能会报错`ERROR: ER_NOT_SUPPORT_AUTH_MODE`
> 解决办法: MySQL 5.x 和 MySQL 8.x 加密方式不一样, [解决办法](https://waylau.com/node.js-mysql-client-does-not-support-authentication-protocol/) 

## 登录页面
1. 页面搭建
  - LoginPage
    + LoginForm
2. 向服务端发送请求进行验证
```javascript
export const login = data => {
  return dispatch => {
    return axios.post("/api/auth", data).then(res => {
      // 请求成功, 将数据进行localStorage 存储
      const token = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthOrizationToken(token);
      setCurrentUser(jwtDecode(token));
    });
  }
```
3. 服务端操作
```javascript
router.post("/", (req, res) => {
  const { username, passwd } = req.body;
  const sql = "select * from user where `username`=? AND `password`=?";
  const arr = [username, passwd];
  sqlFunc(sql, arr, data => {
    if (data.length > 0) {
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
```
## Other
1. 使用[jwt](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)存储用户数据
2. 高阶组件`requireAuth.js`