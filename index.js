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

    const newChoices = rows.map(employee => ({ name: employee.role_id, value: employee.first_name }))

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
    await connection.execute(`UPDATE employee SET role_id = ${choice} WHERE first_name = "${employeeToChange}"`);
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

    const [rows, fields] = await connection.execute("select * from roles");



    console.table(rows);
    startProgram();
}

async function viewEmployees() {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'employee_db' });

    const [rows, fields] = await connection.execute("select * from employee");

    console.table(rows);
    console.log("----------------------");
    startProgram();

}

async function addRole() {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'employee_db' });

    const newChoices = rows.map(employee => ({ name: employee.role_id, value: employee.first_name },
        { name: department.id, value: department.name }, { name: roles.id, value: roles.title }, { name: roles.id, value: roles.salary }))
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
                message: "Which department id would like to add?",
            }
            
        ])
        
        const [rows, fields] = await connection.execute(`INSERT INTO roles (title, salary, department_id) VALUES ("${newTitle}", ${newSalary}, ${newDeptId})`);
        await connection.execute("SELECT FROM * from roles");
        
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
