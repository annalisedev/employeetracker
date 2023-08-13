INSERT INTO department (dept_name)
VALUES ("Legal"),
       ("Technology"),
       ("Human Resources"),
       ("Operations"),
       ("Sales");


INSERT INTO role (title, salary, dept_id)
VALUES 
("Legal Counsel", "120000.00", 1),
("General Counsel", "300000.00", 1),
("Lead Developer", "180000.00", 2),
("User Experience Designer", "150000.00", 2),
("Engineer", "170000.00", 2),
("Infrastructure Manager", "200000.00", 2),
("HR Partner", "140000.00", 3),
("Recruiter", "120000.00", 3),
("Operations Manager", "130000.00", 4),
("Customer Support", "80000.00", 4),
("Account Manager", "180000.00", 5),
("General Manager Sales", "260000.00", 5);
       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("James", "Smith", 1, 2),
("Julie", "Sharp", 5, 3),
("Audrey", "Brown", 11, 12),
("Shaun", "Cooke", 7, NULL),
("Lucas", "Selley", 9, NULL),
("Michelle", "Kerr", 8, 7),
("Lucy", "Pourty", 12, NULL),
("Elton", "John", 2, NULL),
("Jax", "Jones", 1, 2),
("Nathan", "Dawe", 11, 12);