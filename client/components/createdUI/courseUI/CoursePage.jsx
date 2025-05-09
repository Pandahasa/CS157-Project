"use client";
import React from "react"
import CourseTable from "@/components/createdUI/courseUI/courseTable.jsx"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import AddCourseDialog from "@/components/createdUI/courseUI/addCourseDialog"

//These are the columns that will be made according to the database.
const columns = [
  {
    accessorKey: "courseID",
    header: "CourseID",
    cell: (info) => info.getValue(),
  },  
  {
    accessorKey: "title",
    header: "Course Title",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "credits",
    header: "Course Credits",
    cell: (info) => <span className="text-blue-500">{info.getValue()}</span>,
  },
  {
    accessorKey: "description",
    header: "Course Description",
    cell: (info) => <span className="text-blue-500">{info.getValue()}</span>,
  },
]


const tempCourses = [
  { courseID: 101001, title: "CS146", department: "Computer Science", credits: 2, description: "random mumbo,random mumbo,random mumbo,random mumbo,random mumbo,random mumbo,random mumbo,random mumbo,random mumbo,random mumbo,random mumbo,random mumbo,random mumbo,random mumbo,random mumbo," },
  { courseID: 303230, title: "CS149", department: "Computer Science", credits: 4, description: "random mumbo" },
  { courseID: 201230, title: "CS157", department: "Engineering", credits: 2, description: "random mumbo" },
  { courseID: 201430, title: "CMPE130", department: "Computer Science", credits: 3, description: "random mumbo" },
]

export default function CoursePage(){

    //Variable that holds all the courses.
    const [allCourses, setAllCourses] = useState(tempCourses);

    //Table data of the courses currently in database.
    const [courses, setCourses] = useState(allCourses);

    //Input query for courseID
    const [inputCourseID, setInputCourseID] = useState("");

    //The debounced courseID search bar value
    const [debouncedInputCourseID, setDebouncedInputCourseID] = useState("");

    //This means the database has been updated and we need to refresh table.
    const [refreshTable, setRefreshTable] = useState(false);

    useEffect(() => {

        async function fetchCourses() {
            const res = await fetch("/api/courses"); // Your API route or Spring Boot backend
            const data = await res.json();
            setAllCourses(data);
        }

    fetchCourses(); 
    }, [refreshTable]);

    //Filters the course array based off the search query given.
    useEffect(() => {

        //Will have to have an api call here.


        let filteredCourses = allCourses.filter(course =>{

            //If nothing is inputted, return all the courses.
            if(inputCourseID == "") return true;

            //Searches course based on the query (courseID).
            if(course.courseID.toString().startsWith(debouncedInputCourseID.toLowerCase())) return true;
        })

        setCourses(filteredCourses);
    }, [debouncedInputCourseID]);


    //Debounced search courseID, this makes searching less laggy since less updates.
    useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedInputCourseID(inputCourseID);
    }, 500);
    return () => clearTimeout(timeout);
  }, [inputCourseID]);

    



    return(<>
        <div>
            {/*Query for courseID. */}
            <Input placeholder = "Enter courseID:" onChange = {(e) => setInputCourseID(e.target.value)}></Input>
            <CourseTable data = {courses} columns = {columns} refreshTable = {refreshTable} setRefreshTable = {setRefreshTable}></CourseTable>
            <AddCourseDialog refreshTable = {refreshTable} setRefreshTable={setRefreshTable}></AddCourseDialog>
        </div>
    </>);
}