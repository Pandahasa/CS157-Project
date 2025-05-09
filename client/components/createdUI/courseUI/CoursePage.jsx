"use client";
import React, { useState, useEffect } from "react";
import CourseTable from "@/components/createdUI/courseUI/courseTable.jsx";
import { Input } from "@/components/ui/input";
import AddCourseDialog from "@/components/createdUI/courseUI/addCourseDialog";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

// Columns for the CourseTable
const columns = [
  {
    accessorKey: "courseId",
    header: "CourseID",
  },
  {
    accessorKey: "title",
    header: "Course Title",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "credits",
    header: "Credits",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info) => (
      <div className="truncate w-60" title={info.getValue()}>
        {info.getValue()}
      </div>
    ),
  },
];

export default function CoursePage() {
  // Holds all courses fetched from the backend
  const [allCourses, setAllCourses] = useState([]);
  // Data for the courses currently displayed in the table
  const [courses, setCourses] = useState([]);
  // Input query for searching courses
  const [searchTerm, setSearchTerm] = useState("");
  // Debounced search term to reduce re-renders
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  // Triggers a table refresh when the database is updated
  const [refreshTable, setRefreshTable] = useState(false);
  // Holds the selected course for potential edit/delete operations
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch all courses from the backend
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("http://localhost:8080/api/courses");
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Failed to fetch courses:", res.status, errorText);
          toast.error(`Failed to fetch courses: ${res.status}`);
          setAllCourses([]);
          setCourses([]);
          return;
        }
        const data = await res.json();
        setAllCourses(data);
        setCourses(data);
      } catch (error) {
        console.error("Network error fetching courses:", error);
        toast.error("Network error fetching courses.");
        setAllCourses([]);
        setCourses([]);
      }
    }
    fetchCourses();
  }, [refreshTable]);

  // Debounce the search term input
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  // Filter courses based on the debounced search term
  useEffect(() => {
    const lowercasedFilter = debouncedSearchTerm.toLowerCase();
    const filteredData = allCourses.filter(course => {
      if (debouncedSearchTerm === "") return true;
      return (
        (course.title && course.title.toLowerCase().includes(lowercasedFilter)) ||
        (course.courseId && course.courseId.toString().toLowerCase().includes(lowercasedFilter)) ||
        (course.department && course.department.toLowerCase().includes(lowercasedFilter))
      );
    });
    setCourses(filteredData);
  }, [debouncedSearchTerm, allCourses]);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 w-full">
          <Input
            placeholder="Search by Title, ID, or Department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={() => setSearchTerm("")} variant="outline">Clear</Button>
        </div>
      </div>

      <CourseTable
        data={courses}
        columns={columns}
        setSelectedRow={setSelectedCourse} 
        refreshTable={refreshTable}
        setRefreshTable={setRefreshTable}
      />

      <div className="mt-4">
        <AddCourseDialog refreshTable={refreshTable} setRefreshTable={setRefreshTable} />
      </div>
    </div>
  );
}