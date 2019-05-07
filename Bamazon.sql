DROP DATABASE IF EXISTS illwill;

CREATE DATABASE illwill;

USE illwill;

CREATE TABLE wares (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantitiy INTEGER(10) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO wares (product_name, department_name, price, stock_quantitiy)
VALUES ("Withered monkey's paw", 'Ancient Relics', 666.66, 1);

INSERT INTO wares (product_name, department_name, price, stock_quantitiy)
VALUES ("Cursed Book of average cursedness", 'Ancient Relics', 99.99, 3);

INSERT INTO wares (product_name, department_name, price, stock_quantitiy)
VALUES ("Glowing rock of questionable source", 'Ancient Relics', 24.99, 27);

INSERT INTO wares (product_name, department_name, price, stock_quantitiy)
VALUES ("Potion of meager encouragement", 'Potions', 9.99, 59);

INSERT INTO wares (product_name, department_name, price, stock_quantitiy)
VALUES ("Elixer of immeasureable pleasure and or pain", 'Potions', 19.99, 10);

INSERT INTO wares (product_name, department_name, price, stock_quantitiy)
VALUES ("Ointment for drinkers regret", 'Potions', 24.99, 47);

SELECT * FROM wares