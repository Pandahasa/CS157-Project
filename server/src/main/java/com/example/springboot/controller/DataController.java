package com.example.springboot.controller;

import com.example.springboot.model.Course;
import com.example.springboot.model.Enrollment;
import com.example.springboot.model.Instructor;
import com.example.springboot.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class DataController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // STUDENTS SECTION

    //Add a new student
    @PostMapping("/students")
    public ResponseEntity<String> addStudent(@RequestBody Student student) {
        try {
            String sql = "INSERT INTO Students (first_name, last_name, major) VALUES (?, ?, ?)";
            jdbcTemplate.update(sql, student.getFirstName(), student.getLastName(), student.getMajor());
            return ResponseEntity.status(HttpStatus.CREATED).body("Student added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error adding student: " + e.getMessage());
        }
    }

    //Get all students
    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents() {
        try {
            String sql = "SELECT * FROM Students";
            List<Student> students = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Student.class));
            return ResponseEntity.ok(students);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.emptyList());
        }
    }

    //Get a student by ID
    @GetMapping("/students/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable int id) {
        try {
            String sql = "SELECT * FROM Students WHERE student_id = ?";
            List<Student> students = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Student.class), id);
            if (students.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(students.get(0));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //Update a student by ID
    @PutMapping("/students/{id}")
    public ResponseEntity<String> updateStudent(@PathVariable int id, @RequestBody Student student) {
        try {
            String sql = "UPDATE Students SET first_name = ?, last_name = ?, major = ? WHERE student_id = ?";
            int rowsAffected = jdbcTemplate.update(sql,
                student.getFirstName(),
                student.getLastName(),
                student.getMajor(),
                id);

            if (rowsAffected == 0) {
                // Student not found
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
            }

            return ResponseEntity.ok("Student updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error updating student: " + e.getMessage());
        }
    }

    //Delete a student by ID
    @DeleteMapping("/students/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int id) {
        try {
            String sql = "DELETE FROM Students WHERE student_id = ?";
            int rowsAffected = jdbcTemplate.update(sql, id);

            if (rowsAffected == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
            }
            return ResponseEntity.ok("Student deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error deleting student: " + e.getMessage());
        }
    }


    // COURSES SECTION


    //Add a new course
    @PostMapping("/courses")
    public ResponseEntity<String> addCourse(@RequestBody Course course) {
        try {
            String sql = "INSERT INTO Courses (title, department, description, credits) VALUES (?, ?, ?, ?)";
            jdbcTemplate.update(sql,
                course.getTitle(),
                course.getDepartment(),
                course.getDescription(),
                course.getCredits());
            return ResponseEntity.status(HttpStatus.CREATED).body("Course added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error adding course: " + e.getMessage());
        }
    }

    //Get all courses
    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses() {
        try {
            String sql = "SELECT * FROM Courses";
            List<Course> courses = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Course.class));
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.emptyList());
        }
    }

    //Get a course by ID
    @GetMapping("/courses/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable int id) {
        try {
            String sql = "SELECT * FROM Courses WHERE course_id = ?";
            List<Course> courses = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Course.class), id);
            if (courses.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(courses.get(0));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //Update a course by ID
    @PutMapping("/courses/{id}")
    public ResponseEntity<String> updateCourse(@PathVariable int id, @RequestBody Course course) {
        try {
            String sql = "UPDATE Courses SET title = ?, department = ?, description = ?, credits = ? WHERE course_id = ?";
            int rowsAffected = jdbcTemplate.update(sql,
                course.getTitle(),
                course.getDepartment(),
                course.getDescription(),
                course.getCredits(),
                id);

            if (rowsAffected == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
            }

            return ResponseEntity.ok("Course updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error updating course: " + e.getMessage());
        }
    }

    //Delete a course by ID
    @DeleteMapping("/courses/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable int id) {
        try {
            String sql = "DELETE FROM Courses WHERE course_id = ?";
            int rowsAffected = jdbcTemplate.update(sql, id);

            if (rowsAffected == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
            }
            return ResponseEntity.ok("Course deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error deleting course: " + e.getMessage());
        }
    }


    // INSTRUCTORS SECTION


    //Add a new instructor
    @PostMapping("/instructors")
    public ResponseEntity<String> addInstructor(@RequestBody Instructor instructor) {
        try {
            String sql = "INSERT INTO Instructors (first_name, last_name, department) VALUES (?, ?, ?)";
            jdbcTemplate.update(sql,
                instructor.getFirstName(),
                instructor.getLastName(),
                instructor.getDepartment());
            return ResponseEntity.status(HttpStatus.CREATED).body("Instructor added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error adding instructor: " + e.getMessage());
        }
    }

    //Get all instructors
    @GetMapping("/instructors")
    public ResponseEntity<List<Instructor>> getAllInstructors() {
        try {
            String sql = "SELECT * FROM Instructors";
            List<Instructor> instructors = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Instructor.class));
            return ResponseEntity.ok(instructors);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.emptyList());
        }
    }

    //Get an instructor by ID
    @GetMapping("/instructors/{id}")
    public ResponseEntity<Instructor> getInstructorById(@PathVariable int id) {
        try {
            String sql = "SELECT * FROM Instructors WHERE instructor_id = ?";
            List<Instructor> instructors = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Instructor.class), id);
            if (instructors.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(instructors.get(0));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //Update an instructor by ID
    @PutMapping("/instructors/{id}")
    public ResponseEntity<String> updateInstructor(@PathVariable int id, @RequestBody Instructor instructor) {
        try {
            String sql = "UPDATE Instructors SET first_name = ?, last_name = ?, department = ? WHERE instructor_id = ?";
            int rowsAffected = jdbcTemplate.update(sql,
                instructor.getFirstName(),
                instructor.getLastName(),
                instructor.getDepartment(),
                id);

            if (rowsAffected == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Instructor not found");
            }

            return ResponseEntity.ok("Instructor updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error updating instructor: " + e.getMessage());
        }
    }

    //Delete an instructor by ID
    @DeleteMapping("/instructors/{id}")
    public ResponseEntity<String> deleteInstructor(@PathVariable int id) {
        try {
            String sql = "DELETE FROM Instructors WHERE instructor_id = ?";
            int rowsAffected = jdbcTemplate.update(sql, id);

            if (rowsAffected == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Instructor not found");
            }
            return ResponseEntity.ok("Instructor deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error deleting instructor: " + e.getMessage());
        }
    }


    //  ENROLLMENTS SECTION

    //Add a new enrollment
    @PostMapping("/enrollments")
    public ResponseEntity<String> addEnrollment(@RequestBody Enrollment enrollment) {
        try {
            if (enrollment.getInstructorId() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error adding enrollment: instructor_id is required.");
            }
            String sql = "INSERT INTO Enrollment (student_id, course_id, semester, grade, instructor_id)"
                       + " VALUES (?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql,
                enrollment.getStudentId(),
                enrollment.getCourseId(),
                enrollment.getSemester(),
                enrollment.getGrade(),
                enrollment.getInstructorId());
            return ResponseEntity.status(HttpStatus.CREATED).body("Enrollment added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error adding enrollment: " + e.getMessage());
        }
    }

    //Get all enrollments
    @GetMapping("/enrollments")
    public ResponseEntity<List<Enrollment>> getAllEnrollments() {
        try {
            String sql = "SELECT * FROM Enrollment";
            List<Enrollment> enrollments = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Enrollment.class));
            return ResponseEntity.ok(enrollments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.emptyList());
        }
    }

    //Get an enrollment by ID
    @GetMapping("/enrollments/{id}")
    public ResponseEntity<Enrollment> getEnrollmentById(@PathVariable int id) {
        try {
            String sql = "SELECT * FROM Enrollment WHERE enrollment_id = ?";
            List<Enrollment> enrollments = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Enrollment.class), id);
            if (enrollments.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(enrollments.get(0));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //Update an enrollment by ID
    @PutMapping("/enrollments/{id}")
    public ResponseEntity<String> updateEnrollment(@PathVariable int id, @RequestBody Enrollment enrollment) {
        try {
            String sql = "UPDATE Enrollment SET student_id = ?, course_id = ?, semester = ?, grade = ?, instructor_id = ?"
                       + " WHERE enrollment_id = ?";
            int rowsAffected = jdbcTemplate.update(sql,
                enrollment.getStudentId(),
                enrollment.getCourseId(),
                enrollment.getSemester(),
                enrollment.getGrade(),
                enrollment.getInstructorId(),
                id);

            if (rowsAffected == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Enrollment not found");
            }
            return ResponseEntity.ok("Enrollment updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error updating enrollment: " + e.getMessage());
        }
    }

    //Delete an enrollment by ID
    @DeleteMapping("/enrollments/{id}")
    public ResponseEntity<String> deleteEnrollment(@PathVariable int id) {
        try {
            String sql = "DELETE FROM Enrollment WHERE enrollment_id = ?";
            int rowsAffected = jdbcTemplate.update(sql, id);

            if (rowsAffected == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Enrollment not found");
            }
            return ResponseEntity.ok("Enrollment deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error deleting enrollment: " + e.getMessage());
        }
    }
}