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
    (first_name, last_name, role_id)
VALUES
('Taylor', 'Swift', 1),
('Elvis', 'Presley', 2),
('Jimi', 'Hendrix', 3),
('Jay', 'Z', 4),
('Louis', 'Armstrong', 5),
('Wolfgang', 'Mozart', 6),
('Ray', 'Charles', 7),
('Whitney', 'Houston', 8),
('Aretha', 'Franklin', 3),
('Dave', 'Grohl', 7),
('Paul', 'McCartney', 6),
('Phil', 'Collins', 5),
('Frank', 'Sinatra', 4),
('Lady', 'Gaga', 3);


