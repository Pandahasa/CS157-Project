"use server";
import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StudentPage from "@/components/createdUI/studentUI/StudentPage"
import CoursePage from "@/components/createdUI/courseUI/CoursePage"

export default async function MainPage(){


  //Prob have to have on useState refreshtable here. Pass it all down.
    return(<>
    
    <Tabs defaultValue="Students" className="">
        <TabsList>
            <TabsTrigger value="Students">Students</TabsTrigger>
            <TabsTrigger value="Courses">Courses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="Students">
          <StudentPage></StudentPage>
        </TabsContent>
        <TabsContent value="Courses">
          <CoursePage></CoursePage>
        </TabsContent>

    </Tabs>

    </>);
}