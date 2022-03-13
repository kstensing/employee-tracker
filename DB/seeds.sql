INSERT INTO departments 
    (name)
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
('Taylor', 'Swift', 1, 7),
('Elvis', 'Presley', 2, NULL),
('Jimi', 'Hendrix', 3, NULL),
('Jay', 'Z', 4, 4),
('Louis', 'Armstrong', 5, 9),
('Wolfgang', 'Mozart', 6, NULL),
('Ray', 'Charles', 7, NULL),
('Whitney', 'Houston', 8, 6),
('Aretha', 'Franklin', 3, NULL),
('Dave', 'Grohl', 7, NULL),
('Paul', 'McCartney', 6, 8),
('Phil', 'Collins', 5, NULL),
('Frank', 'Sinatra', 4, NULL),
('Lady', 'Gaga', 3, NULL);


