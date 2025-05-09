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
import { toast } from 'sonner';

export default function EnrollmentDialogue({selectedRow, setSelectedRow, refreshTable, setRefreshTable}) {
  //This doesn't preset values as selectedRow is defaulted null.
  const [enrollmentID, setEnrollmentID] = useState(selectedRow?.original.enrollmentID);
  const [studentID, setStudentID] = useState(selectedRow?.original.studentID);
  const [courseID, setCourseID] = useState(selectedRow?.original.courseID);
  const [semester, setSemester] = useState(selectedRow?.original.semester);

  //Submit changes to database
  const submitEnrollmentGradeChanges = () => {
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


  //Delete enrollment from database (Based on their ID).
  const deleteEnrollment = () => {

    //Delete Course
    console.log("Deleted enrollment.")
            toast.custom(() => (
              <div className="bg-green-700 text-white p-5 rounded shadow-lg">
                  ✅ Deleted Enrollment!
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
    setEnrollmentID(selectedRow?.original.enrollmentID);
    setSemester(selectedRow?.original.semester); 
    setStudentID(selectedRow?.original.studentID); 
    setCourseID(selectedRow?.original.courseID); 
  }, [selectedRow])

  return (
    <>
    {/*Popup code, once row is clicked on, pops up an input to pass and change information.*/}
    {/*Information is accessible through row.original attribute. */}
    <Dialog open={selectedRow} onOpenChange={() => setSelectedRow(null)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Enrollment Information</DialogTitle>
                <DialogDescription>
                    Information regarding this enrollment.
                </DialogDescription>
            </DialogHeader>

            {/*For all the information regarding the enrollment, can't be changed, only deleted.*/}
            <form className="space-y-2">

              {/*EnrollmentID*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="enrollmentID">EnrollmentID</Label>
                  <Input className = "text-black" disabled id="enrollmentID" defaultValue={enrollmentID} />
              </div>

              {/*StudentID*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="studentID">StudentID</Label>
                  <Input className = "text-black" disabled id="studentID" autoFocus={false} defaultValue={studentID}/>
              </div>

              {/*CourseID.*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="courseID">CourseID</Label>
                  <Input className = "text-black" disabled id="courseID" defaultValue={courseID}/>
              </div>

              {/*Semester.*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="semester">Semester</Label>
                  <Input className = "text-black" disabled id="semester" defaultValue={semester}/>
              </div>


            </form>

            <Button className = "bg-red-500 hover:bg-red-400" onClick = {deleteEnrollment}>Delete</Button>
            
        </DialogContent>
    </Dialog>
    
    
    </>
  )
}
