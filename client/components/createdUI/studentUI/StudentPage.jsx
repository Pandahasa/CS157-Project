"use client";
import React from "react"
import StudentTable from "@/components/createdUI/studentUI/studentTable.jsx"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import AddStudentDialogue from "@/components/createdUI/studentUI/addStudentDialogue"
import { Button } from "@/components/ui/button"

//These are the columns that will be made according to the database.
const columns = [
  {
    accessorKey: "studentId",
    header: "StudentID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "major",
    header: "Major",
    cell: (info) => <span className="text-blue-500">{info.getValue()}</span>,
  },
];

export default function StudentPage(){

    //Variable that holds all the students fetched from the backend.
    const [allStudents, setAllStudents] = useState([]); 

    //Table data of the students currently displayed
    const [students, setStudents] = useState([]); 

    //Input query for studentID
    const [inputStudentDetails, setInputStudentDetails] = useState("");

    //The debounced studentID search bar value
    const [debouncedInputStudentDetails, setDebouncedInputStudentDetails] = useState("");

    //This means the database has been updated and we need to refresh table.
    const [refreshTable, setRefreshTable] = useState(false);

    // Fetch all students from the backend when the component mounts or refreshTable changes
    useEffect(() => {
        async function fetchStudents() {
            try {
                const res = await fetch("http://localhost:8080/api/students"); // Full backend URL
                if (!res.ok) {
                    // Handle HTTP errors like 404 or 500
                    console.error("Failed to fetch students:", res.status, await res.text());
                    setAllStudents([]); // Set to empty array on error
                    setStudents([]);
                    return;
                }
                const data = await res.json();
                setAllStudents(data);
                setStudents(data); // Initialize displayed students with all students
            } catch (error) {
                // Handle network errors
                console.error("Network error fetching students:", error);
                setAllStudents([]); // Set to empty array on error
                setStudents([]);
            }
        }

        fetchStudents();
    }, [refreshTable]); // Dependency array includes refreshTable

    //Filters the student array based off the search query given.
    useEffect(() => {

        let lowercasedFilter = debouncedInputStudentDetails.toLowerCase();
        let filteredStudents = allStudents.filter(student =>{
            //If nothing is inputted, return all the students.
            if(debouncedInputStudentDetails === "") return true;

            // Ensure student.studentID is not null or undefined before calling toString()
            return (
                    (student.studentId && student.studentId.toString().startsWith(lowercasedFilter)) ||
                    (student.firstName && student.firstName.toLowerCase().startsWith(lowercasedFilter)) ||
                    (student.lastName && student.lastName.toString().toLowerCase().startsWith(lowercasedFilter)) ||
                    (student.major && student.major.toLowerCase().startsWith(lowercasedFilter))
          
            ) 
            
        })
        setStudents(filteredStudents);
    }, [debouncedInputStudentDetails, allStudents]); // Also re-filter when allStudents changes


    //Debounced search studentID, this makes searching less laggy since less updates.
    useEffect(() => {
        const timeout = setTimeout(() => {
          setDebouncedInputStudentDetails(inputStudentDetails);
        }, 500);
        return () => clearTimeout(timeout);
    }, [inputStudentDetails]);


    return(<>
        <div className="container mx-auto py-6">
            {/*Query for student details. */}
            <div className="flex justify-between items-center mb-4">
              <div className = "flex items-center gap-2 w-full">
                <Input placeholder = "Enter StudentID, First Name, Last Name, or Major:" value = {inputStudentDetails} onChange = {(e) => setInputStudentDetails(e.target.value)}></Input>
                <Button  variant="outline" onClick = {() => {setInputStudentDetails(""); setDebouncedInputStudentDetails("");}}>Clear</Button>
              </div>
            </div>

            <StudentTable data = {students} columns = {columns} refreshTable = {refreshTable} setRefreshTable = {setRefreshTable}></StudentTable>
            <div className="mt-4">
              <AddStudentDialogue refreshTable={refreshTable} setRefreshTable={setRefreshTable}></AddStudentDialogue>
            </div>
        </div>
    </>);
}