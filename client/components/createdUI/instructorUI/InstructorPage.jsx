"use client";
import React, { useState, useEffect } from "react";
import InstructorTable from "@/components/createdUI/instructorUI/instructorTable.jsx";
import { Input } from "@/components/ui/input";
import AddInstructorDialogue from "@/components/createdUI/instructorUI/addInstructorDialogue";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

// These are the columns that will be made according to the database.
const columns = [
  {
    accessorKey: "instructorId",
    header: "InstructorID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: (info) => <span className="text-blue-500">{info.getValue()}</span>,
  },
];

export default function InstructorPage() {
    // Variable that holds all the instructors fetched from the backend.
    const [allInstructors, setAllInstructors] = useState([]);

    // Table data of the instructors currently displayed
    const [instructors, setInstructors] = useState([]);

    // Input query for instructorID
    const [inputInstructorID, setInputInstructorID] = useState("");

    // The debounced instructorID search bar value
    const [debouncedInputInstructorID, setDebouncedInputInstructorID] = useState("");

    // This means the database has been updated and we need to refresh table.
    const [refreshTable, setRefreshTable] = useState(false);

    // Fetch all instructors from the backend when the component mounts or refreshTable changes
    useEffect(() => {
        async function fetchInstructors() {
            try {
                const res = await fetch("http://localhost:8080/api/instructors"); // Full backend URL
                if (!res.ok) {
                    // Handle HTTP errors like 404 or 500
                    const errorText = await res.text();
                    console.error("Failed to fetch instructors:", res.status, errorText);
                    toast.error(`Failed to fetch instructors: ${res.status} ${errorText}`);
                    setAllInstructors([]); // Set to empty array on error
                    setInstructors([]);
                    return;
                }
                const data = await res.json();
                setAllInstructors(data);
                setInstructors(data); // Initialize displayed instructors with all instructors
            } catch (error) {
                // Handle network errors
                console.error("Network error fetching instructors:", error);
                toast.error("Network error fetching instructors.");
                setAllInstructors([]); // Set to empty array on error
                setInstructors([]);
            }
        }

        fetchInstructors();
    }, [refreshTable]); // Dependency array includes refreshTable

    // Filters the instructor array based off the search query given.
    useEffect(() => {
        let filteredInstructors = allInstructors.filter(instructor => {
            // If nothing is inputted, return all the instructors.
            if (debouncedInputInstructorID === "") return true;

            // Ensure instructor.instructorId is not null or undefined before calling toString()
            // Assuming instructorId is a number or string.
            if (instructor.instructorId && instructor.instructorId.toString().toLowerCase().startsWith(debouncedInputInstructorID.toLowerCase())) return true;
            if (instructor.firstName && instructor.firstName.toLowerCase().startsWith(debouncedInputInstructorID.toLowerCase())) return true;
            if (instructor.lastName && instructor.lastName.toLowerCase().startsWith(debouncedInputInstructorID.toLowerCase())) return true;
            if (instructor.department && instructor.department.toLowerCase().startsWith(debouncedInputInstructorID.toLowerCase())) return true;
            return false; // Explicitly return false if conditions are not met
        })
        setInstructors(filteredInstructors);
    }, [debouncedInputInstructorID, allInstructors]); // Also re-filter when allInstructors changes


    // Debounced search instructorID, this makes searching less laggy since less updates.
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedInputInstructorID(inputInstructorID);
        }, 500);
        return () => clearTimeout(timeout);
    }, [inputInstructorID]);


    return (<>
        <div className="container mx-auto py-6">
            {/*Query for instructorID, name, or department. */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 w-full">
                    <Input
                        placeholder="Search by ID, Name, or Department..."
                        value={inputInstructorID}
                        onChange={(e) => setInputInstructorID(e.target.value)}
                        className="flex-grow"
                    />
                    <Button onClick={() => { setInputInstructorID(""); setDebouncedInputInstructorID(""); }} variant="outline">Clear</Button>
                </div>
            </div>

            <InstructorTable data={instructors} columns={columns} refreshTable={refreshTable} setRefreshTable={setRefreshTable}></InstructorTable>
            <div className="mt-4">
                <AddInstructorDialogue refreshTable={refreshTable} setRefreshTable={setRefreshTable}></AddInstructorDialogue>
            </div>
        </div>
    </>);
}