DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;
USE bamazonDB;

CREATE TABLE Products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  price decimal(10,4) NOT NULL,
  stock_quantity integer NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("PlayStation 3 Dualshock 3 Wireless Controller", "Accessory", "87.98", "712"),
("Rock Band 3 Wireless Keyboard for Xbox 360", "Video Game", "69.54", "536"),
("Nature's Way Foot Booties", "Health and Beauty", "20.99", "688"),
("Datacolor DC S3TV100 Spyder 3 TV", "Electronics", "85.1", "507"),
("Rubber Chicken with Pulley in the Middle", "Monkey Island", "12.26", "241"),
("Pyramid RSW12100 12 Gauge 100 Feet Spool of High Quality Speaker Zip Wire", "Accessory", "13.99", "432"),
("Atlantic Summit 261 CD/114 DVD/132 BluRay/Games Espresso P1",	"Electronics", "79.98", "703"),
("You Don't Know Jack", "Video Game", "29.99", "173"),
("Sleep Innovations Contour Memory Foam Pillow", "Kitchen", "24.99", "611"),
("Rubbermaid FG260100AQUAM Flex N Carry Basket", "Misc", "11.32", "90");

SELECT * FROM Products
