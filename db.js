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
        db.query('SELECT * FROM role', function (err, results) {
            if (err) {
                console.error ('Error fetching roles:', err);
                return callback(err, null);
            }
            callback(null, results);
          });
    }
    getAllEmployees(callback) {
        db.query('SELECT * FROM employee', function (err, results) {
            if (err) {
                console.error ('Error fetching employee list:', err);
                return callback(err, null);
            }
            callback(null, results);
          });
    }
}

   

module.exports = DataOps;
