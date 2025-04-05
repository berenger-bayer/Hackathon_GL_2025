import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID du patient requis" }, { status: 400 });
    }

    const patient = await prisma.patient.findUnique({ where: { id: Number(id) } });
    if (!patient) {
      return NextResponse.json({ error: "Patient non trouvé" }, { status: 404 });
    }

    await prisma.patient.delete({ where: { id: Number(id) } });

    return NextResponse.json({ message: "Patient supprimé avec succès" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const data = await req.json();

    if (!id || Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const existingPatient = await prisma.patient.findUnique({ where: { id: Number(id) } });
    if (!existingPatient) {
      return NextResponse.json({ error: "Patient non trouvé" }, { status: 404 });
    }

    const updatedPatient = await prisma.patient.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json(updatedPatient, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la modification :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const nameQuery = searchParams.get("name") || "";
    const diagnosisQuery = searchParams.get("diagnosis") || "";

    const patients = await prisma.patient.findMany({
      where: {
        name: { contains: nameQuery },
        diagnosis: diagnosisQuery ? { equals: diagnosisQuery } : undefined,
      },
    });

    return NextResponse.json(patients);
  } catch (error) {
    console.error("Erreur lors de la récupération des patients :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
