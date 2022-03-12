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
                    viewAllDepts(answer);
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

const viewAllDepts = (answer) => {
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

// const addEngineer = (employee) => {
//     return inquirer.prompt([{
//             type: 'input',
//             name: 'github',
//             message: "What is the employee's GitHub username?",
//             validate: githubInput => {
//                 if (githubInput) {
//                     return true;
//                 } else {
//                     console.log('Please enter a GitHub username.');
//                     return false;
//                 }
//             }
//         }, ])
//         .then(data => {
//             const { name, email, id } = employee
//             let temp = new Engineer(name, email, id, data.github);
//             employees.push(temp);
//             start();
//         })
// };

start();