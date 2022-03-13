INSERT INTO departments 
    (dept_name)
VALUES
('Engineering'),
('Legal'),
('Finance'),
('Sales');

INSERT INTO roles
    (title, salary, department_id)
VALUES
('Lead Engineer', 150000, 1),
('Software Engineer', 120000, 1),
('Account Manager', 160000, 3),
('Legal Team Lead', 250000, 2),
('Lawyer', 190000, 2),
('Accountant', 125000, 3),
('Salesperson', 80000, 4),
('Sales Lead', 100000, 4);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
('Taylor', 'Swift', 1,NULL),
('Elvis', 'Presley', 2,NULL),
('Jimi', 'Hendrix', 3,2),
('Jay', 'Z', 4, NULL),
('Louis', 'Armstrong', 5,NULL),
('Wolfgang', 'Mozart', 6,NULL),
('Ray', 'Charles', 7,5),
('Whitney', 'Houston', 8,NULL),
('Aretha', 'Franklin', 3,NULL),
('Dave', 'Grohl', 7,8),
('Paul', 'McCartney', 6,NULL),
('Phil', 'Collins', 5,9),
('Frank', 'Sinatra', 4,NULL),
('Lady', 'Gaga', 3,NULL);


