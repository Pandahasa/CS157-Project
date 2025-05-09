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


//Some departments that exist in SJSU.
const departments = [
  {
    value: "Computer Science",
    label: "Computer Science",
  },
  {
    value: "Engineering",
    label: "Engineering",
  },
  {
    value: "Data Science",
    label: "Data Science",
  },
  {
    value: "Biology",
    label: "Biology",
  },
  {
    value: "Business",
    label: "Business",
  },
  {
    value: "Pre-Med",
    label: "Pre-Med",
  },
]

export default function CourseDepartmentComboBox({originalDepartment, setDepartment}) {
  //Set open combo box modal.
  const [open, setOpen] = React.useState(false)
  
  //Set original department on loadup.
  useEffect(()=>{

    setDepartment(originalDepartment);

  },[])

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
                  key={department.value + "StudentComboBox"}
                  value={department.value}
                  onSelect={(currentDepartment) => {
                    setDepartment(currentDepartment === originalDepartment ? "" : currentDepartment)
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
