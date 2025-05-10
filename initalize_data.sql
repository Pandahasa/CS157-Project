-- Major: Computer Science (Students 1-20)
INSERT INTO Students (first_name, last_name, major) VALUES
('Liam', 'Garcia', 'Computer Science'), ('Olivia', 'Martinez', 'Computer Science'),
('Noah', 'Rodriguez', 'Computer Science'), ('Emma', 'Hernandez', 'Computer Science'),
('Oliver', 'Lopez', 'Computer Science'), ('Ava', 'Gonzalez', 'Computer Science'),
('Elijah', 'Wilson', 'Computer Science'), ('Charlotte', 'Anderson', 'Computer Science'),
('William', 'Thomas', 'Computer Science'), ('Sophia', 'Taylor', 'Computer Science'),
('James', 'Moore', 'Computer Science'), ('Amelia', 'Martin', 'Computer Science'),
('Benjamin', 'Jackson', 'Computer Science'), ('Isabella', 'Lee', 'Computer Science'),
('Lucas', 'Perez', 'Computer Science'), ('Mia', 'Thompson', 'Computer Science'),
('Henry', 'White', 'Computer Science'), ('Evelyn', 'Harris', 'Computer Science'),
('Alexander', 'Sanchez', 'Computer Science'), ('Harper', 'Clark', 'Computer Science');

-- Major: Computer Engineer (Students 21-40)
INSERT INTO Students (first_name, last_name, major) VALUES
('Michael', 'Lewis', 'Computer Engineer'), ('Abigail', 'Robinson', 'Computer Engineer'),
('Ethan', 'Walker', 'Computer Engineer'), ('Emily', 'Young', 'Computer Engineer'),
('Daniel', 'Allen', 'Computer Engineer'), ('Elizabeth', 'King', 'Computer Engineer'),
('Matthew', 'Wright', 'Computer Engineer'), ('Sofia', 'Scott', 'Computer Engineer'),
('Aiden', 'Green', 'Computer Engineer'), ('Avery', 'Baker', 'Computer Engineer'),
('Joseph', 'Adams', 'Computer Engineer'), ('Ella', 'Nelson', 'Computer Engineer'),
('Samuel', 'Hill', 'Computer Engineer'), ('Scarlett', 'Ramirez', 'Computer Engineer'),
('David', 'Campbell', 'Computer Engineer'), ('Grace', 'Mitchell', 'Computer Engineer'),
('Carter', 'Roberts', 'Computer Engineer'), ('Chloe', 'Carter', 'Computer Engineer'),
('Ryan', 'Phillips', 'Computer Engineer'), ('Victoria', 'Evans', 'Computer Engineer');

-- Major: Data Science (Students 41-60)
INSERT INTO Students (first_name, last_name, major) VALUES
('John', 'Turner', 'Data Science'), ('Riley', 'Torres', 'Data Science'),
('Owen', 'Parker', 'Data Science'), ('Aria', 'Collins', 'Data Science'),
('Isaac', 'Edwards', 'Data Science'), ('Zoe', 'Stewart', 'Data Science'),
('Gabriel', 'Flores', 'Data Science'), ('Nora', 'Morris', 'Data Science'),
('Anthony', 'Nguyen', 'Data Science'), ('Hannah', 'Murphy', 'Data Science'),
('Caleb', 'Rivera', 'Data Science'), ('Lily', 'Cook', 'Data Science'),
('Joshua', 'Rogers', 'Data Science'), ('Layla', 'Morgan', 'Data Science'),
('Andrew', 'Peterson', 'Data Science'), ('Brooklyn', 'Cooper', 'Data Science'),
('Christian', 'Reed', 'Data Science'), ('Penelope', 'Bailey', 'Data Science'),
('Nathan', 'Bell', 'Data Science'), ('Stella', 'Gomez', 'Data Science');

