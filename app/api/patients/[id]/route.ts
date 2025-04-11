import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Type pour les données de mise à jour du patient
interface UpdatePatientData {
  nom?: string;
  age?: number;
  sexe?: string;
  groupeSanguin?: string;
  poids?: number;
  taille?: number;
  allergies?: string;
  diagnosis?: string;
  traitement?: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } } // Typage correct
): Promise<NextResponse> {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "ID du patient manquant" },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      return NextResponse.json(
        { error: `Patient non trouvé avec l'ID: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error("Erreur récupération patient:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération du patient" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } } // Typage correct
): Promise<NextResponse> {
  try {
    const { id } = params;
    const data: UpdatePatientData = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID du patient manquant" },
        { status: 400 }
      );
    }

    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: {
        ...data,
        age: data.age,
        poids: data.poids,
        taille: data.taille,
      },
    });

    return NextResponse.json(updatedPatient);
  } catch (error) {
    console.error("Erreur mise à jour patient:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du patient" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } } // Typage correct
): Promise<NextResponse> {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "ID du patient manquant" },
        { status: 400 }
      );
    }

    await prisma.patient.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Erreur suppression patient:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du patient" },
      { status: 500 }
    );
  }
}