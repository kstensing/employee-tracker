require('dotenv').config();
const mysql = require('mysql2');
//const db = require('../../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection({
        host: 'localhost',
        // MIGHT NEED TO CHANGE THIS?
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'business'
    },
    console.log('Connected to the business database.')
);

const start = () => {
    return inquirer
        .prompt([{
            type: "list",
            name: "toDo",
            message: "What would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
        }])
        .then(answer => {
            switch (answer.toDo) {
                case "View all departments":
                    viewAllDepts();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update an employee role":
                    updateEmployee();
                    break;
            }
        })
};

const viewAllDepts = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }
        console.table(rows);
        start();
    });
};

const viewAllRoles = () => {
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.dept_name 
                FROM roles
                LEFT JOIN departments ON roles.department_id=departments.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }
        console.table(rows);
        start();
    });
};

const viewAllEmployees = () => {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, concat(m.first_name," ",m.last_name) AS "manager name", roles.title, roles.salary, departments.dept_name AS "department"
                FROM roles 
                JOIN employees ON roles.id=employees.role_id
                JOIN departments ON roles.department_id=departments.id
                LEFT JOIN employees m ON employees.manager_id=m.id
                ORDER BY employees.id
                `;
    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }
        console.table(rows);
        start();
    });
};

const addDepartment = () => {
    return inquirer
        .prompt([{
            type: 'input',
            name: 'deptName',
            message: "What is the name of the new department?",
        }, ])
        .then(data => {
            const sql = `INSERT INTO departments (dept_name) VALUES (?)`;
            const params = [data.deptName]
            db.query(sql, params, (err, rows) => {
                if (err) {
                    console.error(err);
                    return;
                }
                start();
            });
        })
};

const addRole = () => {
    return inquirer
        .prompt([{
                type: 'input',
                name: 'roleTitle',
                message: "What is the title of the new role?",
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: "What is the salary of the new role?",
            },
            {
                type: 'input',
                name: 'roleDept',
                message: "Which department is the new role in?",
            },
        ])
        .then(data => {
            const sql = `SELECT * FROM departments WHERE dept_name = ?`;
            db.query(sql, data.roleDept, (err, rows) => {
                if (err) {
                    console.error(err);
                    console.log("That department doesn't exist!")
                    return;
                }
                const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
                db.query(sql, [data.roleTitle, data.roleSalary, rows[0].id], (err, rows) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    start();
                });
            });
        })
};

const addEmployee = () => {
    return inquirer
        .prompt([{
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name?",
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's last name?",
            },
            {
                type: 'input',
                name: 'role',
                message: "What is the employee's role?",
            },
            {
                type: 'input',
                name: 'managerFirstName',
                message: "What is the manager's first name?",
            },
            {
                type: 'input',
                name: 'managerLastName',
                message: "What is the manager's last name?",
            },
        ])
        .then(data => {
            const roleSql = `SELECT * FROM roles WHERE title = ?`;
            console.log(data.role);
            db.query(roleSql, data.role, (err, rows) => {
                console.log(rows)
                if (err) {
                    console.error(err);
                    console.log("That role doesn't exist! Please add the role first, then add the employee.")
                    return;
                }
                const managerSql = `SELECT * FROM employees WHERE first_name=? and last_name=?`;
                db.query(managerSql, [data.managerFirstName, data.managerLastName], (err, manager) => {
                    if (err) {
                        console.error(err);
                        console.log("That manager doesn't exist! Please add the manager as an employee and try again.")
                        return;
                    }
                    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                    console.log(rows[0].id);
                    console.log(manager[0].id);
                    db.query(sql, [data.firstName, data.lastName, rows[0].id, manager[0].id], (err, rows) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        start();
                    });
                });
            });

        })
};

const updateEmployee = () => {
    const sql = `SELECT concat(employees.first_name," ", employees.last_name) AS employee_name
                        FROM employees`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }
        const employeesArray = rows.map(eachName => eachName.employee_name)

        const sql = `SELECT roles.title
                        FROM roles`;
        db.query(sql, (err, roles) => {
            if (err) {
                console.error(err);
                return;
            }
            const rolesArray = roles.map(eachRole => eachRole.title);

            return inquirer
                .prompt([{
                        type: 'list',
                        name: 'employee',
                        message: "Which employee's role would you like to update?",
                        choices: employeesArray
                    },
                    {
                        type: 'list',
                        name: 'roles',
                        message: "Select the updated role.",
                        choices: rolesArray
                    }
                ])
                .then(data => {
                    //const updateSql = `UPDATE employees SET role_id = ?`
                    console.log(data)
                });

        });
        
    });
    start();
};

start();