-- Major: Biology (Students 61-80)
INSERT INTO Students (first_name, last_name, major) VALUES
('Jonathan', 'Kelly', 'Biology'), ('Aubrey', 'Howard', 'Biology'),
('Isaiah', 'Ward', 'Biology'), ('Claire', 'Cox', 'Biology'),
('Christopher', 'Diaz', 'Biology'), ('Skylar', 'Richardson', 'Biology'),
('Aaron', 'Wood', 'Biology'), ('Paisley', 'Watson', 'Biology'),
('Landon', 'Brooks', 'Biology'), ('Everly', 'Bennett', 'Biology'),
('Adrian', 'Gray', 'Biology'), ('Anna', 'James', 'Biology'),
('Charles', 'Reyes', 'Biology'), ('Lucy', 'Cruz', 'Biology'),
('Jose', 'Hughes', 'Biology'), ('Maya', 'Price', 'Biology'),
('Adam', 'Myers', 'Biology'), ('Camila', 'Long', 'Biology'),
('Thomas', 'Foster', 'Biology'), ('Genesis', 'Sanders', 'Biology');

-- Major: Business (Students 81-100)
INSERT INTO Students (first_name, last_name, major) VALUES
('Kevin', 'Ross', 'Business'), ('Madelyn', 'Powell', 'Business'),
('Robert', 'Sullivan', 'Business'), ('Eleanor', 'Russell', 'Business'),
('Justin', 'Ortiz', 'Business'), ('Caroline', 'Jenkins', 'Business'),
('Brandon', 'Gutierrez', 'Business'), ('Violet', 'Perry', 'Business'),
('Jason', 'Butler', 'Business'), ('Naomi', 'Barnes', 'Business'),
('Elias', 'Henderson', 'Business'), ('Hazel', 'Coleman', 'Business'),
('Tyler', 'Simmons', 'Business'), ('Aurora', 'Patterson', 'Business'),
('Nicholas', 'Jordan', 'Business'), ('Savannah', 'Reynolds', 'Business'),
('Brian', 'Hamilton', 'Business'), ('Audrey', 'Graham', 'Business'),
('Eric', 'Kim', 'Business'), ('Bella', 'Stone', 'Business');

-- Department: Computer Science (Courses 1-3)
INSERT INTO Courses (title, department, description, credits) VALUES
('CS101: Intro to CS', 'Computer Science', 'Core concepts of Computer Science.', 3),
('CS201: Data Structures', 'Computer Science', 'Fundamental data structures.', 4),
('CS301: Algorithms', 'Computer Science', 'Algorithm design and analysis.', 4);

-- Department: Engineering (Courses 4-6)
INSERT INTO Courses (title, department, description, credits) VALUES
('ENGR101: Intro to Eng', 'Engineering', 'Foundations of engineering disciplines.', 3),
('ENGR201: Statics & Dynamics', 'Engineering', 'Mechanics for engineers.', 4),
('ENGR301: Thermodynamics', 'Engineering', 'Principles of energy conversion.', 3);

-- Department: Data Science (Courses 7-9)
INSERT INTO Courses (title, department, description, credits) VALUES
('DS101: Intro to Data Sci', 'Data Science', 'Overview of data science field.', 3),
('DS201: Stats for DS', 'Data Science', 'Statistical methods in data science.', 4),
('DS301: Machine Learning', 'Data Science', 'Intro to machine learning techniques.', 4);

-- Department: Biology (Courses 10-12)
INSERT INTO Courses (title, department, description, credits) VALUES
('BIO101: General Biology', 'Biology', 'Fundamentals of life sciences.', 4),
('BIO201: Cell Biology', 'Biology', 'Structure and function of cells.', 3),
('BIO301: Genetics', 'Biology', 'Principles of heredity.', 4);

-- Department: Business (Courses 13-15)
INSERT INTO Courses (title, department, description, credits) VALUES
('BUS101: Intro to Business', 'Business', 'Overview of business operations.', 3),
('BUS201: Marketing Principles', 'Business', 'Core marketing concepts.', 3),
('BUS301: Financial Accounting', 'Business', 'Basics of financial reporting.', 4);

