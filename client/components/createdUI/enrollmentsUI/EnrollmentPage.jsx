"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import AddEnrollmentDialogue from "@/components/createdUI/enrollmentsUI/addEnrollmentDialogue"; 
import EnrollmentTable from "./enrollmentTable";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner'; 

//These are the columns that will be made
const columns = [
  {
    accessorKey: "enrollmentId", 
    header: "EnrollmentID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "courseId", 
    header: "CourseID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "studentId",
    header: "StudentID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "instructorId", 
    header: "InstructorID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "semester", 
    header: "Semester",
    cell: (info) => <span className="text-blue-500">{info.getValue()}</span>,
  },
  {
    accessorKey: "grade", 
    header: "Grade",
    cell: (info) => info.getValue(),
  },
];

export default function EnrollmentPage() {
  //Variable that holds all the enrollments fetched from the backend.
  const [allEnrollments, setAllEnrollments] = useState([]);

  //Table data of the enrollments currently displayed
  const [enrollments, setEnrollments] = useState([]);

  //Input query for studentID
  const [inputStudentID, setInputStudentID] = useState("");
  //The debounced studentID search bar value
  const [debouncedInputStudentID, setDebouncedInputStudentID] = useState("");

  //Input query for courseID
  const [inputCourseID, setInputCourseID] = useState("");
  //The debounced courseID search bar value
  const [debouncedInputCourseID, setDebouncedInputCourseID] = useState("");

  //Input query for enrollmentID
  const [inputEnrollmentID, setInputEnrollmentID] = useState("");
  //The debounced enrollmentID search bar value
  const [debouncedInputEnrollmentID, setDebouncedInputEnrollmentID] = useState("");

  //This means the database has been updated and we need to refresh table.
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    async function fetchEnrollments() {
      try {
        const res = await fetch("http://localhost:8080/api/enrollments");
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Failed to fetch enrollments:", res.status, errorText);
          toast.error(`Failed to fetch enrollments: ${res.status} ${errorText}`);
          setAllEnrollments([]);
          setEnrollments([]);
          return;
        }
        const data = await res.json();
        setAllEnrollments(data);
        setEnrollments(data); 
      } catch (error) {
        console.error("Network error fetching enrollments:", error);
        toast.error("Network error fetching enrollments.");
        setAllEnrollments([]);
        setEnrollments([]);
      }
    }

    fetchEnrollments();
  }, [refreshTable]);

  //Filters the enrollment array based off the search query given.
  useEffect(() => {
    let filteredData = allEnrollments;

    if (debouncedInputEnrollmentID) {
      filteredData = filteredData.filter((enrollment) =>
        enrollment.enrollmentID?.toString().toLowerCase().startsWith(debouncedInputEnrollmentID.toLowerCase())
      );
    }
    if (debouncedInputStudentID) {
      filteredData = filteredData.filter((enrollment) =>
        enrollment.studentID?.toString().toLowerCase().startsWith(debouncedInputStudentID.toLowerCase())
      );
    }
    if (debouncedInputCourseID) {
      filteredData = filteredData.filter((enrollment) =>
        enrollment.courseID?.toString().toLowerCase().startsWith(debouncedInputCourseID.toLowerCase())
      );
    }

    setEnrollments(filteredData);
  }, [debouncedInputStudentID, debouncedInputEnrollmentID, debouncedInputCourseID, allEnrollments]);

  //Debounced search inputs
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInputStudentID(inputStudentID);
      setDebouncedInputEnrollmentID(inputEnrollmentID);
      setDebouncedInputCourseID(inputCourseID);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [inputStudentID, inputCourseID, inputEnrollmentID]);

  return (
    <>
      <div className="container mx-auto py-6">
        {/*Query using the IDS. */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1 flex-grow min-w-[200px]">
            <Input
              placeholder="Filter by EnrollmentID..."
              value={inputEnrollmentID}
              onChange={(e) => setInputEnrollmentID(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={() => { setInputEnrollmentID(""); setDebouncedInputEnrollmentID(""); }} variant="outline">Clear</Button>
          </div>
          <div className="flex items-center gap-1 flex-grow min-w-[200px]">
            <Input
              placeholder="Filter by StudentID..."
              value={inputStudentID}
              onChange={(e) => setInputStudentID(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={() => { setInputStudentID(""); setDebouncedInputStudentID(""); }} variant="outline">Clear</Button>
          </div>
          <div className="flex items-center gap-1 flex-grow min-w-[200px]">
            <Input
              placeholder="Filter by CourseID..."
              value={inputCourseID}
              onChange={(e) => setInputCourseID(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={() => { setInputCourseID(""); setDebouncedInputCourseID(""); }} variant="outline">Clear</Button>
          </div>
        </div>
        <EnrollmentTable data={enrollments} columns={columns} refreshTable={refreshTable} setRefreshTable={setRefreshTable} />
        <div className="mt-4">
          <AddEnrollmentDialogue refreshTable={refreshTable} setRefreshTable={setRefreshTable} />
        </div>
      </div>
    </>
  );
}