const inquirer = require("inquirer");
const mysql = require("mysql2/promise");

startProgram();

async function startProgram() {
    const {choice} = await inquirer.prompt([{
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
  const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employee_db'});
  
  const [rows, fields] = await connection.execute("select * from employee");

 const newChoices = rows.map(employee => ({name:employee.name, value:employee}))  

  console.table(newChoices);
  
  
  const {choice} = await inquirer.prompt([{
    name: "choice",
    type: "list",
    message: "Which employee role do you want to update?",
    choices: newChoices,


}])

    console.log(choice);

    //Make a new query. Based on what ever choice i made, i can update the database or delete from the database
}

async function viewDepartments() {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employee_db'});
  
  const [rows, fields] = await connection.execute("select * from department");

 

  console.table(rows);
}

async function viewRoles() {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employee_db'});
    
    const [rows, fields] = await connection.execute("select * from roles");
  
   
  
    console.table(rows);
}

async function viewEmployees() {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employee_db'});
    
    const [rows, fields] = await connection.execute("select * from employee");

    console.table(rows);
  
}

async function addDepartment() {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employee_db'});
    const {newDepartment} = await inquirer.prompt([{
        name: "newDepartment",
        type: "input",
        message: "What department would like to add?",
        
        
    }]) 
    
    const [rows, fields] = await connection.execute(`INSERT INTO department (id, name) VALUES ("${newDepartment}")`);
    
    
    console.table(rows);
    
}