-- Department: Computer Science (Instructors 1-6)
INSERT INTO Instructors (first_name, last_name, department) VALUES
('Alice', 'Wonder', 'Computer Science'), ('Bob', 'Builder', 'Computer Science'),
('Charles', 'Xavier', 'Computer Science'), ('Diana', 'Prince', 'Computer Science'),
('Edward', 'Scissorhands', 'Computer Science'), ('Fiona', 'Gallagher', 'Computer Science');

-- Department: Engineering (Instructors 7-12)
INSERT INTO Instructors (first_name, last_name, department) VALUES
('George', 'Jetson', 'Engineering'), ('Helen', 'Troy', 'Engineering'),
('Isaac', 'Asimov', 'Engineering'), ('Jane', 'Goodall', 'Engineering'),
('Kyle', 'Broflovski', 'Engineering'), ('Lisa', 'Simpson', 'Engineering');

-- Department: Data Science (Instructors 13-18)
INSERT INTO Instructors (first_name, last_name, department) VALUES
('Michael', 'Scott', 'Data Science'), ('Nancy', 'Drew', 'Data Science'),
('Oscar', 'Wilde', 'Data Science'), ('Peter', 'Pan', 'Data Science'),
('Quinn', 'Fabray', 'Data Science'), ('Rachel', 'Green', 'Data Science');

-- Department: Biology (Instructors 19-24)
INSERT INTO Instructors (first_name, last_name, department) VALUES
('Samuel', 'Jackson', 'Biology'), ('Tara', 'Maclay', 'Biology'),
('Ulysses', 'Grant', 'Biology'), ('Victor', 'Frankenstein', 'Biology'),
('Willow', 'Rosenberg', 'Biology'), ('Xena', 'Warrior', 'Biology');

-- Department: Business (Instructors 25-30)
INSERT INTO Instructors (first_name, last_name, department) VALUES
('Yoda', 'Master', 'Business'), ('Zelda', 'Fitzgerald', 'Business'),
('Arnold', 'Schwarzenegger', 'Business'), ('Betty', 'Boop', 'Business'),
('Clark', 'Kent', 'Business'), ('Dexter', 'Morgan', 'Business');


-- Course 1 (CS101), Dept CS. Instructors: 1 (Alice Wonder), 2 (Bob Builder)
-- Students 1-10 with Instructor 1; Students 11-20 with Instructor 2
INSERT IGNORE INTO Enrollment (student_id, course_id, semester, grade, instructor_id) VALUES
(1, 1, 'Fall 2023', 'A', 1), (2, 1, 'Spring 2024', 'B', 1), (3, 1, 'Fall 2024', 'C', 1), (4, 1, 'Spring 2025', 'D', 1), (5, 1, 'Fall 2023', 'F', 1),
(6, 1, 'Spring 2024', 'A', 1), (7, 1, 'Fall 2024', 'B', 1), (8, 1, 'Spring 2025', 'C', 1), (9, 1, 'Fall 2023', 'D', 1), (10, 1, 'Spring 2024', 'F', 1),
(11, 1, 'Fall 2024', 'A', 2), (12, 1, 'Spring 2025', 'B', 2), (13, 1, 'Fall 2023', 'C', 2), (14, 1, 'Spring 2024', 'D', 2), (15, 1, 'Fall 2024', 'F', 2),
(16, 1, 'Spring 2025', 'A', 2), (17, 1, 'Fall 2023', 'B', 2), (18, 1, 'Spring 2024', 'C', 2), (19, 1, 'Fall 2024', 'D', 2), (20, 1, 'Spring 2025', 'F', 2);

