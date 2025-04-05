// app/api/patients/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const patient = await req.json();

    // Validation basique avant insertion
    if (patient.age < 0) {
      return NextResponse.json({ error: 'L\'âge ne peut pas être négatif.' }, { status: 400 });
    }

    const newPatient = await prisma.patient.create({
      data: {
        name: patient.name,
        age: patient.age,
        diagnosis: patient.diagnosis,
      },
    });

    return NextResponse.json(newPatient);
  } catch (error) {
    console.error('Erreur ajout patient:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const patients = await prisma.patient.findMany();
    return NextResponse.json(patients);
  } catch (error) {
    console.error('Erreur lors du chargement des patients:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
