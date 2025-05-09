"use client"

import React from "react"
import { useState } from "react"

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"

import InstructorDialogue from "@/components/createdUI/instructorUI/instructorDialogue"


export default function InstructorTable({ data, columns, refreshTable, setRefreshTable}) {
  //Selects the chosen row of instructors.
  const [selectedRow, setSelectedRow] = useState(null)

  //Table has to have imported variable with name "data".
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  //Search for instructor within table also.


  return (
    <div className="rounded-xl border p-4 shadow-md">
      <Table>
        
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} onClick={() => {setSelectedRow(row); console.log(row)}}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
            
          ))}
        </TableBody>

      </Table>

      {/*Popup code, once row is clicked on, pops up an input to pass and change information.*/}
      <InstructorDialogue selectedRow = {selectedRow} setSelectedRow={setSelectedRow} refreshTable = {refreshTable} setRefreshTable={setRefreshTable}></InstructorDialogue> 
   

      {/*Pagination UI with previous and next buttons. */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}