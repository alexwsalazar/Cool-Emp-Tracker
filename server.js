
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
        "Update employee role",
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
        case "Update employee role":
          updateRole();
          break;
        case "Quit":
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
      const dprmntDept_name= res.find(role=>role.title===answer.newDeptRole)
      db.query("INSERT INTO roles SET ?",{
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

function addNewDepartment(){
  db.query("SELECT * FROM departments", (err, res)=>{
    if(err) throw err
    inquirer.prompt([
      {
        type:"input",
        name:"newDeptName",
        message:"please enter the new department"
        
      },
     
    ]).then(answer=>{
      
      db.query("INSERT INTO departments SET ?",{
        dept_name: answer.newDeptName
      },function(err){
        if(err)throw err
        console.log("new department sucsesfuly added")
        employeeTrack()
      })
    })
  })
}

async function updateRole() {
    
  const empResults = await db.promise().query('SELECT id, first_name, last_name FROM employee');
  const employees = empResults[0].map(({ id, first_name, last_name }) => ({ value: id, name: `${first_name} ${last_name}` }))

  const rolesResults = await db.promise().query('SELECT id, title FROM roles');
  const roles = rolesResults[0].map(({ id, title }) => ({ value: id, name: title }))

  const result = await inquirer.prompt([
      {
          type: 'list',
          name: 'employee',
          message: "Which employee's role do you want to update?",
          choices: employees
      },
      {
          type: 'list',
          name: 'role',
          message: "Which role do you want to assign the selected employee?",
          choices: roles
      },

  ])

  const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
  db.query(query, [result.role, result.employee], (err, results) => {

      if(err) throw err;
     
      console.log('Successfully updated role!');
      employeeTrack();
      
  })
}