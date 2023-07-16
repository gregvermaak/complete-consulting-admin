import prismadb from "@/lib/prismadb"
import { LocationColumn } from "./components/columns"
import { format } from "date-fns"
import { LocationClient } from "./components/client"

const LocationsPage = async () => {
  const locations = await prismadb.location.findMany()

  const formattedLocations: LocationColumn[] = locations.map((location) => ({
    id: location.id,
    streetName: location.streetName,
    suburb: location.suburb,
    isArchived: location.isArchived,
    createdAt: format(location.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <LocationClient data={formattedLocations} />
      </div>
    </div>
  )
}

export default LocationsPage
