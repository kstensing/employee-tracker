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
    const sql = `SELECT * FROM roles`;
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
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name AS "department"
                FROM roles 
                JOIN employees ON roles.id=employees.id
                JOIN departments ON roles.department_id=departments.id
                `;


                //JOIN employees ON employees.manager_id=employees.id
                // employees.manager_id AS "manager"
    // const sql = `SELECT employees.*, roles.
    
    //             LEFT JOIN employees ON roles.id = role_id
    //             LEFT JOIN roles ON employees.role_id = roles.title
    //             LEFT JOIN employees ON manager_id = employees.id`
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
            const sql = `INSERT INTO departments (name) VALUES (?)`;
            const params = [data.deptName]
            db.query(sql, params, (err, rows) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.table(rows);
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
            //need to add multiple choice for depts
            message: "Which department is the new role in?",
        }, ])
        .then(data => {         
            const sql = `SELECT * FROM departments WHERE name = ?`;
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

start();