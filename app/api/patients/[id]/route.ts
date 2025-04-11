import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

// 🔧 Fonction utilitaire pour extraire l’ID
function getIdFromRequest(req: NextRequest): string | null {
  const id = req.nextUrl.pathname.split('/').pop();
  return id && id !== '[id]' ? id : null;
}

export async function GET(req: NextRequest) {
  const id = getIdFromRequest(req);

  if (!id) {
    return NextResponse.json({ error: "ID du patient manquant" }, { status: 400 });
  }

  try {
    const patient = await prisma.patient.findUnique({ where: { id } });

    if (!patient) {
      return NextResponse.json({ error: `Patient non trouvé avec l'ID: ${id}` }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error("Erreur récupération patient:", error);
    return NextResponse.json({ error: "Erreur serveur lors de la récupération du patient" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const id = getIdFromRequest(req);

  if (!id) {
    return NextResponse.json({ error: "ID du patient manquant" }, { status: 400 });
  }

  try {
    const data: UpdatePatientData = await req.json();

    const updatedPatient = await prisma.patient.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedPatient);
  } catch (error) {
    console.error("Erreur mise à jour patient:", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour du patient" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const id = getIdFromRequest(req);

  if (!id) {
    return NextResponse.json({ error: "ID du patient manquant" }, { status: 400 });
  }

  try {
    await prisma.patient.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Erreur suppression patient:", error);
    return NextResponse.json({ error: "Erreur lors de la suppression du patient" }, { status: 500 });
  }
}