-- Course 2 (CS201), Dept CS. Instructors: 3 (Charles Xavier), 4 (Diana Prince)
-- Students 21-30 with Instructor 3; Students 31-40 with Instructor 4
INSERT IGNORE INTO Enrollment (student_id, course_id, semester, grade, instructor_id) VALUES
(21, 2, 'Fall 2023', 'A', 3), (22, 2, 'Spring 2024', 'B', 3), (23, 2, 'Fall 2024', 'C', 3), (24, 2, 'Spring 2025', 'D', 3), (25, 2, 'Fall 2023', 'F', 3),
(26, 2, 'Spring 2024', 'A', 3), (27, 2, 'Fall 2024', 'B', 3), (28, 2, 'Spring 2025', 'C', 3), (29, 2, 'Fall 2023', 'D', 3), (30, 2, 'Spring 2024', 'F', 3),
(31, 2, 'Fall 2024', 'A', 4), (32, 2, 'Spring 2025', 'B', 4), (33, 2, 'Fall 2023', 'C', 4), (34, 2, 'Spring 2024', 'D', 4), (35, 2, 'Fall 2024', 'F', 4),
(36, 2, 'Spring 2025', 'A', 4), (37, 2, 'Fall 2023', 'B', 4), (38, 2, 'Spring 2024', 'C', 4), (39, 2, 'Fall 2024', 'D', 4), (40, 2, 'Spring 2025', 'F', 4);

-- Course 3 (CS301), Dept CS. Instructors: 5 (Edward Scissorhands), 6 (Fiona Gallagher)
-- Students 41-50 with Instructor 5; Students 51-60 with Instructor 6
INSERT IGNORE INTO Enrollment (student_id, course_id, semester, grade, instructor_id) VALUES
(41, 3, 'Fall 2023', 'A', 5), (42, 3, 'Spring 2024', 'B', 5), (43, 3, 'Fall 2024', 'C', 5), (44, 3, 'Spring 2025', 'D', 5), (45, 3, 'Fall 2023', 'F', 5),
(46, 3, 'Spring 2024', 'A', 5), (47, 3, 'Fall 2024', 'B', 5), (48, 3, 'Spring 2025', 'C', 5), (49, 3, 'Fall 2023', 'D', 5), (50, 3, 'Spring 2024', 'F', 5),
(51, 3, 'Fall 2024', 'A', 6), (52, 3, 'Spring 2025', 'B', 6), (53, 3, 'Fall 2023', 'C', 6), (54, 3, 'Spring 2024', 'D', 6), (55, 3, 'Fall 2024', 'F', 6),
(56, 3, 'Spring 2025', 'A', 6), (57, 3, 'Fall 2023', 'B', 6), (58, 3, 'Spring 2024', 'C', 6), (59, 3, 'Fall 2024', 'D', 6), (60, 3, 'Spring 2025', 'F', 6);

-- Course 4 (ENGR101), Dept Engineering. Instructors: 7 (George Jetson), 8 (Helen Troy)
-- Students 61-70 with Instructor 7; Students 71-80 with Instructor 8
INSERT IGNORE INTO Enrollment (student_id, course_id, semester, grade, instructor_id) VALUES
(61, 4, 'Fall 2023', 'A', 7), (62, 4, 'Spring 2024', 'B', 7), (63, 4, 'Fall 2024', 'C', 7), (64, 4, 'Spring 2025', 'D', 7), (65, 4, 'Fall 2023', 'F', 7),
(66, 4, 'Spring 2024', 'A', 7), (67, 4, 'Fall 2024', 'B', 7), (68, 4, 'Spring 2025', 'C', 7), (69, 4, 'Fall 2023', 'D', 7), (70, 4, 'Spring 2024', 'F', 7),
(71, 4, 'Fall 2024', 'A', 8), (72, 4, 'Spring 2025', 'B', 8), (73, 4, 'Fall 2023', 'C', 8), (74, 4, 'Spring 2024', 'D', 8), (75, 4, 'Fall 2024', 'F', 8),
(76, 4, 'Spring 2025', 'A', 8), (77, 4, 'Fall 2023', 'B', 8), (78, 4, 'Spring 2024', 'C', 8), (79, 4, 'Fall 2024', 'D', 8), (80, 4, 'Spring 2025', 'F', 8);

