"use client";
import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StudentPage from "@/components/createdUI/studentUI/StudentPage"
import CoursePage from "@/components/createdUI/courseUI/CoursePage"
import EnrollmentPage from "@/components/createdUI/enrollmentsUI/EnrollmentPage"

import { useState, useEffect } from "react";

export default function MainPage(){

  
    //This means the database has been updated and we need to refresh the tables.
    const [refreshTable, setRefreshTable] = useState(false);


  //Prob have to have on useState refreshtable here. Pass it all down.
    return(<>
    
    <Tabs defaultValue="Students" className="">
        <TabsList>
            <TabsTrigger value="Students">Students</TabsTrigger>
            <TabsTrigger value="Courses">Courses</TabsTrigger>
            <TabsTrigger value="Enrollments">Enrollments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="Students">
          <StudentPage></StudentPage>
        </TabsContent>
        <TabsContent value="Courses">
          <CoursePage></CoursePage>
        </TabsContent>
        <TabsContent value="Enrollments">
            <EnrollmentPage></EnrollmentPage>
        </TabsContent>

    </Tabs>

    </>);
}