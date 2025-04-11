import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Type pour les données de patient
interface PatientData {
  name?: string;
  age?: string | number;
  sexe?: string;
  diagnosis?: string;
  poids?: string | number;
  taille?: string | number;
  traitement?: string;
  numSecu?: string;
  medecin?: string;
  rendezvous?: string;
  groupeSanguin?: string;
  allergies?: string;
  notes?: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "ID du patient manquant" },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({
      where: { id }
    });

    if (!patient) {
      return NextResponse.json(
        { error: "Patient non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(patient);
    
  } catch (error) {
    console.error("Erreur récupération patient:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data: PatientData = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID du patient manquant" },
        { status: 400 }
      );
    }

    // Validation des données
    if (data.age && isNaN(Number(data.age))) {
      return NextResponse.json(
        { error: "L'âge doit être un nombre" },
        { status: 400 }
      );
    }

    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: {
        ...data,
        age: data.age ? parseInt(data.age.toString()) : undefined,
        poids: data.poids ? parseFloat(data.poids.toString()) : undefined,
        taille: data.taille ? parseFloat(data.taille.toString()) : undefined,
        rendezvous: data.rendezvous ? new Date(data.rendezvous) : undefined
      }
    });

    return NextResponse.json(updatedPatient);
    
  } catch (error) {
    console.error("Erreur mise à jour patient:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du patient" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "ID du patient manquant" },
        { status: 400 }
      );
    }

    // Vérifiez d'abord si le patient existe
    const patient = await prisma.patient.findUnique({
      where: { id }
    });

    if (!patient) {
      return NextResponse.json(
        { error: "Patient non trouvé" },
        { status: 404 }
      );
    }

    await prisma.patient.delete({
      where: { id }
    });

    return new NextResponse(null, { status: 204 });
    
  } catch (error) {
    console.error("Erreur suppression patient:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du patient" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}