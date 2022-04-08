USE employee_db;
INSERT INTO departments (dept_name ) 
VALUES  ("Human Resources"),
        ('IT'),
        ("Sales"),
        ("Accounting"),
        ("Logistics"),
        ("Environment"),
        ("Recuiting"),
        ("Upper Management"),
        ("Payroll");

INSERT INTO roles (title, salary, department_id) 
VALUES  ("Receptionist", 40000, 6),
        ("IT Manager", 65000, 2),
        ("Database Admin", 65000, 2),
        ("Recruitment Specialist", 60000, 7),
        ("Work Force Coordinator", 50000, 5),
        ("CSR", 45000, 6),
        ("Payroll Administrator", 55000, 9),
        ("Office Culture Manger", 65000, 1),
        ("Fulfillment Director", 70000, 3),
        ("President of Sales", 115000, 3),
        ("Accounts Receivable Analyst", 60000, 4),
        ("Project Accountant", 80000, 4),
        ("Senior Accountant", 90000, 4),
        ("Product Specialist", 66000, 2),
        ("Dispatcher", 55000, 5),
        ("Full Stack Developer", 90000, 2),
        ("CEO", 200000, 8),
        ("COO", 190000, 8),
        ("CTO", 185000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES  ("Tony", "Stark", 20, NULL),
        ("Bruce", "Banner", 18, NULL),
        ("Steve", "Rogers", 19, NULL),
        ("Scott", "Lang", 2, 1),
        ("Pam", "Halpert", 1, 2),
        ("Sue", "Storm", 5, NULL),
        ("Reed", "Richards", 6, NULL),
        ("Thor", "Odinson", 7, NULL),
        ("Peter", "Parker", 8, NULL),
        ("Kam","Kinley",17,1),
        ("Apolo","Creed",11,13),
        ("Steven","Strange",11,13),
        ("Wanda","Vision",13,2),
        ("Bucky","Barnes",15,4);
        