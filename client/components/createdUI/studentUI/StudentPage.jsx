"use client";
import React from "react"
import StudentTable from "@/components/createdUI/studentUI/studentTable.jsx"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import AddStudentDialogue from "@/components/createdUI/studentUI/addStudentDialogue"

//These are the columns that will be made according to the database.
const columns = [
  {
    accessorKey: "studentID",
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
]


const tempstudents = [
  { studentID: 101001, firstName: "Alice", lastName: "A", major: "Computer Science" },
  { studentID: 303230, firstName: "Bob", lastName: "B", major: "Biology" },
  { studentID: 201230, firstName: "Charlie", lastName: "C", major: "Pre-Med" },
  { studentID: 201430, firstName: "Jeff", lastName: "J", major: "Business" },
]

export default function PageWrap(){

    //Variable that holds all the students.
    const [allStudents, setAllStudents] = useState(tempstudents);

    //Table data of the students currently in database.
    const [students, setStudents] = useState(allStudents);

    //Input query for studentID
    const [inputStudentID, setInputStudentID] = useState("");

    //The debounced studentID search bar value
    const [debouncedInputStudentID, setDebouncedInputStudentID] = useState("");

    //This means the database has been updated and we need to refresh table.
    const [refreshTable, setRefreshTable] = useState(false);

    useEffect(() => {

        async function fetchStudents() {
            const res = await fetch("/api/students"); // Your API route or Spring Boot backend
            const data = await res.json();
            setAllStudents(data);
        }

    fetchStudents(); 
    }, [refreshTable]);

    //Filters the student array based off the search query given.
    useEffect(() => {

        //Will have to have an api call here.


        let filteredStudents = allStudents.filter(student =>{

            //If nothing is inputted, return all the students.
            if(inputStudentID == "") return true;

            //Searches student based on the query (studentID).
            if(student.studentID.toString().startsWith(debouncedInputStudentID.toLowerCase())) return true;
        })

        setStudents(filteredStudents);
    }, [debouncedInputStudentID]);


    //Debounced search studentID, this makes searching less laggy since less updates.
    useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedInputStudentID(inputStudentID);
    }, 500);
    return () => clearTimeout(timeout);
  }, [inputStudentID]);


    return(<>
        <div>
            {/*Query for studentID. */}
            <Input placeholder = "Enter studentID:" onChange = {(e) => setInputStudentID(e.target.value)}></Input>
            <StudentTable data = {students} columns = {columns} refreshTable = {refreshTable} setRefreshTable = {setRefreshTable}></StudentTable>
            <AddStudentDialogue refreshTable={refreshTable} setRefreshTable={setRefreshTable}></AddStudentDialogue>
        </div>
    </>);
}