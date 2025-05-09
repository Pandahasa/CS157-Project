"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

// Options for Semester and Grade
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
  { value: "In Progress", label: "In Progress" },
  { value: "N/A", label: "N/A" },
];

export default function EnrollmentDialogue({ selectedRow, setSelectedRow, refreshTable, setRefreshTable }) {
  // State for form fields
  const [enrollmentId, setEnrollmentId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [semester, setSemester] = useState("");
  const [grade, setGrade] = useState("");

  // State for ComboBox data
  const [studentsList, setStudentsList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [instructorsList, setInstructorsList] = useState([]);

  // State for Popover visibility
  const [openStudentPopover, setOpenStudentPopover] = useState(false);
  const [openCoursePopover, setOpenCoursePopover] = useState(false);
  const [openInstructorPopover, setOpenInstructorPopover] = useState(false);
  const [openSemesterPopover, setOpenSemesterPopover] = useState(false);
  const [openGradePopover, setOpenGradePopover] = useState(false);

  // Fetch data for ComboBoxes
  useEffect(() => {
    async function fetchData() {
      try {
        const [studentsRes, coursesRes, instructorsRes] = await Promise.all([
          fetch("http://localhost:8080/api/students"),
          fetch("http://localhost:8080/api/courses"),
          fetch("http://localhost:8080/api/instructors"),
        ]);

        if (!studentsRes.ok) throw new Error(`Failed to fetch students: ${studentsRes.statusText}`);
        const studentsData = await studentsRes.json();
        setStudentsList(studentsData.map(s => ({ value: s.studentId.toString(), label: `${s.studentId} - ${s.firstName} ${s.lastName}` })));

        if (!coursesRes.ok) throw new Error(`Failed to fetch courses: ${coursesRes.statusText}`);
        const coursesData = await coursesRes.json();
        setCoursesList(coursesData.map(c => ({ value: c.courseId.toString(), label: `${c.courseId} - ${c.title || 'Unnamed Course'}` })));

        if (!instructorsRes.ok) throw new Error(`Failed to fetch instructors: ${instructorsRes.statusText}`);
        const instructorsData = await instructorsRes.json();
        setInstructorsList(instructorsData.map(i => ({ value: i.instructorId.toString(), label: `${i.instructorId} - ${i.firstName} ${i.lastName}` })));
      } catch (error) {
        console.error("Error fetching data for enrollment dialogue:", error);
        toast.error(`Error fetching supporting data: ${error.message}`);
      }
    }
    fetchData();
  }, []);

  // Populate form when selectedRow changes
  useEffect(() => {
    if (selectedRow?.original) {
      // Ensure enrollmentID is correctly accessed and converted to string
      setEnrollmentId(selectedRow.original.enrollmentId?.toString() || "");
      setStudentId(selectedRow.original.studentId?.toString() || "");
      setCourseId(selectedRow.original.courseId?.toString() || "");
      setInstructorId(selectedRow.original.instructorId?.toString() || "");
      setSemester(selectedRow.original.semester || "");
      setGrade(selectedRow.original.grade || "");
    } else {
      // Reset form when dialog is closed or no row is selected
      setEnrollmentId("");
      setStudentId("");
      setCourseId("");
      setInstructorId("");
      setSemester("");
      setGrade("");
    }
  }, [selectedRow]);

  // Handle enrollment update
  const handleUpdateEnrollment = async () => {
    if (!enrollmentId || !studentId || !courseId || !instructorId || !semester || !grade) {
      toast.error("Please ensure all fields are selected.");
      return;
    }

    const updatedEnrollment = {
      studentId: parseInt(studentId),
      courseId: parseInt(courseId),
      instructorId: parseInt(instructorId),
      semester,
      grade,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/enrollments/${enrollmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEnrollment),
      });

      if (response.ok) {
        toast.success("✅ Enrollment updated successfully!");
        setSelectedRow(null); // Close dialog
        setRefreshTable(prev => !prev); // Refresh table
      } else {
        const errorData = await response.text();
        toast.error(`❌ Error updating enrollment: ${response.status} ${errorData}`);
      }
    } catch (error) {
      toast.error(`❌ Network error: ${error.message}`);
    }
  };

  // Handle enrollment deletion
  const handleDeleteEnrollment = async () => {
    // This check is crucial. If enrollmentId is empty, the toast appears.
    // This means selectedRow.original.enrollmentID was likely missing or empty for the selected row.
    if (!enrollmentId) {
      toast.error("Enrollment ID not found for deletion. Please ensure the selected row has an Enrollment ID.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/enrollments/${enrollmentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("✅ Enrollment deleted successfully!");
        setSelectedRow(null); // Close dialog
        setRefreshTable(prev => !prev); // Refresh table
      } else {
        const errorData = await response.text();
        toast.error(`❌ Error deleting enrollment: ${response.status} ${errorData}`);
      }
    } catch (error) {
      toast.error(`❌ Network error: ${error.message}`);
    }
  };
  
  // Helper function to create a ComboBox
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
    <Dialog open={Boolean(selectedRow)} onOpenChange={() => setSelectedRow(null)}>
      <DialogContent className="sm:max-w-lg"> 
        <DialogHeader>
          <DialogTitle>Edit Enrollment Information</DialogTitle>
          <DialogDescription>
            Modify the details for this enrollment. Enrollment ID cannot be changed.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* EnrollmentID (disabled for display, used for operations) */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="enrollmentIdDisplay" className="text-right">Enrollment ID</Label>
            <Input id="enrollmentIdDisplay" value={enrollmentId} disabled className="col-span-3" />
          </div>

          {createComboBox("studentId", "Student", studentId, setStudentId, openStudentPopover, setOpenStudentPopover, studentsList)}
          {createComboBox("courseId", "Course", courseId, setCourseId, openCoursePopover, setOpenCoursePopover, coursesList)}
          {createComboBox("instructorId", "Instructor", instructorId, setInstructorId, openInstructorPopover, setOpenInstructorPopover, instructorsList)}
          {createComboBox("semester", "Semester", semester, setSemester, openSemesterPopover, setOpenSemesterPopover, semesterOptions)}
          {createComboBox("grade", "Grade", grade, setGrade, openGradePopover, setOpenGradePopover, gradeOptions)}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="destructive" onClick={handleDeleteEnrollment}>Delete Enrollment</Button>
          <div className="flex gap-2">
            <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleUpdateEnrollment}>Save Changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}