// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'abcd1234',
      database: 'companyinfo_db'
    },
    console.log(`Connected to the companyinfo_db database.`)
  );

//commands to query the database and return the right information
class DataOps {
    getAllDepartments(callback) {
        db.query('SELECT * FROM department', function (err, results) {
            if (err) {
                console.error ('Error fetching departments:', err);
                return callback(err, null);
            }
            callback(null, results);
          });
    }
    getAllRoles(callback) {
        db.query('SELECT role.id, role.title, role.salary, department.dept_name FROM role JOIN department ON role.dept_id = department.id;'
        , function (err, results) {
            if (err) {
                console.error ('Error fetching roles:', err);
                return callback(err, null);
            }
            callback(null, results);
          });
    }
    getAllEmployees(callback) {
        const query = `
            SELECT
                e.id,
                e.first_name,
                e.last_name,
                r.title AS job_title,
                d.dept_name AS department,
                r.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager_name
            FROM
                employee e
            JOIN
                role r ON e.role_id = r.id
            JOIN
                department d ON r.dept_id = d.id
            LEFT JOIN
                employee m ON e.manager_id = m.id;
        `;

        db.query(query, function (err, results) {
            if (err) {
                console.error ('Error fetching employee list:', err);
                return callback(err, null);
            }
            callback(null, results);
          });
    }
    addDepartment(departmentName, callback) {
        const query = 'INSERT INTO department (dept_name) VALUES (?)';
        db.query(query, [departmentName], function (err, results) {
          if (err) {
            console.error('Error adding department:', err);
            return callback(err);
          }
          callback(null);
        });
    }
    addRole(roleTitle, roleSalary, departmentId, callback) {
        const query = 'INSERT INTO role (title, salary, dept_id) VALUES (?, ?, ?)';
        db.query(query, [roleTitle, roleSalary, departmentId], function (err, results) {
          if (err) {
            console.error('Error adding role:', err);
            return callback(err);
          }
          callback(null);
        });
    }
    addEmployee(firstName, lastName, roleId, managerId, callback) {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        db.query(query, [firstName, lastName, roleId, managerId], function (err, results) {
          if (err) {
            console.error('Error adding role:', err);
            return callback(err);
          }
          callback(null);
        });
    }
    updateEmployee(employeeId, roleId, callback) {
        const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
        db.query(query, [roleId, employeeId], function (err, results) {
          if (err) {
            console.error('Error adding role:', err);
            return callback(err);
          }
          callback(null);
        });
    }
}

module.exports = DataOps;
