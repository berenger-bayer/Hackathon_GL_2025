import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Type pour le contexte des params
interface RouteParams {
  params: { id: string };
}

export async function GET(
  request: Request,
  { params }: RouteParams
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
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { id } = params;
    const data = await request.json();

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
        age: data.age ? parseInt(data.age) : undefined,
        poids: data.poids ? parseFloat(data.poids) : undefined,
        taille: data.taille ? parseFloat(data.taille) : undefined
      }
    });

    return NextResponse.json(updatedPatient);
  } catch (error) {
    console.error("Erreur mise à jour patient:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteParams
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
      where: { id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Erreur suppression patient:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}