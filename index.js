const inquirer = require("inquirer");
const mysql = require("mysql2/promise");

startProgram();

async function startProgram() {
    const { choice } = await inquirer.prompt([{
        name: "choice",
        type: "list",
        message: "what do you want to do?",
        choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "update role"
        ],


    }])
    console.log(choice);

    switch (choice) {
        case "view all departments":
            viewDepartments()
            break;
        case "view all roles":
            viewRoles()
            break;
        case "view all employees":
            viewEmployees()
            break;
        case "add a department":
            addDepartment()
            break;
        case "add a role":
            addRole()
            break;
        case "add an employee":
            addEmployee()
            break;
        case "update role":
            updateRole()
            break;

        default:
            break;
    }

}

async function updateRole() {
    // create the connection
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'employee_db' });

    const [rows, fields] = await connection.execute("select * from employee");

    const newChoices = rows.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: employee.id }))

    console.table(newChoices);






    const { employeeToChange, choice } = await inquirer.prompt([
        {
            name: "employeeToChange",
            type: "list",
            message: "Which employee role do you want to update?",
            choices: newChoices
        },
        {
            name: "choice",
            type: "input",
            message: "What is the new role id?"
        }
    ])
    await connection.execute(`UPDATE employee SET role_id = ${choice} WHERE id = "${employeeToChange}"`);
    console.log("----------------------");
    viewEmployees();

}

async function viewDepartments() {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'employee_db' });

    const [rows, fields] = await connection.execute("select * from department");



    console.table(rows);
    console.log("----------------------");
    startProgram();
}

async function viewRoles() {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'employee_db' });

    const [rows, fields] = await connection.execute(
        `SELECT 
            roles.title,
            roles.id,
            roles.salary,
            department.name
    
        FROM roles
        INNER JOIN department
        ON roles.department_id = department.id;`
    );



    console.table(rows);
    startProgram();
}

async function viewEmployees() {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'employee_db' });

    const [rows, fields] = await connection.execute(
        `SELECT
            employee.id,
            employee.first_name,
            employee.last_name,
            roles.title,
            department.name,
            roles.salary
            
        FROM employee
        INNER JOIN roles
        ON employee.role_id = roles.id
        INNER JOIN department
        ON roles.department_id = department.id;`
    );

    console.table(rows);
    console.log("----------------------");
    startProgram();

}

async function addRole() {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'employee_db' });





    const { newTitle, newSalary, newDeptId } = await inquirer.prompt([
        {
            name: "newTitle",
            type: "input",
            message: "Which title would you like to add?",
        },
        {
            name: "newSalary",
            type: "input",
            message: "What salary would you like?",
        },
        {
            name: "newDeptId",
            type: "input",
            message: "Which department id number would like to add?",
        }

    ])

    await connection.execute(`INSERT INTO roles (title, salary, department_id) VALUES ("${newTitle}", ${newSalary}, ${newDeptId})`);
    const [rows, fields] = await connection.execute("SELECT * FROM roles;");
    console.table(rows);

    viewRoles();
    console.log("----------------------");
    startProgram();

}
async function addDepartment() {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'employee_db' });
    const { newDepartment } = await inquirer.prompt([{
        name: "newDepartment",
        type: "input",
        message: "What department would like to add?",


    }])

    const [rows, fields] = await connection.execute(`INSERT INTO department (name) VALUES ("${newDepartment}")`);

    console.table(rows);

    viewDepartments();
    console.log("----------------------");
    startProgram();

}

async function addEmployee() {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'employee_db' });

    const { newFirstName, newLastName, newRole, newManagerId } = await inquirer.prompt([
        {
            name: "newFirstName",
            type: "input",
            message: "What is the employees first name?",
        },
        {
            name: "newLastName",
            type: "input",
            message: "What is the employees last name?",
        },
        {
            name: "newRole",
            type: "input",
            message: "What is the employees role id?",
        },
        {
            name: "newManagerId",
            type: "input",
            message: "What is the employees manager id?",
        }
    ])

    const [rows, fields] = await connection.execute(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${newFirstName}", "${newLastName}", ${newRole}, ${newManagerId})`);

    viewEmployees();
    console.log("----------------------");
    startProgram();
}
