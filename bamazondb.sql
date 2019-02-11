
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price INTEGER(10),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);
ALTER TABLE products ADD prodSale INTEGER(10);
ALTER TABLE products ADD department_id INTEGER(10);
UPDATE  products SET prodSale = 0 WHERE item_id >0;
UPDATE products SET department_id = 1 WHERE item_id IN (1,2,4);
UPDATE products SET department_id = 2 WHERE item_id IN (6,9);
UPDATE products SET department_id = 3 WHERE item_id IN (7,8);
UPDATE products SET department_id = 4 WHERE item_id IN (3,5);
UPDATE products SET department_id = 5 WHERE item_id IN (10);
SELECT * from products;
-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("eggs", "f&b", "4", 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("milk", "f&b", "3", 505);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("spinach", "produce", "2", 725);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bread", "f&b", "2", 675);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("apples", "produce", "3", 280);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("baby food", "baby", "2", 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cutlery", "kitchen", "1", 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bakeware", "kitchen", "9", 325);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("diapers", "baby", "3", 890);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chair", "furniture", "17", 720);

CREATE TABLE departments (
  department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  over_head_costs INTEGER(10),
  PRIMARY KEY (department_id)
);
INSERT INTO departments (department_name, over_head_costs)
VALUES ( "f&b", "300");
INSERT INTO departments (department_name, over_head_costs)
VALUES ( "baby", "200");
INSERT INTO departments (department_name, over_head_costs)
VALUES ( "kitchen", "400");
INSERT INTO departments (department_name, over_head_costs)
VALUES ( "produce", "300");
INSERT INTO departments (department_name, over_head_costs)
VALUES ( "furniture", "100");
INSERT INTO departments (department_name, over_head_costs)
VALUES ( "h&b", "240");