const inquirer = require("inquirer");
const DataOps = require("./db.js");
const Table = require("cli-table3");

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
                choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role']
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
                case 'Add a Department':
                    this.addDepartment();
                    break;
                case 'Add a Role':
                    this.addRole();
                    break;
                case 'Add an Employee':
                    this.addEmployee();
                    break;
                case 'Update Employee Role':
                    this.updateEmployeeRole();
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
            const table = new Table({
                head: ["Department ID", "Department Name"]
            });

            departments.forEach(department => {
                table.push([department.id, department.dept_name]);
            });
            console.log(table.toString());
          }
          this.showMainMenu(); 
        }.bind(this)); 
    }

    viewAllRoles() {
        this.dataOps.getAllRoles(function (err, roles) {
            if (err) {
                console.error("An error occurred:", err);
            } else {
                const table = new Table({
                    head: ["Role ID", "Title", "Salary", "Department"]
                });
                roles.forEach(role => {
                    table.push([role.id, role.title, role.salary, role.dept_name]);
                });
                console.log(table.toString());
              }
    
            this.showMainMenu(); 
        }.bind(this)); 
    }
    
    viewAllEmployees() {
        this.dataOps.getAllEmployees(function (err, employees) {
            if (err) {
                console.error("An error occurred:", err);
            } else {
                const table = new Table({
                    head: ["Employee ID", "First Name", "Last Name", "Job Title", "Department", "Salary", "Manager"]
                });
                employees.forEach(employee => {
                    table.push([employee.id, employee.first_name, employee.last_name, employee.job_title,
                    employee.department, employee.salary, employee.manager_name]);
                });
                console.log(table.toString());
              }
    
            this.showMainMenu(); 
        }.bind(this)); 
    }

    addDepartment() {
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'deptName',
              message: 'Enter the department name:',
            },
          ])
          .then((answers) => {
            this.dataOps.addDepartment(answers.deptName, function (err) {
              if (err) {
                console.error("An error occurred:", err);
              } else {
                console.log("Department added successfully.");
              }
    
              this.showMainMenu(); 
            }.bind(this)); 
        })
        .catch((err) => {
          console.error("An error occurred:", err);
          this.showMainMenu(); 
        });
    }

    addRole() {
        // Get departments from the database using DataOps.getAllDepartments()
        this.dataOps.getAllDepartments(function (err, departments) {
            if (err) {
            console.error("An error occurred:", err);
            this.showMainMenu(); // Repeat the prompt
            return;
            }
    
            const departmentChoices = departments.map(department => {
            return {
                name: department.dept_name,
                value: department.id
            };
        });

        inquirer
          .prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Enter the role title',
            },
            {
                type: 'number',
                name: 'roleSalary',
                message: 'Enter the role salary',
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Select the department:',
                choices: departmentChoices
            }
            ])
            .then((answers) => {
                this.dataOps.addRole(answers.roleTitle, answers.roleSalary, answers.departmentId, function (err) {
                if (err) {
                    console.error("An error occurred:", err);
                } else {
                    console.log("Role added successfully.");
                }
        
                this.showMainMenu(); 
                }.bind(this)); 
            })
            .catch((err) => {
            console.error("An error occurred:", err);
            this.showMainMenu(); 
            });
        }.bind(this));
    }

    addEmployee() {
        // Get departments from the database using DataOps.getAllDepartments()
        this.dataOps.getAllRoles((err, roles) => {
            if (err) {
                console.error("An error occurred:", err);
                this.showMainMenu();
                return;
            }
    
            const roleChoices = roles.map(role => {
                return {
                    name: role.title,
                    value: role.id
                };
            });

            this.dataOps.getAllEmployees((err, employees) => {
                if (err) {
                    console.error("An error occurred:", err);
                    this.showMainMenu();
                    return;
                }
    
                const managerChoices = employees.map(employee => {
                    return {
                        name: employee.first_name + ' ' + employee.last_name,
                        value: employee.id
                    };
                });

                 // Add an option for "No Manager"
                managerChoices.unshift({
                    name: "No Manager.",
                    value: "NULL"
                });


            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: "Enter the employee's first name:",
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: "Enter the employee's last name:",
                    },
                    {
                        type: 'list',
                        name: 'roleId',
                        message: "Select the employee's role:",
                        choices: roleChoices
                    },
                    {
                        type: 'list',
                        name: 'managerId',
                        message: "Select the employee's manager:",
                        choices: managerChoices
                    }
                    ])
                    .then((answers) => {
                        this.dataOps.addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId, function (err) {
                            if (err) {
                                console.error("An error occurred:", err);
                            } else {
                                console.log("Employee added successfully.");
                            }

                            this.showMainMenu(); 
                        }.bind(this)); 
                    })
                    .catch((err) => {
                        console.error("An error occurred:", err);
                        this.showMainMenu();
                    });
                });
            });
    }

    updateEmployeeRole() {
        // Get departments from the database using DataOps.getAllDepartments()
        this.dataOps.getAllRoles((err, roles) => {
            if (err) {
                console.error("An error occurred:", err);
                this.showMainMenu();
                return;
            }
    
            const roleChoices = roles.map(role => {
                return {
                    name: role.title,
                    value: role.id
                };
            });

            this.dataOps.getAllEmployees((err, employees) => {
                if (err) {
                    console.error("An error occurred:", err);
                    this.showMainMenu();
                    return;
                }
    
                const employeeChoices = employees.map(employee => {
                    return {
                        name: employee.first_name + ' ' + employee.last_name,
                        value: employee.id
                    };
                });


            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'employeeId',
                        message: "Select employee:",
                        choices: employeeChoices
                    },
                    {
                        type: 'list',
                        name: 'roleId',
                        message: "Select employee's new role:",
                        choices: roleChoices
                    }
                    ])
                    .then((answers) => {
                        this.dataOps.updateEmployee(answers.employeeId, answers.roleId, function (err) {
                            if (err) {
                                console.error("An error occurred:", err);
                            } else {
                                console.log("Employee role updated successfully.");
                            }

                            this.showMainMenu(); 
                        }.bind(this)); 
                    })
                    .catch((err) => {
                        console.error("An error occurred:", err);
                        this.showMainMenu();
                    });
                });
            });
    }
}

module.exports = Questions;

const questions = new Questions();
questions.run();