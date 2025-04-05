import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Mettre à jour un patient
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    // Récupérer le corps de la requête
    const body = await req.json();
    const { name, age, diagnosis } = body;

    // Vérification des données
    if (!name || !age || !diagnosis) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    // Mettre à jour le patient dans la base de données
    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: { name, age, diagnosis },
    });

    return NextResponse.json(updatedPatient); // Renvoie le patient mis à jour
  } catch (error) {
    console.error('Erreur mise à jour patient:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
