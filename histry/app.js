// 加载express
const express = require("express");
//加载 中间件拦截
const bodyParser = require('body-parser');
//引入连接池
const pool = require('./pool')
    // // 创建服务器
const app = express();
// 加载加强密码
const md5 = require('md5')
app.listen(3000, () => {
    console.log('server is running...');
});
app.use(bodyParser.urlencoded({ extended: false }));

// 加载cors
// const cors = require('cors');
const e = require("express");
// app.use(cors({
//     origin: ['http://localhost:8080', 'http://127.0.0.1:8080']
// }))

// 注册
app.post('/register', (req, res) => {
        let uname = req.body.uname;
        let upwd = req.body.upwd;
        let email = req.body.email;
        let phone = req.body.phone;
        let gender = req.body.gender;
        // 验证用户名是否存在
        let sql = "SELECT COUNT(uid) AS count FROM app_user WHERE uname=?";
        pool.query(sql, [uname], (err, result) => {
            if (err) throw err;
            // 根据id查找如果查找为0说明没有就插入，否则就添加
            let count = result[0].count;
            if (count == 0) {
                // 用户名注册
                sql = 'INSERT app_user(uname,upwd,phone,email,gender) value(?,MD5(?),?,?,?)'
                pool.query(sql, [uname, upwd, email, phone, gender], (err, result) => {
                    if (err) throw err;
                    console.log(result)
                    res.send({ msg: "ok", code: 200 })
                })
            } else {
                res.send({ msg: "use exists", code: 201 })
            }
        })
    })
    // 登录
app.post('/login', (req, res) => {
        let uname = req.body.uname;
        let upwd = req.body.upwd;
        let sql = 'SELECT*FROM app_user WHERE uname=? AND upwd=MD5(?)';
        pool.query(sql, [uname, upwd], (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                res.send({ message: "login failed", code: 201 })
            } else {
                res.send({ message: "ok", code: 200, result: result[0] })
            }
        })
    })
    // 修改
app.post('/updeted', (req, res) => {
    let upwd = req.body.upwd;
    let email = req.body.email;
    let phone = req.body.phone;
    let gender = req.body.gender;
    let user_name = req.body.user_name;
    let sql = 'UPDATED app_user SET upwd=MD5(?),email=?,phone=?,gender=?,user_name=? where uid=?'
    pool.query(sql, [upwd, email, phone, gender, user_name], (err, result) => {
        if (err) throw err;
        else {
            if (result.affectedRows > 0) {
                res.send({ mesage: "ok", code: 200, result: results[0] })
            } else {
                res.semd({ message: "修改失败", code: 201 })
            }
        }
    })
})