"use client"

import { FC } from "react"
import { useOrigin } from "@/hooks/use-origin"
import { useParams } from "next/navigation"

import { ApiAlert } from "@/components/ui/api-alert"

interface ApiListProps {
  entityName: string
  entityIdName: string
}

export const ApiList: FC<ApiListProps> = ({ entityIdName }) => {
  const origin = useOrigin()

  const baseUrl = `${origin}/api/locations`

  return (
    <>
      <ApiAlert title="GET" variant="public" description={`${baseUrl}`} />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/{${entityIdName}}`}
      />
      <ApiAlert title="POST" variant="admin" description={`${baseUrl}/`} />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/{${entityIdName}}`}
      />
    </>
  )
}
