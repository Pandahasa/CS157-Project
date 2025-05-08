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


//Some majors that exist in SJSU.
const majors = [
  {
    value: "Computer Science",
    label: "Computer Science",
  },
  {
    value: "Computer Engineer",
    label: "Computer Engineering",
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

export default function StudentComboBox({originalMajor, setMajor}) {
  const [open, setOpen] = React.useState(false)
  
  useEffect(()=>{

    setMajor(originalMajor);

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
          {originalMajor
            ? majors.find((major) => major.value === originalMajor)?.label
            : "Select major..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search major..." />
          <CommandList>
            <CommandEmpty>No major found.</CommandEmpty>
            <CommandGroup>
              {majors.map((major) => (
                <CommandItem
                  key={major.value + "StudentComboBox"}
                  value={major.value}
                  onSelect={(currentMajor) => {
                    setMajor(currentMajor === originalMajor ? "" : currentMajor)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      originalMajor === major.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {major.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
