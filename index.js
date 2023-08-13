const inquirer = require("inquirer");
const DataOps = require("./db.js")
//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

class Questions {
    constructor() {
        this.dataOps = new DataOps();
      }
    
      run() {
        this.showMainMenu();
      }
    
      showMainMenu() {
        inquirer
        .prompt([
           
            {
                type: 'list',
                name: 'actions',
                message: 'What would you like to do?',
                choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Add an Employee Role']
            },
        ])
        .then((answers) => {
            console.log("Selected action:", answers.actions);
            
            switch (answers.actions) {
                case 'View all Departments':
                    this.viewAllDepartments();
                    break;
                case 'View all Roles':
                    this.viewAllRoles();
                    break;
                case 'View all Employees':
                    this.viewAllEmployees();
                    break;
                case 'Exit':
                    console.log('Exiting...');
                    return;
                default:
                    console.log("Invalid action selected");
                    this.showMainMenu();
            }
        })
        .catch((err) => {
           console.error("An error occurred", err);
           this.showMainMenu();
        });
    }

    viewAllDepartments() {
        this.dataOps.getAllDepartments(function (err, departments) {
          if (err) {
            console.error("An error occurred:", err);
          } else {
            departments.forEach(department => {
            console.log("Department Name:", department.dept_name);
            });
          }
          this.showMainMenu(); 
        }.bind(this)); 
    }

    viewAllRoles() {
        this.dataOps.getAllRoles(function (err, roles) {
            if (err) {
                console.error("An error occurred:", err);
            } else {
                roles.forEach(role => {
                console.log(role.title); 
                });
              }
    
            this.showMainMenu(); 
        }.bind(this)); 
    }
    
    viewAllEmployees() {
        this.dataOps.getAllEmployees(function (err, employees) {
            if (err) {
                console.error("An error occurred:", err);
            } else {
                employees.forEach(employee => {
                console.log(employee.first_name + " " + employee.last_name); 
                });
              }
    
            this.showMainMenu(); 
        }.bind(this)); 
    }
}

module.exports = Questions;

const questions = new Questions();
questions.run();