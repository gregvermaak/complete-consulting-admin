import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import prismadb from "@/lib/prismadb"

export async function GET(
  req: Request,
  { params }: { params: { locationId: string } }
) {
  try {
    if (!params.locationId)
      return new NextResponse("Location id is required", { status: 400 })

    const location = await prismadb.location.findUnique({
      where: {
        id: params.locationId,
      },
      include: {
        images: true,
      },
    })

    return NextResponse.json(location)
  } catch (error) {
    console.log("[LOCATION_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { locationId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { id, streetName, suburb, images, isArchived, createdAt, updatedAt } =
      body

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

    if (!streetName)
      return new NextResponse("Street Name is required", { status: 400 })

    if (!suburb) return new NextResponse("Suburb is required", { status: 400 })

    if (!images || !images.length) {
      return new NextResponse("At least one image is required", { status: 400 })
    }

    if (!params.locationId)
      return new NextResponse("Location ID is required", { status: 400 })

    await prismadb.location.update({
      where: {
        id: params.locationId,
      },
      data: {
        streetName,
        suburb,
        images: {
          deleteMany: {},
        },

        isArchived,
      },
    })

    const location = await prismadb.location.update({
      where: {
        id: params.locationId,
      },
      data: {
        images: {
          createMany: {
            data: images.map((image: { url: string }) => image),
          },
        },
      },
    })

    return NextResponse.json(location)
  } catch (error) {
    console.log("[LOCATION_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; locationId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

    if (!params.locationId)
      return new NextResponse("Location ID is required", { status: 400 })

    const location = await prismadb.location.deleteMany({
      where: {
        id: params.locationId,
      },
    })

    return NextResponse.json(location)
  } catch (error) {
    console.log("[LOCATION_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
