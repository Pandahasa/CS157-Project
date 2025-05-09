import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import CourseDepartmentComboBox from "@/components/createdUI/courseUI/courseDepartmentCombobox"
import { toast } from 'sonner';

export default function CourseDialog({selectedRow, setSelectedRow, refreshTable, setRefreshTable}) {
  //This doesn't preset values as selectedRow is defaulted null.
  // State will be updated by useEffect when selectedRow changes.
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [courseId, setCourseId] = useState(""); // Changed from courseID
  const [credits, setCredits] = useState(""); // Will be string from input, parse before sending
  const [description, setDescription] = useState("");


  //Submit changes to database
  const submitCourseChanges = async () => { // Made async
    const courseData = {title, department, courseId, credits, description}; // Use courseId
    console.log("Submitting course changes:", courseData);

      //Checks if valid input or do not continue.
      if(!title || !department || !credits || !description){
          toast.custom(() => (
              <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                  Please fill in all valid inputs for course.
              </div>
          ),{ duration: 2000,});
          // Do not close dialog on validation error
          return;
      }

    const creditsAsNumber = parseInt(credits, 10);
    if (isNaN(creditsAsNumber) || creditsAsNumber <= 0) {
        toast.custom(() => (
            <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                Credits must be a valid positive number.
            </div>
        ),{ duration: 2000,});
        return;
    }

    if (!courseId) {
        toast.custom(() => (
            <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                Error: Course ID is missing. Cannot update.
            </div>
        ),{ duration: 2000,});
        return;
    }

    //INPUT SQL LOGIC HERE. (PUT Request)
    try {
        const response = await fetch(`http://localhost:8080/api/courses/${courseId}`, { // Use courseId
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, department, credits: creditsAsNumber, description })
        });

        if (response.ok) {
            toast.custom(() => (
                <div className="bg-green-500 text-white p-5 rounded shadow-lg">
                    ✅ Course edited successfully!
                </div>
            ),{ duration: 2000,});
            //Gets out of selectedRow.
            setSelectedRow(null);
            //Forces a refresh of the newly changes database.
            setRefreshTable(!refreshTable);
        } else {
            const errorData = await response.text();
            toast.custom(() => (
                <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                    ❌ Error editing course: {response.status} {errorData}
                </div>
            ),{ duration: 2000,});
        }
    } catch (error) {
        toast.custom(() => (
            <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                ❌ Network error: {error.message}
            </div>
        ),{ duration: 2000,});
    }
  }

  //Delete Course from database (Based on their ID).
  const deleteCourse = async () => { // Made async
    //Delete Course
    console.log("Attempting to delete course with ID:", courseId); // Use courseId

    if (!courseId) {
        toast.custom(() => (
            <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                Error: Course ID is missing. Cannot delete.
            </div>
        ),{ duration: 2000,});
        return;
    }

    //INPUT SQL LOGIC HERE. (DELETE Request)
    try {
        const response = await fetch(`http://localhost:8080/api/courses/${courseId}`, { // Use courseId
            method: "DELETE"
        });

        if (response.ok) {
            toast.custom(() => (
              <div className="bg-green-700 text-white p-5 rounded shadow-lg">
                  ✅ Course deleted!
              </div>
            ),{ duration: 2000,});
            //Gets out of selectedRow.
            setSelectedRow(null);
            //Forces a refresh of the newly changes database.
            setRefreshTable(!refreshTable);
        } else {
            const errorData = await response.text();
            toast.custom(() => (
                <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                    ❌ Error deleting course: {response.status} {errorData}
                </div>
            ),{ duration: 2000,});
        }
    } catch (error) {
        toast.custom(() => (
            <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                ❌ Network error: {error.message}
            </div>
        ),{ duration: 2000,});
    }
  }

  //Set useState variables when selectedRow changes or dialog closes.
  useEffect(()=>{
    //If there's no selectedRow, clear the fields.
    if(!selectedRow) {
        setTitle("");
        setDepartment("");
        setCredits("");
        setDescription("");
        setCourseId("");
        return;
    }
    // Assumes selectedRow.original contains courseId (camelCase)
    setTitle(selectedRow.original.title || "");
    setDepartment(selectedRow.original.department || "");
    setCredits(selectedRow.original.credits?.toString() || ""); // Ensure credits is string for input
    setDescription(selectedRow.original.description || "");
    setCourseId(selectedRow.original.courseId || ""); // Changed from courseID
  }, [selectedRow])

  return (
    <>
    {/*Popup code, once row is clicked on, pops up an input to pass and change information.*/}
    {/*Information is accessible through row.original attribute. */}
    <Dialog open={Boolean(selectedRow)} onOpenChange={() => setSelectedRow(null)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Course Info</DialogTitle>
                <DialogDescription>
                    Detailed information about course <strong>{selectedRow?.original.title}</strong>.
                </DialogDescription>
            </DialogHeader>

            {/*For all the information regarding the course. Here is where you change the information.*/}
            <form className="space-y-2">

              {/*CourseID can't be changed.*/}
              <div className="grid w-full  items-center gap-1.5">
                  <Label htmlFor="courseIdDisplay">CourseID</Label> {/* Changed htmlFor for consistency */}
                  <Input className = "text-black" disabled id="courseIdDisplay" value={courseId} /> {/* Use value */}
              </div>

              {/*Title of Course*/}
              <div className="grid w-full  items-center gap-1.5">
                  <Label htmlFor="title">Course Title</Label>
                  <Input className = "text-black" id="title" autoFocus={false} value={title} onChange = {(e) => setTitle(e.target.value)}/> {/* Use value */}
              </div>

              {/*Department of Course.*/}
              <div className="grid w-full  items-center gap-1.5">
                  <Label htmlFor="department">Department</Label>
                  <CourseDepartmentComboBox id="department" originalDepartment={department} setDepartment={setDepartment}></CourseDepartmentComboBox>
              </div>

              {/*Credits of Course.*/}
              <div className="grid w-full  items-center gap-1.5">
                  <Label htmlFor="credits">Credits</Label>
                  <Input className = "text-black" type="number" id="credits" value={credits} onChange = {(e) => setCredits(e.target.value)}/> {/* Use value */}
              </div>

             {/*Description of Course.*/}
              <div className="grid w-full  items-center gap-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea className = "max-h-50 text-black" id="description" placeholder="Type your message here."
                    value={description} onChange = {(e) => setDescription(e.target.value)}/> {/* Use value */}
              </div>

            </form>
            {/* Buttons remain in the same position as per original structure */}
            <div className="flex justify-end space-x-2 pt-4"> {/* Added a div for button layout consistency */}
                <Button onClick = {submitCourseChanges}>Submit</Button>
                <Button variant="destructive" className = "bg-red-500 hover:bg-red-400" onClick = {deleteCourse}>Delete</Button>
            </div>
            
        </DialogContent>
    </Dialog>
    </>
  )
}
