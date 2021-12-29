
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee(
id int primary key auto_increment,
name varchar(30),
role_id int

);

INSERT INTO employee (id, name, role_id) values (1, "Jason Day", 1);