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
import { useState, useEffect } from "react"
import StudentComboBox from "@/components/createdUI/studentMajorComboBox.jsx"

export default function StudentDialog({selectedRow, setSelectedRow, refreshTable, setRefreshTable}) {
  //This doesn't preset and values as selectedRow is defaulted null.
  const [firstName, setFirstName] = useState(selectedRow?.original.firstName);
  const [lastName, setLastName] = useState(selectedRow?.original.lastName);
  const [studentID, setStudentID] = useState(selectedRow?.original.studentID);
  const [major, setMajor] = useState(selectedRow?.original.major);



  const submitStudentChanges = () => {
    const randomVar = {firstName, lastName, studentID, major}
    console.log(randomVar);
    //Gets out of selectedRow.
    setSelectedRow(null);
    setRefreshTable(!refreshTable);
  }

  useEffect(()=>{
    //If there's no selectedRow, don't do anything.
    if(!selectedRow) return;
    setFirstName(selectedRow?.original.firstName);
    setLastName(selectedRow?.original.lastName); 
    setStudentID(selectedRow?.original.studentID); 
    setMajor(selectedRow?.original.major); 
  }, [selectedRow])

  return (
    <>
    {/*Popup code, once row is clicked on, pops up an input to pass and change information.*/}
    {/*Information is accessible through row.original attribute. */}
    <Dialog open={selectedRow} onOpenChange={() => setSelectedRow(null)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Student Info</DialogTitle>
                <DialogDescription>
                    Detailed information for student <strong>{firstName + " " + lastName}</strong>.
                </DialogDescription>
            </DialogHeader>

            {/*For all the information regarding the student. Here is where you change the information.*/}
            <form className="space-y-2">

              {/*StudentID can't be changed.*/}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="studentID">StudentID</Label>
                  <Input className = "text-black" disabled id="studentID" defaultValue={studentID} />
              </div>

              {/*First Name of Student*/}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input className = "text-black" id="firstName" autoFocus={false} defaultValue={firstName} onChange = {(e) => setFirstName(e.target.value)}/>
              </div>

              {/*Last Name of Student.*/}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input className = "text-black" id="lastName" defaultValue={lastName} onChange = {(e) => setLastName(e.target.value)}/>
              </div>

              {/*Major of Student.*/}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="major">Major</Label>
                  <StudentComboBox id="major" originalMajor={major} setMajor={setMajor}></StudentComboBox>
              </div>

            </form>
            <Button onClick = {submitStudentChanges}>Submit</Button>
            
        </DialogContent>
    </Dialog>
    
    
    </>
  )
}
