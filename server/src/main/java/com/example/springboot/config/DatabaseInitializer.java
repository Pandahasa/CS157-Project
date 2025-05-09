package com.example.springboot.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseInitializer.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        logger.info("Attempting to initialize database tables using JDBC");

        // SQL to create the Students table
        String createStudentsTableSQL = """
            CREATE TABLE IF NOT EXISTS Students (
                student_id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                major VARCHAR(100) NOT NULL
            );
        """;

        // SQL to create the Courses table
        String createCoursesTableSQL = """
            CREATE TABLE IF NOT EXISTS Courses (
                course_id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                department VARCHAR(100) NOT NULL,
                description TEXT NOT NULL,
                credits INT NOT NULL
            );
        """;

        // SQL to create the Instructors table
        String createInstructorsTableSQL = """
            CREATE TABLE IF NOT EXISTS Instructors (
                instructor_id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                department VARCHAR(100) NOT NULL
            );
        """;

        // SQL to create the Enrollment table
        // Doesn't violate BCNF because instructor assignment is per enrollment
        // and not dependent on the course or student.
        String createEnrollmentTableSQL = """
            CREATE TABLE IF NOT EXISTS Enrollment (
                enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
                student_id INT NOT NULL,
                course_id INT NOT NULL,
                semester VARCHAR(50) NOT NULL,
                grade VARCHAR(5) NOT NULL,
                instructor_id INT NOT NULL,
                FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE,
                FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE,
                FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id) ON DELETE CASCADE,
                UNIQUE KEY unique_enrollment (student_id, course_id, semester)
            );
        """;


        try {
            logger.info("Creating Students table...");
            jdbcTemplate.execute(createStudentsTableSQL);
            logger.info("Students table created or already exists.");

            logger.info("Creating Courses table...");
            jdbcTemplate.execute(createCoursesTableSQL);
            logger.info("Courses table created or already exists.");

            logger.info("Creating Instructors table...");
            jdbcTemplate.execute(createInstructorsTableSQL);
            logger.info("Instructors table created or already exists.");

            logger.info("Creating Enrollment table...");
            jdbcTemplate.execute(createEnrollmentTableSQL);
            logger.info("Enrollment table created or already exists.");


            logger.info("Database table initialization complete.");
        } catch (Exception e) {
            logger.error("Error during database table initialization: ", e);
        }
    }
}