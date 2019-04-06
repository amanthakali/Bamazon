

CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE product(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
	Price DECIMAL(10,2) NOT NULL,
    stockQuantity INT(10) NOT NULL,
	PRIMARY KEY (item_id)
);