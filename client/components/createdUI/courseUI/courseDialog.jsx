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
  const [title, setTitle] = useState(selectedRow?.original.title);
  const [department, setDepartment] = useState(selectedRow?.original.department);
  const [courseID, setCourseID] = useState(selectedRow?.original.courseID);
  const [credits, setCredits] = useState(selectedRow?.original.credits);
  const [description, setDescription] = useState(selectedRow?.original.description);


  //Submit changes to database
  const submitCourseChanges = () => {
    const randomVar = {title, department, courseID, credits, description}
    console.log(randomVar);
    //Gets out of selectedRow.
    setSelectedRow(null);

      //Checks if valid input or do not continue.
      if(!title || !department || !credits || !description){
          toast.custom(() => (
              <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                  Please fill in all valid inputs for course.
              </div>
          ),{ duration: 2000,});

          //Gets out of selectedRow.
          setSelectedRow(null);

          //Exit out and not create into sql database.
          return;
      }else{
          toast.custom(() => (
              <div className="bg-green-500 text-white p-5 rounded shadow-lg">
                  ✅ Course edited successfully!
              </div>
          ),{ duration: 2000,});
      }


    //INPUT SQL LOGIC HERE.

    //Forces a refresh of the newly changes database.
    setRefreshTable(!refreshTable);
  }

  //Delete Course from database (Based on their ID).
  const deleteCourse = () => {
    //Delete Course
    console.log("Deleted Course.")
            toast.custom(() => (
              <div className="bg-green-700 text-white p-5 rounded shadow-lg">
                  ✅ Course deleted!
              </div>
      ),{ duration: 2000,});

    //Gets out of selectedRow.
    setSelectedRow(null);


      //INPUT SQL LOGIC HERE.

    //Forces a refresh of the newly changes database.
    setRefreshTable(!refreshTable);
  }

  useEffect(()=>{
    //If there's no selectedRow, don't do anything.
    if(!selectedRow) return;
    setTitle(selectedRow?.original.title);
    setDepartment(selectedRow?.original.department); 
    setCredits(selectedRow?.original.credits); 
    setDescription(selectedRow?.original.description); 
    setCourseID(selectedRow?.original.courseID);
  }, [selectedRow])

  return (
    <>
    {/*Popup code, once row is clicked on, pops up an input to pass and change information.*/}
    {/*Information is accessible through row.original attribute. */}
    <Dialog open={selectedRow} onOpenChange={() => setSelectedRow(null)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Course Info</DialogTitle>
                <DialogDescription>
                    Detailed information about course <strong>{title}</strong>.
                </DialogDescription>
            </DialogHeader>

            {/*For all the information regarding the course. Here is where you change the information.*/}
            <form className="space-y-2">

              {/*CourseID can't be changed.*/}
              <div className="grid w-full  items-center gap-1.5">
                  <Label htmlFor="courseID">CourseID</Label>
                  <Input className = "text-black" disabled id="courseID" defaultValue={courseID} />
              </div>

              {/*Title of Course*/}
              <div className="grid w-full  items-center gap-1.5">
                  <Label htmlFor="title">Course Title</Label>
                  <Input className = "text-black" id="title" autoFocus={false} defaultValue={title} onChange = {(e) => setTitle(e.target.value)}/>
              </div>

              {/*Department of Course.*/}
              <div className="grid w-full  items-center gap-1.5">
                  <Label htmlFor="department">Department</Label>
                  <CourseDepartmentComboBox id="department" originalDepartment={department} setDepartment={setDepartment}></CourseDepartmentComboBox>
              </div>

              {/*Credits of Course.*/}
              <div className="grid w-full  items-center gap-1.5">
                  <Label htmlFor="credits">Credits</Label>
                  <Input className = "text-black" type="number" id="credits" defaultValue={credits} onChange = {(e) => setCredits(e.target.value)}/>
              </div>

             {/*Description of Course.*/}
              <div className="grid w-full  items-center gap-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea className = "max-h-50" id="description" placeholder="Type your message here."  
                    defaultValue={description} onChange = {(e) => setDescription(e.target.value)}/>    
              </div>

            </form>
            <Button onClick = {submitCourseChanges}>Submit</Button>
            <Button className = "bg-red-500 hover:bg-red-400" onClick = {deleteCourse}>Delete</Button>
            
        </DialogContent>
    </Dialog>
    
    
    </>
  )
}
