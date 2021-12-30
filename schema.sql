DROP DATABASE employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id INT primary key auto_increment,
    name VARCHAR(30)
);

CREATE TABLE roles(
    id int primary key auto_increment,
    title varchar(30),
    salary DECIMAL NOT NULL,
    department_id int NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id int primary key auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int NOT NULL,
    manager_id int,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);







INSERT INTO department (id, name) VALUES (1, "a");
INSERT INTO department (id, name) VALUES (2, "b");
INSERT INTO department (id, name) VALUES (3, "c");

INSERT INTO roles (id, title, salary, department_id) VALUES (1, "engineer", 75000, 3);
INSERT INTO roles (id, title, salary, department_id) VALUES (2, "intern", 35000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (1, "Jason", "Day", 1, NULL);