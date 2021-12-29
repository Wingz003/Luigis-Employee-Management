const inquirer = require("inquirer");
const mysql = require("mysql2/promise");

startProgram();

async function startProgram() {
    const {choice} = await inquirer.prompt([{
        name: "choice",
        type: "list",
        message: "what do you want to do?",
        choices: ["update role", "show employees"],


    }])
    console.log(choice);

    switch (choice) {
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
  // query database
  const [rows, fields] = await connection.execute("select * from employee");

 const newChoices = rows.map(employee => ({name:employee.name, value:employee}))  

  console.log(newChoices);
  
  
  const {choice} = await inquirer.prompt([{
    name: "choice",
    type: "list",
    message: "Which employee role do you want to update?",
    choices: newChoices,


}])

    console.log(choice);

}