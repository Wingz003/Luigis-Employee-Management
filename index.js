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

    const newChoices = rows.map(employee => ({ name: employee.first_name, value: employee.role_id }))

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
    await connection.execute(`UPDATE employee SET role_id = ${choice} WHERE role_id = ${employeeToChange}`);
    viewEmployees();
    
}

async function viewDepartments() {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'employee_db' });

    const [rows, fields] = await connection.execute("select * from department");



    console.table(rows);
}

async function viewRoles() {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'employee_db' });

    const [rows, fields] = await connection.execute("select * from roles");



    console.table(rows);
}

async function viewEmployees() {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'employee_db' });

    const [rows, fields] = await connection.execute("select * from employee");

    console.table(rows);

}

async function addRole() {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'employee_db' });
    const { newDepartment } = await inquirer.prompt([{
        name: "newDepartment",
        type: "input",
        message: "What department would like to add?",


    }])

    const [rows, fields] = await connection.execute(`INSERT INTO department (name) VALUES ("${newDepartment}")`);

    viewDepartments();


}
async function addDepartment() {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'employee_db' });
    const { newDepartment } = await inquirer.prompt([{
        name: "newDepartment",
        type: "input",
        message: "What department would like to add?",


    }])

    const [rows, fields] = await connection.execute(`INSERT INTO department (name) VALUES ("${newDepartment}")`);

    viewDepartments();


}