-- Course 5 (ENGR201), Dept Engineering. Instructors: 9 (Isaac Asimov), 10 (Jane Goodall)
-- Students 81-90 with Instructor 9; Students 91-100 with Instructor 10
INSERT IGNORE INTO Enrollment (student_id, course_id, semester, grade, instructor_id) VALUES
(81, 5, 'Fall 2023', 'A', 9), (82, 5, 'Spring 2024', 'B', 9), (83, 5, 'Fall 2024', 'C', 9), (84, 5, 'Spring 2025', 'D', 9), (85, 5, 'Fall 2023', 'F', 9),
(86, 5, 'Spring 2024', 'A', 9), (87, 5, 'Fall 2024', 'B', 9), (88, 5, 'Spring 2025', 'C', 9), (89, 5, 'Fall 2023', 'D', 9), (90, 5, 'Spring 2024', 'F', 9),
(91, 5, 'Fall 2024', 'A', 10), (92, 5, 'Spring 2025', 'B', 10), (93, 5, 'Fall 2023', 'C', 10), (94, 5, 'Spring 2024', 'D', 10), (95, 5, 'Fall 2024', 'F', 10),
(96, 5, 'Spring 2025', 'A', 10), (97, 5, 'Fall 2023', 'B', 10), (98, 5, 'Spring 2024', 'C', 10), (99, 5, 'Fall 2024', 'D', 10), (100, 5, 'Spring 2025', 'F', 10);

-- Course 6 (ENGR301), Dept Engineering. Instructors: 11 (Kyle Broflovski), 12 (Lisa Simpson)
-- Students 1-10 with Instructor 11; Students 11-20 with Instructor 12 (Student IDs cycle)
INSERT IGNORE INTO Enrollment (student_id, course_id, semester, grade, instructor_id) VALUES
(1, 6, 'Spring 2024', 'A', 11), (2, 6, 'Fall 2024', 'B', 11), (3, 6, 'Spring 2025', 'C', 11), (4, 6, 'Fall 2023', 'D', 11), (5, 6, 'Spring 2024', 'F', 11),
(6, 6, 'Fall 2024', 'A', 11), (7, 6, 'Spring 2025', 'B', 11), (8, 6, 'Fall 2023', 'C', 11), (9, 6, 'Spring 2024', 'D', 11), (10, 6, 'Fall 2024', 'F', 11),
(11, 6, 'Spring 2025', 'A', 12), (12, 6, 'Fall 2023', 'B', 12), (13, 6, 'Spring 2024', 'C', 12), (14, 6, 'Fall 2024', 'D', 12), (15, 6, 'Spring 2025', 'F', 12),
(16, 6, 'Fall 2023', 'A', 12), (17, 6, 'Spring 2024', 'B', 12), (18, 6, 'Fall 2024', 'C', 12), (19, 6, 'Spring 2025', 'D', 12), (20, 6, 'Fall 2023', 'F', 12);

-- Course 7 (DS101), Dept Data Science. Instructors: 13 (Michael Scott), 14 (Nancy Drew)
-- Students 21-30 with Instructor 13; Students 31-40 with Instructor 14
INSERT IGNORE INTO Enrollment (student_id, course_id, semester, grade, instructor_id) VALUES
(21, 7, 'Spring 2024', 'A', 13), (22, 7, 'Fall 2024', 'B', 13), (23, 7, 'Spring 2025', 'C', 13), (24, 7, 'Fall 2023', 'D', 13), (25, 7, 'Spring 2024', 'F', 13),
(26, 7, 'Fall 2024', 'A', 13), (27, 7, 'Spring 2025', 'B', 13), (28, 7, 'Fall 2023', 'C', 13), (29, 7, 'Spring 2024', 'D', 13), (30, 7, 'Fall 2024', 'F', 13),
(31, 7, 'Spring 2025', 'A', 14), (32, 7, 'Fall 2023', 'B', 14), (33, 7, 'Spring 2024', 'C', 14), (34, 7, 'Fall 2024', 'D', 14), (35, 7, 'Spring 2025', 'F', 14),
(36, 7, 'Fall 2023', 'A', 14), (37, 7, 'Spring 2024', 'B', 14), (38, 7, 'Fall 2024', 'C', 14), (39, 7, 'Spring 2025', 'D', 14), (40, 7, 'Fall 2023', 'F', 14);

