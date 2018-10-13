CREATE DATABASE bamazon;

USE bamazon;

CREATE table products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price decimal default 0,
    stock_quantity int default 0,
    primary key(item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values("mouse", "electronics", 1, 1);

insert into products(product_name, department_name, price, stock_quantity)
values("thumb drive", "electronics", 25, 1), ("speakers", "electronics", 5, 1), ("laptop", "electronics", 50, 1), 
("iPhone 6", "electronics", 50, 1), ("headphones", "electronics", 10, 2),("coffee table", "funiture", 10, 2),
("dinning table","funiture",20,2), ("end table", "funiture", 10, 3), ("desk", "funiture", 25, 3),
("glass desk", "funiture", 25, 3);

