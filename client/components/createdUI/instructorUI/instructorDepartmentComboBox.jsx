"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState, useEffect } from "react"


//Some departments that exist in SJSU (similar to course departments).
const departments = [
  {
    value: "Computer Science",
    label: "Computer Science",
  },
  {
    value: "Data Science",
    label: "Data Science",
  },
  {
    value: "Electrical Engineering",
    label: "Electrical Engineering",
  },
  {
    value: "Mechanical Engineering",
    label: "Mechanical Engineering",
  },
  {
    value: "Mathematics",
    label: "Mathematics",
  },
  {
    value: "Physics",
    label: "Physics",
  },
  {
    value: "Chemistry",
    label: "Chemistry",
  },
  {
    value: "Biology",
    label: "Biology",
  },
  {
    value: "Business Administration",
    label: "Business Administration",
  },
  {
    value: "Economics",
    label: "Economics",
  },
  {
    value: "English",
    label: "English",
  },
  {
    value: "History",
    label: "History",
  },
]

export default function InstructorDepartmentComboBox({originalDepartment, setDepartment}) {
  //Set open combo box modal.
  const [open, setOpen] = React.useState(false)
  
  //Set original department.
  useEffect(()=>{
    // Ensure setDepartment is called only if originalDepartment is provided.
    // This prevents clearing the department if it's meant to be empty initially.
    if (originalDepartment !== undefined) {
        setDepartment(originalDepartment);
    }
  },[originalDepartment, setDepartment])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {originalDepartment
            ? departments.find((department) => department.value === originalDepartment)?.label
            : "Select department..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search department..." />
          <CommandList>
            <CommandEmpty>No department found.</CommandEmpty>
            <CommandGroup>
              {departments.map((department) => (
                <CommandItem
                  key={department.value + "InstructorComboBox"}
                  value={department.value}
                  onSelect={(currentValue) => {
                    // If the current value is already selected, deselect it (set to empty string or null)
                    // Otherwise, set it to the new value.
                    setDepartment(currentValue === originalDepartment ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      originalDepartment === department.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {department.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}