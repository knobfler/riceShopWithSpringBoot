create database riceshop;
grant all privileges on riceshop.* to shopadmin@localhost identified by 'shop123' with grant option;

create table riceshop.item (
    id int not null auto_increment primary key,
    title varchar(100),
    markdown text,
    options varchar(500),
    prices varchar(500),
    publishedDate varchar(200)
);

create table riceshop.member (
    id int not null auto_increment unique,
    userID varchar(50) not null primary key,
    userName varchar(50) not null,
    userEmail varchar(100) not null,
    userPassword varchar(50) not null,
    createdAt varchar(200)
);

create table riceshop.checkout (
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
    checked boolean not null default false,
    ordered_list varchar(1000) not null,
    ordered_number varchar(100) not null,
    createdAt varchar(200) not null
);

insert into checkout (imp_uid, merchant_uid, paid_amount, apply_num, buyer_email, buyer_name, buyer_tel, buyer_addr, buyer_postcode, createdAt)
    values ("1", "1", "20000", "1", "dongho@navrer.com", "최동호", "010-1234-1234", "서울시 강서구 우현로 67, 111동 1201호", "123", "2018-04-25 22:49:38");

insert into checkout (imp_uid, merchant_uid, paid_amount, apply_num, buyer_email, buyer_name, buyer_tel, buyer_addr, buyer_postcode, createdAt)
    values ("2", "2", "20000", "2", "dkqlsktm44@naver.com", "김말숙", "010-3309-2234", "서울시 강남구 신길로 7, 101동 101호", "9008", "2018-04-26 22:49:38");