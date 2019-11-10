DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT NOT NULL,

product_name VARCHAR(30) NULL,

department_name VARCHAR(30) NULL,

price DECIMAL(10, 2) NULL,

stock_quantity INTEGER,

PRIMARY KEY (item_id)
);

--create new rows into columns
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (null, "candles", "home", 10.65, 15),
(null, "fiction novels", "books", 10.50, 40),
(null, "curtains", "home", 18.87, 25),
(null, "board games", "toys & games", 12.25, 8),
(null, "ouija board", "occult", 376.99, 1),
(null, "large labradorite", "crystals", 32.89, 5),
(null, "tea", "grocery", 15.33, 50),
(null, "thread", "sewing", 3.97, 100),
(null, "wine", "grocery", 27.97, 22),
(null, "incense", "home", 9.93, 80);