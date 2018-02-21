DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	id INT AUTO_INCREMENT NOT NULL,
    item_id INT NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(20),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10),
    PRIMARY KEY(id)
);


#MOCK DATA ROWS
INSERT  INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (000001, "XBOX", "Entertainment", 299.99, 10);

INSERT  INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (000002, "XBOX ONE S", "Entertainment", 399.99, 8);

INSERT  INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (000003, "PS4", "Entertainment", 299.99, 10);

INSERT  INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (000004, "PS4 S", "Entertainment", 399.99, 8);

INSERT  INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (000005, "NINTENDO 64", "Entertainment", 20.00, 3);

INSERT  INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (000006, "NINTENDO CUBE", "Entertainment", 30.99, 5);

INSERT  INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (000007, "NINTENDO WII", "Entertainment", 99.99, 4);

INSERT  INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (000008, "DREAMCAST", "Entertainment", 19.99, 3);

INSERT  INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (000009, "SNES", "Entertainment", 79.99, 1);

INSERT  INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (0000010, "ATARI 2600", "Entertainment", 69.99, 4);


SELECT * FROM products;

