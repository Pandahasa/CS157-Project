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
import InstructorDepartmentComboBox from "@/components/createdUI/instructorUI/instructorDepartmentComboBox"
import { toast } from 'sonner';

export default function InstructorDialogue({selectedRow, setSelectedRow, refreshTable, setRefreshTable}) {
  //This doesn't preset values as selectedRow is defaulted null.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [department, setDepartment] = useState("");


  //Submit changes to database
  const submitInstructorChanges = async () => {
    const instructorData = {firstName, lastName, instructorId, department};
    console.log("Submitting instructor changes:", instructorData);

      //Checks if valid input or do not continue.
      if(!firstName || !lastName || !department){
          toast.custom(() => (
              <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                  Please fill in all valid inputs for instructor.
              </div>
          ),{ duration: 2000,});
          // Do not close dialog on validation error, allow user to correct.

          //Exit out and not create into sql database.
          return;
      }
    if (!instructorId) {
        toast.custom(() => (
            <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                Error: Instructor ID is missing. Cannot update.
            </div>
        ),{ duration: 2000});
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/instructors/${instructorId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, department }) // Send only updatable fields
        });

        if (response.ok) {
            toast.custom(() => (
                <div className="bg-green-500 text-white p-5 rounded shadow-lg">
                    ✅ Instructor edited successfully!
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
                    ❌ Error editing instructor: {response.status} {errorData}
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

  //Delete instructor from database (Based on their ID).
  const deleteInstructor = async () => {
    //Delete instructor
    console.log("Attempting to delete instructor with ID:", instructorId);

    if (!instructorId) {
        toast.custom(() => (
            <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                Error: Instructor ID is missing. Cannot delete.
            </div>
        ),{ duration: 2000});
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/instructors/${instructorId}`, {
            method: "DELETE"
        });

        if (response.ok) {
            toast.custom(() => (
                <div className="bg-green-700 text-white p-5 rounded shadow-lg">
                    ✅ Deleted Instructor!
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
                    ❌ Error deleting instructor: {response.status} {errorData}
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
        setInstructorId("");
        setDepartment("");
        return;
    }
    // Assumes selectedRow.original contains instructorId (camelCase)
    setFirstName(selectedRow.original.firstName || "");
    setLastName(selectedRow.original.lastName || "");
    setInstructorId(selectedRow.original.instructorId || "");
    setDepartment(selectedRow.original.department || "");
  }, [selectedRow])

  return (
    <>
    {/*Popup code, once row is clicked on, pops up an input to pass and change information.*/}
    {/*Information is accessible through row.original attribute. */}
    <Dialog open={Boolean(selectedRow)} onOpenChange={() => setSelectedRow(null)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Instructor Info</DialogTitle>
                <DialogDescription>
                    Detailed information for instructor <strong>{selectedRow?.original.firstName + " " + selectedRow?.original.lastName}</strong>.
                </DialogDescription>
            </DialogHeader>

            {/*For all the information regarding the instructor. Here is where you change the information.*/}
            <form className="space-y-2">

              {/*InstructorID can't be changed.*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="instructorIdDisplay">InstructorID</Label>
                  <Input className = "text-black" disabled id="instructorIdDisplay" value={instructorId} />
              </div>

              {/*First Name of Instructor*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input className = "text-black" id="firstName" autoFocus={false} value={firstName} onChange = {(e) => setFirstName(e.target.value)}/>
              </div>

              {/*Last Name of Instructor.*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input className = "text-black" id="lastName" value={lastName} onChange = {(e) => setLastName(e.target.value)}/>
              </div>

              {/*Department of Instructor.*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="department">Department</Label>
                  <InstructorDepartmentComboBox id="department" originalDepartment={department} setDepartment={setDepartment}></InstructorDepartmentComboBox>
              </div>

            </form>
            {/* Buttons remain in the same position as per original structure */}
            <DialogFooter className="sm:justify-start pt-4">
                 <Button onClick = {submitInstructorChanges}>Submit</Button>
                 <Button variant="destructive" className = "bg-red-500 hover:bg-red-400" onClick = {deleteInstructor}>Delete</Button>
            </DialogFooter>
            
        </DialogContent>
    </Dialog>
    </>
  )
}