create database riceshop;
grant all privileges on riceshop.* to shopadmin@localhost identified by 'shop123' with grant option;

create table item (
    id int not null auto_increment primary key,
    title varchar(100),
    markdown text,
    options varchar(500),
    prices varchar(500),
    publishedDate varchar(200)
);

create table member (
    id int not null auto_increment unique,
    userID varchar(50) not null primary key,
    userName varchar(50) not null,
    userEmail varchar(100) not null,
    userPassword varchar(50) not null,
    createdAt varchar(200)
);

create table checkout (
    id int not null auto_increment primary key,
    imp_uid varchar(200) not null,
    merchant_uid varchar(200) not null,
    paid_amount varchar(20) not null,
    apply_num varchar(100) not null,
    buyer_email varchar(100) not null,
    buyer_name varchar(100) not null,
    buyer_tel varchar(100) not null,
    buyer_addr varchar(200) not null,
    buyer_postcode varchar(20) not null,
    createdAt varchar(200) not null
);