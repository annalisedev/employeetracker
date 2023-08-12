const inquirer = require("inquirer");

//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

class Questions {
    run() {
        inquirer
        .prompt([
           
            {
                type: 'list',
                name: 'actions',
                message: 'What would you like to do?',
                choices: ["View all Departments", "View all Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Add an Employee Role"] 
            },
        ])
        .then(({ text, textColour, shape, shapecolour }) => {
            if (text.length > 3) {
                console.log("Logo text must be 3 characters or less, please try again.");
            } else {
                if (shape === 'Circle') {
                    const circle = new Circle(shapecolour, text, textColour);
                    circle.createSvgFile();
                } else if (shape === 'Triangle') {
                    const triangle = new Triangle(shapecolour, text, textColour);
                    triangle.createSvgFile();
                } else if (shape === 'Square') {
                    const square = new Square(shapecolour, text, textColour);
                    square.createSvgFile();
                }
            }
        })
        .catch((err) => {
            console.log(err) ; console.log("Generated logo.svg");
        });
    }
}

module.exports = Questions;