-- Course 8 (DS201), Dept Data Science. Instructors: 15 (Oscar Wilde), 16 (Peter Pan)
-- Students 41-50 with Instructor 15; Students 51-60 with Instructor 16
INSERT IGNORE INTO Enrollment (student_id, course_id, semester, grade, instructor_id) VALUES
(41, 8, 'Spring 2024', 'A', 15), (42, 8, 'Fall 2024', 'B', 15), (43, 8, 'Spring 2025', 'C', 15), (44, 8, 'Fall 2023', 'D', 15), (45, 8, 'Spring 2024', 'F', 15),
(46, 8, 'Fall 2024', 'A', 15), (47, 8, 'Spring 2025', 'B', 15), (48, 8, 'Fall 2023', 'C', 15), (49, 8, 'Spring 2024', 'D', 15), (50, 8, 'Fall 2024', 'F', 15),
(51, 8, 'Spring 2025', 'A', 16), (52, 8, 'Fall 2023', 'B', 16), (53, 8, 'Spring 2024', 'C', 16), (54, 8, 'Fall 2024', 'D', 16), (55, 8, 'Spring 2025', 'F', 16),
(56, 8, 'Fall 2023', 'A', 16), (57, 8, 'Spring 2024', 'B', 16), (58, 8, 'Fall 2024', 'C', 16), (59, 8, 'Spring 2025', 'D', 16), (60, 8, 'Fall 2023', 'F', 16);

-- Course 9 (DS301), Dept Data Science. Instructors: 17 (Quinn Fabray), 18 (Rachel Green)
-- Students 61-70 with Instructor 17; Students 71-80 with Instructor 18
INSERT IGNORE INTO Enrollment (student_id, course_id, semester, grade, instructor_id) VALUES
(61, 9, 'Spring 2024', 'A', 17), (62, 9, 'Fall 2024', 'B', 17), (63, 9, 'Spring 2025', 'C', 17), (64, 9, 'Fall 2023', 'D', 17), (65, 9, 'Spring 2024', 'F', 17),
(66, 9, 'Fall 2024', 'A', 17), (67, 9, 'Spring 2025', 'B', 17), (68, 9, 'Fall 2023', 'C', 17), (69, 9, 'Spring 2024', 'D', 17), (70, 9, 'Fall 2024', 'F', 17),
(71, 9, 'Spring 2025', 'A', 18), (72, 9, 'Fall 2023', 'B', 18), (73, 9, 'Spring 2024', 'C', 18), (74, 9, 'Fall 2024', 'D', 18), (75, 9, 'Spring 2025', 'F', 18),
(76, 9, 'Fall 2023', 'A', 18), (77, 9, 'Spring 2024', 'B', 18), (78, 9, 'Fall 2024', 'C', 18), (79, 9, 'Spring 2025', 'D', 18), (80, 9, 'Fall 2023', 'F', 18);

