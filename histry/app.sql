SET NAMES UTF8;
DROP DATABASE IF EXISTS app;
CREATE DATABASE app CHARSET=UTF8;
USE app;


/** 用户信息 **/
CREATE TABLE app_user(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    uname   VARCHAR(32),
    upwd VARCHAR(32),
    phone VARCHAR(11),
    email   VARCHAR(64),
    avatar VARCHAR(128),
    user_name VARCHAR(32),
    gender INT
);

INSERT INTO app_user VALUES (1,'wudewan','123456','15655312160','1239437537@qq.com','','吴德万',1)
