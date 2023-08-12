INSERT INTO department (dept_name)
VALUES (Legal),
       (Technology),
       (Human Resources),
       (Operations),
       (Sales);

INSERT INTO role (title, salary, department_id)
VALUES 
("Legal Counsel", "120,000", 1),
("General Counsel", "300,000", 1),
("Lead Developer", "180,000", 2),
("User Experience Designer", "150,000", 2),
("Engineer", "170,000", 2),
("Infrastructure Manager", "200,000", 2),
("HR Partner", "140,000", 3),
("Recruiter", "120,000", 3),
("Operations Manager", "130,000", 4),
("Customer Support", "80,000", 4),
("Account Manager", "180,000", 5),
("General Manager Sales", "260,000", 5),

       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("James", "Smith", 1, 2),
("Julie", "Sharp", 5, 3),
("Audrey", "Brown", 11, 12),
("Shaun", "Cooke", 7, ),
("Lucas", "Selley", 9, ),
("Shaun", "Cooke", 7, ),