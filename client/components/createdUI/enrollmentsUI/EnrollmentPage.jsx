"use client";
import React from "react"
import StudentTable from "@/components/createdUI/studentUI/studentTable.jsx"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import AddStudentDialogue from "@/components/createdUI/studentUI/addStudentDialogue"
import EnrollmentTable from "./enrollmentTable";
import { Button } from "@/components/ui/button"

//These are the columns that will be made according to the database.
const columns = [
  {
    accessorKey: "enrollmentID",
    header: "EnrollmentID",
    cell: (info) => info.getValue(),
  },  
  {
    accessorKey: "courseID",
    header: "CourseID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "studentID",
    header: "StudentID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "semester",
    header: "Semester",
    cell: (info) => <span className="text-blue-500">{info.getValue()}</span>,
  },
]


const tempEnrollments = [
  { studentID: 101001, instructorID: 102120, enrollmentID: 321312, courseID: 231321, grade: "B", semester: "Spring"},
  { studentID: 303230, instructorID: 101111, enrollmentID: 321122, courseID: 237311, grade: "C", semester: "Fall"},
  { studentID: 201230, instructorID: 101111, enrollmentID: 323312, courseID: 238321, grade: "D", semester: "Summer"},
  { studentID: 201430, instructorID: 101111, enrollmentID: 353127, courseID: 206221, grade: "A", semester: "Winter"},
]



export default function EnrollmentPage(){

    //Variable that holds all the enrollments.
    const [allEnrollments, setAllEnrollments] = useState(tempEnrollments);

    //Table data of the enrollments currently in database.
    const [enrollments, setEnrollments] = useState(allEnrollments);

    //Input query for studentID
    const [inputStudentID, setInputStudentID] = useState("");
    //The debounced studentID search bar value
    const [debouncedInputStudentID, setDebouncedInputStudentID] = useState("");

    //Input query for courseID
    const [inputCourseID, setInputCourseID] = useState("");
    //The debounced courseID search bar value
    const [debouncedinputCourseID, setDebouncedInputCourseID] = useState("");

    //Input query for enrollmentID
    const [inputEnrollmentID, setInputEnrollmentID] = useState("");
    //The debounced enrollmentID search bar value
    const [debouncedEnrollmentID, setDebouncedEnrollmentID] = useState("");


    //This means the database has been updated and we need to refresh table.
    const [refreshTable, setRefreshTable] = useState(false);

    useEffect(() => {

        async function fetchEnrollments() {
            const res = await fetch("/api/students"); // Your API route or Spring Boot backend
            const data = await res.json();
            setAllEnrollments(data);
        }

    fetchEnrollments(); 
    }, [refreshTable]);

    //Filters the enrollment array based off the search query given.
    useEffect(() => {

        //Will have to have an api call here.


        let filteredEnrollments = allEnrollments.filter(enrollment =>{

            //If nothing is inputted, return all the students.
            if(inputStudentID == "" && inputCourseID == "" && inputEnrollmentID == "") return true;

            //Searches student based on the query (studentID, courseID, enrollmentID).
            if(enrollment.studentID.toString().startsWith(debouncedInputStudentID.toLowerCase()) && 
                enrollment.enrollmentID.toString().startsWith(debouncedEnrollmentID.toLowerCase()) &&
                enrollment.courseID.toString().startsWith(debouncedinputCourseID.toLowerCase())) return true;
        })

        setEnrollments(filteredEnrollments);
    }, [debouncedInputStudentID, debouncedEnrollmentID, debouncedinputCourseID]);


    //Debounced search studentID, enrollmentID, courseID, this makes searching less laggy since less updates.
    useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedInputStudentID(inputStudentID);
      setDebouncedEnrollmentID(inputEnrollmentID);
      setDebouncedInputCourseID(inputCourseID);
    }, 500);
    return () => clearTimeout(timeout);
  }, [inputStudentID, inputCourseID, inputEnrollmentID]);


    return(<>
        <div>
            {/*Query using the IDS. */}
            <div className = "flex">
              <Input placeholder = "Enter EnrollmentID:" value = {inputEnrollmentID} onChange = {(e) => setInputEnrollmentID(e.target.value)}></Input>
              <Button onClick = {() => setInputEnrollmentID("")}>Clear</Button>
              <Input placeholder = "Enter StudentID:" value = {inputStudentID} onChange = {(e) => setInputStudentID(e.target.value)}></Input>
              <Button onClick = {() => setInputStudentID("")}>Clear</Button>
              <Input placeholder = "Enter CourseID:" value = {inputCourseID} onChange = {(e) => setInputCourseID(e.target.value)}></Input>
              <Button onClick = {() => setInputCourseID("")}>Clear</Button>
            </div>
            <EnrollmentTable data = {enrollments} columns = {columns} refreshTable = {refreshTable} setRefreshTable = {setRefreshTable}></EnrollmentTable>
            {/* <AddStudentDialogue refreshTable={refreshTable} setRefreshTable={setRefreshTable}></AddStudentDialogue> */}
        </div>
    </>);
}