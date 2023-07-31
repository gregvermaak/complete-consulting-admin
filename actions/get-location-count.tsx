import prismadb from "@/lib/prismadb"

export const getLocationCount = async () => {
  const locationCount = await prismadb.location.count()

  return locationCount
}
