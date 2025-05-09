"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from 'sonner';

const semesterOptions = [
  { value: "Fall", label: "Fall" },
  { value: "Spring", label: "Spring" },
  { value: "Summer", label: "Summer" },
  { value: "Winter", label: "Winter" },
];

const gradeOptions = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "F", label: "F" },
  { value: "IP", label: "In Progress" },
];

export default function AddEnrollmentDialogue({ refreshTable, setRefreshTable }) {
  const [courseId, setCourseId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [semester, setSemester] = useState("");
  const [grade, setGrade] = useState("");

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const [openCoursePopover, setOpenCoursePopover] = useState(false);
  const [openStudentPopover, setOpenStudentPopover] = useState(false);
  const [openInstructorPopover, setOpenInstructorPopover] = useState(false);
  const [openSemesterPopover, setOpenSemesterPopover] = useState(false);
  const [openGradePopover, setOpenGradePopover] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesRes, studentsRes, instructorsRes] = await Promise.all([
          fetch("http://localhost:8080/api/courses"),
          fetch("http://localhost:8080/api/students"),
          fetch("http://localhost:8080/api/instructors"),
        ]);

        if (!coursesRes.ok) throw new Error(`Failed to fetch courses: ${coursesRes.statusText} (${coursesRes.status})`);
        const coursesData = await coursesRes.json();
        setCourses(coursesData.map(course => ({ value: course.courseId.toString(), label: `${course.courseId} - ${course.title}` })));

        if (!studentsRes.ok) throw new Error(`Failed to fetch students: ${studentsRes.statusText} (${studentsRes.status})`);
        const studentsData = await studentsRes.json();
        setStudents(studentsData.map(student => ({ value: student.studentId.toString(), label: `${student.studentId} - ${student.firstName} ${student.lastName}` })));
        
        if (!instructorsRes.ok) throw new Error(`Failed to fetch instructors: ${instructorsRes.statusText} (${instructorsRes.status})`);
        const instructorsData = await instructorsRes.json();
        setInstructors(instructorsData.map(instructor => ({ value: instructor.instructorId.toString(), label: `${instructor.instructorId} - ${instructor.firstName} ${instructor.lastName}` })));

      } catch (error) {
        console.error("Error fetching data for enrollment dialogue:", error);
        toast.error(`Error fetching data: ${error.message}`);
        setCourses([]);
        setStudents([]);
        setInstructors([]);
      }
    }
    fetchData();
  }, []);

  const resetForm = () => {
    setCourseId("");
    setStudentId("");
    setInstructorId("");
    setSemester("");
    setGrade("");
    setOpenCoursePopover(false);
    setOpenStudentPopover(false);
    setOpenInstructorPopover(false);
    setOpenSemesterPopover(false);
    setOpenGradePopover(false);
  };

  const submitAddEnrollment = async () => {
    if (!courseId || !studentId || !instructorId || !semester || !grade) {
      toast.error("Please fill in all fields for the enrollment.");
      return false; 
    }

    const enrollmentData = { 
        courseId: parseInt(courseId), 
        studentId: parseInt(studentId), 
        instructorId: parseInt(instructorId), 
        semester, 
        grade 
    };
    console.log("Adding enrollment:", enrollmentData);

    try {
      const response = await fetch("http://localhost:8080/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enrollmentData),
      });

      if (response.ok) {
        toast.success("✅ Enrollment added successfully!");
        resetForm();
        if (setRefreshTable && typeof setRefreshTable === 'function') {
            setRefreshTable(prev => !prev);
        }
        return true; 
      } else {
        const errorData = await response.text();
        toast.error(`❌ Error adding enrollment: ${response.status} ${errorData}`);
        return false; 
      }
    } catch (error) {
      toast.error(`❌ Network error: ${error.message}`);
      return false; 
    }
  };

  const createComboBox = (id, label, value, setValue, openPopover, setOpenPopover, options, placeholderPrefix = "Select") => (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">{label}</Label>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger asChild className="col-span-3">
          <Button variant="outline" role="combobox" aria-expanded={openPopover} className="w-full justify-between">
            {value ? options.find(opt => opt.value === value)?.label : `${placeholderPrefix} ${label.toLowerCase()}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={`${id}-${option.value}`}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpenPopover(false);
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <Dialog onOpenChange={(isOpen) => { if (!isOpen) resetForm(); }}>
      <DialogTrigger asChild>
        {/* Consistent button styling with other "Add" dialogs */}
        <Button className="bg-blue-300 hover:bg-blue-200 text-black" variant="outline">Add Enrollment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Add New Enrollment</DialogTitle>
          <DialogDescription>
            Select all required details for the new enrollment.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {createComboBox("courseId", "Course", courseId, setCourseId, openCoursePopover, setOpenCoursePopover, courses)}
          {createComboBox("studentId", "Student", studentId, setStudentId, openStudentPopover, setOpenStudentPopover, students)}
          {createComboBox("instructorId", "Instructor", instructorId, setInstructorId, openInstructorPopover, setOpenInstructorPopover, instructors)}
          {createComboBox("semester", "Semester", semester, setSemester, openSemesterPopover, setOpenSemesterPopover, semesterOptions)}
          {createComboBox("grade", "Grade", grade, setGrade, openGradePopover, setOpenGradePopover, gradeOptions)}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
             {/* Submit button uses default primary styling */}
             <Button onClick={async () => {
                // submitAddEnrollment handles toast, reset, and refresh
                await submitAddEnrollment();
             }}>Submit Enrollment</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}