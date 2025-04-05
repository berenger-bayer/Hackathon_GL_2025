// app/api/patients/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const patients = await prisma.patient.findMany();
    return NextResponse.json(patients); // Retourner les patients
  } catch (error) {
    return new NextResponse("Erreur lors de la récupération des patients.", { status: 500 });
  }
}

// Assure-toi que ton code gère bien GET et que la route est correcte
