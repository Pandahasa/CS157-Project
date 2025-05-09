import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
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

export default function addCourseDialog({refreshTable, setRefreshTable}) {
  //Variables to change to make new course.
  const [title, setTitle] = useState();
  const [department, setDepartment] = useState();
  const [courseID, setCourseID] = useState();
  const [credits, setCredits] = useState();
  const [description, setDescription] = useState();



  //Submit changes to database
  const submitAddCourse = () => {
    const randomVar = {title, department, courseID, credits, description}
    console.log(randomVar);

    //Checks if valid input or do not continue.
    if(!title || !department || !credits || !description){
        toast.custom(() => (
            <div className="bg-red-500 text-white p-5 rounded shadow-lg">
                Please fill in all valid inputs for course.
            </div>
        ),{ duration: 2000,});

        //Resets useStates to be empty.
        setTitle("");
        setDepartment(""); 
        setCredits(null); 
        setDescription(""); 

        //Exit out and not create into sql database.
        return;
    }else{
        toast.custom(() => (
            <div className="bg-green-500 text-white p-5 rounded shadow-lg">
                ✅ Course created successfully!
            </div>
        ),{ duration: 2000,});
    }


    //INPUT SQL LOGIC HERE.

    //Resets useStates to be empty.
    setTitle("");
    setDepartment(""); 
    setCredits(null); 
    setDescription(""); 

    //Forces a refresh of the newly changes database.
    setRefreshTable(!refreshTable);
  }


  return (
    <>
    {/*Popup code, once row is clicked on, pops up an input to pass and change information.*/}
    {/*Information is accessible through row.original attribute. */}
    <Dialog>
        <DialogTrigger asChild>
            <Button className = "bg-blue-300 hover:bg-blue-200" variant="outline">Add Course</Button>
        </DialogTrigger> 

        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Course</DialogTitle>
                <DialogDescription>
                    Creating a Course.
                </DialogDescription>
            </DialogHeader>

            {/*For all the information regarding the course. Here is where you add the information.*/}
            <form className="space-y-2">

              {/*CourseID can't be changed. MySQL will auto add ID.*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="courseID">CourseID</Label>
                  <Input className = "text-black" disabled id="courseID" placeholder="ID will be made." />
              </div>

              {/*Title of Course*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="title">Course Title</Label>
                  <Input className = "text-black" id="title" autoFocus={false} onChange = {(e) => setTitle(e.target.value)}/>
              </div>

              {/*Department of Course.*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="department">Department</Label>
                  <CourseDepartmentComboBox id="department" originalDepartment={department} setDepartment={setDepartment}></CourseDepartmentComboBox>
              </div>

              {/*Credits of Course.*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="credits">Credits</Label>
                  <Input className = "text-black" type="number" id="credits" onChange = {(e) => setCredits(e.target.value)}/>
              </div>

             {/*Description of Course.*/}
              <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea className = "max-h-50" id="description"  
                    defaultValue={description} onChange = {(e) => setDescription(e.target.value)}/>    
              </div>

            </form>
        {/*Closes dialogue. */}
          <DialogClose asChild>
              <Button onClick = {submitAddCourse}>Submit</Button>
          </DialogClose>
            
        </DialogContent>
    </Dialog>
    
    
    </>
  )
}
