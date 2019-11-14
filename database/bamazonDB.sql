DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT NOT NULL,

product_name VARCHAR(30) NULL,

department_name VARCHAR(30) NULL,

price DECIMAL(10, 2) NULL,

stock_quantity INTEGER,

product_sales DECIMAL(10, 2) NOT NULL DEFAULT "0.00",

PRIMARY KEY (item_id)
);


INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (null, "candles", "home", 10.65, 15),
(null, "fiction novels", "books", 10.50, 40),
(null, "curtains", "home", 18.80, 25),
(null, "ouija board", "occult", 12.25, 8),
(null, "cursed amulet", "occult", 1230.99, 1),
(null, "large labradorite", "crystals", 32.89, 5),
(null, "tea", "grocery", 15.33, 50),
(null, "thread", "sewing", 3.97, 100),
(null, "wine", "grocery", 27.97, 22),
(null, "incense", "home", 9.93, 80);


CREATE TABLE departments (

department_id INTEGER AUTO_INCREMENT NOT NULL,

department_name VARCHAR(30) NULL,

over_head_costs DECIMAL(10, 2) NOT NULL DEFAULT "1500",

total_sales DECIMAL(10, 2) NOT NULL DEFAULT "0.00",

PRIMARY KEY (department_id)
);

INSERT INTO departments (department_id, department_name, over_head_costs, total_sales)
VALUES (null, "home", DEFAULT, DEFAULT),
(null, "books", DEFAULT, DEFAULT),
(null, "crystals", DEFAULT, DEFAULT),
(null, "occult", DEFAULT, DEFAULT),
(null, "grocery", DEFAULT, DEFAULT),
(null, "sewing", DEFAULT, DEFAULT)