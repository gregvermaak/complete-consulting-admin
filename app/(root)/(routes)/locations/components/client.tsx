"use client"

import { FC } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

import { LocationColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"
interface LocationClientProps {
  data: LocationColumn[]
}

export const LocationClient: FC<LocationClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Gallery Locations (${data.length})`}
          description="Manage locations for your gallery"
        />
        <Button onClick={() => router.push(`/locations/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="streetName" />
      <Heading title="API" description="API calls for Gallery Locations" />
      <Separator />
      <ApiList entityName="location" entityIdName="locationId" />
    </>
  )
}