-- Course 10 (BIO101), Dept Biology. Instructors: 19 (Samuel Jackson), 20 (Tara Maclay)
-- Students 81-90 with Instructor 19; Students 91-100 with Instructor 20
INSERT IGNORE INTO Enrollment (student_id, course_id, semester, grade, instructor_id) VALUES
(81, 10, 'Spring 2024', 'A', 19), (82, 10, 'Fall 2024', 'B', 19), (83, 10, 'Spring 2025', 'C', 19), (84, 10, 'Fall 2023', 'D', 19), (85, 10, 'Spring 2024', 'F', 19),
(86, 10, 'Fall 2024', 'A', 19), (87, 10, 'Spring 2025', 'B', 19), (88, 10, 'Fall 2023', 'C', 19), (89, 10, 'Spring 2024', 'D', 19), (90, 10, 'Fall 2024', 'F', 19),
(91, 10, 'Spring 2025', 'A', 20), (92, 10, 'Fall 2023', 'B', 20), (93, 10, 'Spring 2024', 'C', 20), (94, 10, 'Fall 2024', 'D', 20), (95, 10, 'Spring 2025', 'F', 20),
(96, 10, 'Fall 2023', 'A', 20), (97, 10, 'Spring 2024', 'B', 20), (98, 10, 'Fall 2024', 'C', 20), (99, 10, 'Spring 2025', 'D', 20), (100, 10, 'Fall 2023', 'F', 20);

-- Course 11 (BIO201), Dept Biology. Instructors: 21 (Ulysses Grant), 22 (Victor Frankenstein)
-- Students 1-10 with Instructor 21; Students 11-20 with Instructor 22
INSERT IGNORE INTO Enrollment (student_id, course_id, semester, grade, instructor_id) VALUES
(1, 11, 'Fall 2024', 'A', 21), (2, 11, 'Spring 2025', 'B', 21), (3, 11, 'Fall 2023', 'C', 21), (4, 11, 'Spring 2024', 'D', 21), (5, 11, 'Fall 2024', 'F', 21),
(6, 11, 'Spring 2025', 'A', 21), (7, 11, 'Fall 2023', 'B', 21), (8, 11, 'Spring 2024', 'C', 21), (9, 11, 'Fall 2024', 'D', 21), (10, 11, 'Spring 2025', 'F', 21),
(11, 11, 'Fall 2023', 'A', 22), (12, 11, 'Spring 2024', 'B', 22), (13, 11, 'Fall 2024', 'C', 22), (14, 11, 'Spring 2025', 'D', 22), (15, 11, 'Fall 2023', 'F', 22),
(16, 11, 'Spring 2024', 'A', 22), (17, 11, 'Fall 2024', 'B', 22), (18, 11, 'Spring 2025', 'C', 22), (19, 11, 'Fall 2023', 'D', 22), (20, 11, 'Spring 2024', 'F', 22);

-- Course 12 (BIO301), Dept Biology. Instructors: 23 (Willow Rosenberg), 24 (Xena Warrior)
-- Students 21-30 with Instructor 23; Students 31-40 with Instructor 24
INSERT IGNORE INTO Enrollment (student_id, course_id, semester, grade, instructor_id) VALUES
(21, 12, 'Fall 2024', 'A', 23), (22, 12, 'Spring 2025', 'B', 23), (23, 12, 'Fall 2023', 'C', 23), (24, 12, 'Spring 2024', 'D', 23), (25, 12, 'Fall 2024', 'F', 23),
(26, 12, 'Spring 2025', 'A', 23), (27, 12, 'Fall 2023', 'B', 23), (28, 12, 'Spring 2024', 'C', 23), (29, 12, 'Fall 2024', 'D', 23), (30, 12, 'Spring 2025', 'F', 23),
(31, 12, 'Fall 2023', 'A', 24), (32, 12, 'Spring 2024', 'B', 24), (33, 12, 'Fall 2024', 'C', 24), (34, 12, 'Spring 2025', 'D', 24), (35, 12, 'Fall 2023', 'F', 24),
(36, 12, 'Spring 2024', 'A', 24), (37, 12, 'Fall 2024', 'B', 24), (38, 12, 'Spring 2025', 'C', 24), (39, 12, 'Fall 2023', 'D', 24), (40, 12, 'Spring 2024', 'F', 24);

