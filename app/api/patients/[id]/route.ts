import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Déstructurez les params directement dans les arguments de la fonction
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: "ID du patient manquant" },
        { status: 400 }
      )
    }

    const patient = await prisma.patient.findUnique({
      where: { id }
    })

    if (!patient) {
      return NextResponse.json(
        { error: "Patient non trouvé" },
        { status: 404 }
      )
    }

    return NextResponse.json(patient)
    
  } catch (error) {
    console.error("Erreur récupération patient:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

// Les corrections similaires pour PUT et DELETE
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params // Déstructuration directe
    const data = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: "ID du patient manquant" },
        { status: 400 }
      )
    }

    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: {
        ...data,
        age: data.age ? parseInt(data.age) : undefined,
        poids: data.poids ? parseFloat(data.poids) : undefined,
        taille: data.taille ? parseFloat(data.taille) : undefined
      }
    })

    return NextResponse.json(updatedPatient)
    
  } catch (error) {
    console.error("Erreur mise à jour patient:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params // Déstructuration directe

    if (!id) {
      return NextResponse.json(
        { error: "ID du patient manquant" },
        { status: 400 }
      )
    }

    await prisma.patient.delete({
      where: { id }
    })

    return new NextResponse(null, { status: 204 })
    
  } catch (error) {
    console.error("Erreur suppression patient:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}