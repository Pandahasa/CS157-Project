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
import StudentMajorComboBox from "@/components/createdUI/studentUI/studentMajorComboBox"
import { toast } from 'sonner';

export default function StudentDialogue({selectedRow, setSelectedRow, refreshTable, setRefreshTable}) {
  //This doesn't preset values as selectedRow is defaulted null.
  const [firstName, setFirstName] = useState(selectedRow?.original.firstName);
  const [lastName, setLastName] = useState(selectedRow?.original.lastName);
  const [studentID, setStudentID] = useState(selectedRow?.original.studentID);
  const [major, setMajor] = useState(selectedRow?.original.major);


  //Submit changes to database
  const submitStudentChanges = () => {
    const randomVar = {firstName, lastName, studentID, major}
    console.log(randomVar);


      //Checks if valid input or do not continue.
      if(!firstName || !lastName || !major){
          toast.custom(() => (
              <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                  Please fill in all valid inputs for student.
              </div>
          ),{ duration: 2000,});
          //Gets out of selectedRow.
          setSelectedRow(null);

          //Exit out and not create into sql database.
          return;
      }else{
          toast.custom(() => (
              <div className="bg-green-500 text-white p-5 rounded shadow-lg">
                  ✅ Student edited successfully!
              </div>
          ),{ duration: 2000,});
      }


    //INPUT SQL LOGIC HERE.



    //Gets out of selectedRow.
    setSelectedRow(null);
    //Forces a refresh of the newly changes database.
    setRefreshTable(!refreshTable);
  }

  //Delete student from database (Based on their ID).
  const deleteStudent = () => {
    //Delete student
    console.log("Deleted student.")

    //Delete Course
    console.log("Deleted Student.")
            toast.custom(() => (
              <div className="bg-green-700 text-white p-5 rounded shadow-lg">
                  ✅ Course Student!
              </div>
      ),{ duration: 2000,});

    //Gets out of selectedRow.
    setSelectedRow(null);
    //Forces a refresh of the newly changes database.
    setRefreshTable(!refreshTable);
  }

  //Set useState variables to back to original when leaving.
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
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="studentID">StudentID</Label>
                  <Input className = "text-black" disabled id="studentID" defaultValue={studentID} />
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
            <Button onClick = {submitStudentChanges}>Submit</Button>
            <Button className = "bg-red-500 hover:bg-red-400" onClick = {deleteStudent}>Delete</Button>
            
        </DialogContent>
    </Dialog>
    
    
    </>
  )
}