-- Course 13 (BUS101), Dept Business. Instructors: 25 (Yoda Master), 26 (Zelda Fitzgerald)
-- Students 41-50 with Instructor 25; Students 51-60 with Instructor 26
INSERT IGNORE INTO Enrollment (student_id, course_id, semester, grade, instructor_id) VALUES
(41, 13, 'Fall 2024', 'A', 25), (42, 13, 'Spring 2025', 'B', 25), (43, 13, 'Fall 2023', 'C', 25), (44, 13, 'Spring 2024', 'D', 25), (45, 13, 'Fall 2024', 'F', 25),
(46, 13, 'Spring 2025', 'A', 25), (47, 13, 'Fall 2023', 'B', 25), (48, 13, 'Spring 2024', 'C', 25), (49, 13, 'Fall 2024', 'D', 25), (50, 13, 'Spring 2025', 'F', 25),
(51, 13, 'Fall 2023', 'A', 26), (52, 13, 'Spring 2024', 'B', 26), (53, 13, 'Fall 2024', 'C', 26), (54, 13, 'Spring 2025', 'D', 26), (55, 13, 'Fall 2023', 'F', 26),
(56, 13, 'Spring 2024', 'A', 26), (57, 13, 'Fall 2024', 'B', 26), (58, 13, 'Spring 2025', 'C', 26), (59, 13, 'Fall 2023', 'D', 26), (60, 13, 'Spring 2024', 'F', 26);

-- Course 14 (BUS201), Dept Business. Instructors: 27 (Arnold Schwarzenegger), 28 (Betty Boop)
-- Students 61-70 with Instructor 27; Students 71-80 with Instructor 28
INSERT IGNORE INTO Enrollment (student_id, course_id, semester, grade, instructor_id) VALUES
(61, 14, 'Fall 2024', 'A', 27), (62, 14, 'Spring 2025', 'B', 27), (63, 14, 'Fall 2023', 'C', 27), (64, 14, 'Spring 2024', 'D', 27), (65, 14, 'Fall 2024', 'F', 27),
(66, 14, 'Spring 2025', 'A', 27), (67, 14, 'Fall 2023', 'B', 27), (68, 14, 'Spring 2024', 'C', 27), (69, 14, 'Fall 2024', 'D', 27), (70, 14, 'Spring 2025', 'F', 27),
(71, 14, 'Fall 2023', 'A', 28), (72, 14, 'Spring 2024', 'B', 28), (73, 14, 'Fall 2024', 'C', 28), (74, 14, 'Spring 2025', 'D', 28), (75, 14, 'Fall 2023', 'F', 28),
(76, 14, 'Spring 2024', 'A', 28), (77, 14, 'Fall 2024', 'B', 28), (78, 14, 'Spring 2025', 'C', 28), (79, 14, 'Fall 2023', 'D', 28), (80, 14, 'Spring 2024', 'F', 28);

-- Course 15 (BUS301), Dept Business. Instructors: 29 (Clark Kent), 30 (Dexter Morgan)
-- Students 81-90 with Instructor 29; Students 91-100 with Instructor 30
INSERT IGNORE INTO Enrollment (student_id, course_id, semester, grade, instructor_id) VALUES
(81, 15, 'Fall 2024', 'A', 29), (82, 15, 'Spring 2025', 'B', 29), (83, 15, 'Fall 2023', 'C', 29), (84, 15, 'Spring 2024', 'D', 29), (85, 15, 'Fall 2024', 'F', 29),
(86, 15, 'Spring 2025', 'A', 29), (87, 15, 'Fall 2023', 'B', 29), (88, 15, 'Spring 2024', 'C', 29), (89, 15, 'Fall 2024', 'D', 29), (90, 15, 'Spring 2025', 'F', 29),
(91, 15, 'Fall 2023', 'A', 30), (92, 15, 'Spring 2024', 'B', 30), (93, 15, 'Fall 2024', 'C', 30), (94, 15, 'Spring 2025', 'D', 30), (95, 15, 'Fall 2023', 'F', 30),
(96, 15, 'Spring 2024', 'A', 30), (97, 15, 'Fall 2024', 'B', 30), (98, 15, 'Spring 2025', 'C', 30), (99, 15, 'Fall 2023', 'D', 30), (100, 15, 'Spring 2024', 'F', 30);

