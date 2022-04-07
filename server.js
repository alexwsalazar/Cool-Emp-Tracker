
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require("inquirer");
const { title } = require('process');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'P@rty',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);


db.connect(function(){
 employeeTrack()  
})



function employeeTrack() {
  inquirer.prompt([
    {
      name: "choice",
      type: "list",
      message: "Please select an option?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a new department",
        "Add a new role",
        "Add a new employee",
        "Update employee roles",
        "Quit"
      ]
    }])
    .then(function (response) {
      switch (response.choice) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a new department":
          addNewDepartment();
          break;
        case "Add a new role":
          addNewRole();
          break;
        case "Add a new employee":
          addNewEmployee();
          break;
        case "Update employee roles":
          updateRole();
          break;
        case "exit":
          db.end();
          break;
      }
    });
};



function viewAllRoles(){
   db.query('SELECT * FROM roles', (err, res) =>{
    if(err) throw err
    console.table(res)
    employeeTrack()
  });
}

function viewAllDepartments(){
  db.query("SELECT * FROM departments", (err, res)=>{
    if(err) throw err
    console.table(res)
    employeeTrack()
  })
}

function viewAllEmployees(){
  db.query("SELECT * FROM employee", (err, res)=>{
    if(err) throw err
    console.table(res)
    employeeTrack()
  })
}

function addNewEmployee(){
  db.query("SELECT * FROM roles", (err, res)=>{
    if(err) throw err
    inquirer.prompt([
      {
        type:"list",
        name:"newEmpRole",
        message:"please choose a new role for employee",
        choices: res.map(role => role.title)
      },
      {
        type:"input",
        name:"newEmpFN",
        message:"please enter the new employees first name",
      },
      {
        type:"input",
        name:"newEmpLN",
        message:"please enter the new employees last name",
      }
    ]).then(answer=>{
      const roleTitle = res.find(role=>role.title===answer.newEmpRole)
      db.query("INSERT INTO employee SET ?",{
        first_name: answer.newEmpFN,
        last_name: answer.newEmpLN,
        role_id: roleTitle.id
      },function(err){
        if(err)throw err
        console.log("new employee sucsesfuly added")
        employeeTrack()
      })
     
    })
  })
}


function addNewRole(){
  db.query("SELECT * FROM departments", (err, res)=>{
    if(err) throw err
    inquirer.prompt([
      {
        type:"input",
        name:"newTitle",
        message:"please enter the new title"
        
      },
      {
        type:"input",
        name:"newSalary",
        message:"please enter the new salary",
      },
      {
        type:"list",
        name:"newDprmnt",
        message:"please chooce a new dapartment",
        choices: res.map(Dprtmnt => Dprtmnt.dept_name)

      }
    ]).then(answer=>{
      const roleTitle = res.find(role=>role.title===answer.newDeptRole)
      db.query("INSERT INTO role SET ?",{
        title: answer.newTitle,
        salary: answer.newSalary,
        department_id: dprmntDept_name.id
      },function(err){
        if(err)throw err
        console.log("new role sucsesfuly added")
        employeeTrack()
      })
     
    })
  })
}
