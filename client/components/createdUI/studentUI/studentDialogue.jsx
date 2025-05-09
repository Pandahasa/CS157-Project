import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
DialogFooter, 
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import StudentMajorComboBox from "@/components/createdUI/studentUI/studentMajorComboBox"
import { toast } from 'sonner';

export default function StudentDialogue({selectedRow, setSelectedRow, refreshTable, setRefreshTable}) {
  //This doesn't preset values as selectedRow is defaulted null.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [major, setMajor] = useState("");


  //Submit changes to database
  const submitStudentChanges = async () => {
    const studentData = {firstName, lastName, studentId, major};
    console.log("Submitting student changes:", studentData);

      //Checks if valid input or do not continue.
      if(!firstName || !lastName || !major){
          toast.custom(() => (
              <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                  Please fill in all valid inputs for student.
              </div>
          ),{ duration: 2000,});
          // Do not close dialog on validation error, allow user to correct.

          //Exit out and not create into sql database.
          return;
      }

    if (!studentId) {
        toast.custom(() => (
            <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                Error: Student ID is missing. Cannot update.
            </div>
        ),{ duration: 2000});
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/students/${studentId}`, { // Use studentId in URL
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, major }) // Send only updatable fields
        });

        if (response.ok) {
            toast.custom(() => (
                <div className="bg-green-500 text-white p-5 rounded shadow-lg">
                    ✅ Student edited successfully!
                </div>
            ),{ duration: 2000});
            //Gets out of selectedRow.
            setSelectedRow(null);
            //Forces a refresh of the newly changes database.
            setRefreshTable(!refreshTable);
        } else {
            const errorData = await response.text();
            toast.custom(() => (
                <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                    ❌ Error editing student: {response.status} {errorData}
                </div>
            ),{ duration: 2000});
        }
    } catch (error) {
        toast.custom(() => (
            <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                ❌ Network error: {error.message}
            </div>
        ),{ duration: 2000});
    }
  }

  //Delete student from database (Based on their ID).
  const deleteStudent = async () => { // Added async
    //Delete student
    console.log("Attempting to delete student with ID:", studentId); // Use studentId

    if (!studentId) {
        toast.custom(() => (
            <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                Error: Student ID is missing. Cannot delete.
            </div>
        ),{ duration: 2000});
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/students/${studentId}`, { // Use studentId in URL
            method: "DELETE"
        });

        if (response.ok) {
            toast.custom(() => (
                <div className="bg-green-700 text-white p-5 rounded shadow-lg">
                    ✅ Deleted Student!
                </div>
            ),{ duration: 2000});
            //Gets out of selectedRow.
            setSelectedRow(null);
            //Forces a refresh of the newly changes database.
            setRefreshTable(!refreshTable);
        } else {
            const errorData = await response.text();
            toast.custom(() => (
                <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                    ❌ Error deleting student: {response.status} {errorData}
                </div>
            ),{ duration: 2000});
        }
    } catch (error) {
        toast.custom(() => (
            <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                ❌ Network error: {error.message}
            </div>
        ),{ duration: 2000});
    }
  }

  //Set useState variables to back to original when leaving.
  useEffect(()=>{
    //If there's no selectedRow, don't do anything.
    if(!selectedRow) {
        setFirstName("");
        setLastName("");
        setStudentId("");
        setMajor("");
        return;
    }
    // Assumes selectedRow.original contains studentId (camelCase)
    setFirstName(selectedRow.original.firstName || "");
    setLastName(selectedRow.original.lastName || "");
    setStudentId(selectedRow.original.studentId || "");
    setMajor(selectedRow.original.major || "");
  }, [selectedRow])

  return (
    <>
    {/*Popup code, once row is clicked on, pops up an input to pass and change information.*/}
    {/*Information is accessible through row.original attribute. */}
    <Dialog open={Boolean(selectedRow)} onOpenChange={() => setSelectedRow(null)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Student Info</DialogTitle>
                <DialogDescription>
                    Detailed information for student <strong>{selectedRow?.original.firstName + " " + selectedRow?.original.lastName}</strong>.
                </DialogDescription>
            </DialogHeader>

            {/*For all the information regarding the student. Here is where you change the information.*/}
            <form className="space-y-2">

              {/*StudentID can't be changed.*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="studentIdDisplay">StudentID</Label> {/* Changed htmlFor for clarity if id changes */}
                  <Input className = "text-black" disabled id="studentIdDisplay" defaultValue={studentId} /> {/* Use studentId state */}
              </div>

              {/*First Name of Student*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input className = "text-black" id="firstName" autoFocus={false} defaultValue={firstName} onChange = {(e) => setFirstName(e.target.value)}/>
              </div>

              {/*Last Name of Student.*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input className = "text-black" id="lastName" defaultValue={lastName} onChange = {(e) => setLastName(e.target.value)}/>
              </div>

              {/*Major of Student.*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="major">Major</Label>
                  <StudentMajorComboBox id="major" originalMajor={major} setMajor={setMajor}></StudentMajorComboBox>
              </div>

            </form>
            {/* Buttons remain in the same position as per original structure */}
            <Button onClick = {submitStudentChanges}>Submit</Button>
            <Button className = "bg-red-500 hover:bg-red-400" onClick = {deleteStudent}>Delete</Button>
            
        </DialogContent>
    </Dialog>
    </>
  )
}