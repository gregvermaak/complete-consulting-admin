"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type LocationColumn = {
  id: string
  streetName: string
  suburb: string
  isArchived: boolean
  createdAt: string
}

export const columns: ColumnDef<LocationColumn>[] = [
  {
    accessorKey: "streetName",
    header: "Street Name",
  },
  {
    accessorKey: "suburb",
    header: "Suburb",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
