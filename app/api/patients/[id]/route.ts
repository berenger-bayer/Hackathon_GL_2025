import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Mettre à jour un patient
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;  // Accès direct à params.id (pas besoin d'attendre ici, Next.js le fait automatiquement)

  try {
    // Récupérer le corps de la requête
    const body = await req.json();
    const { name, age, diagnosis } = body;

    // Vérification des données
    if (!name || !age || !diagnosis) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    // Vérification que l'âge est un entier
    if (isNaN(Number(age))) {
      return NextResponse.json({ error: 'L\'âge doit être un entier valide' }, { status: 400 });
    }

    // Mettre à jour le patient dans la base de données
    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: { name, age: parseInt(age, 10), diagnosis },  // Assurez-vous que age est un entier
    });

    return NextResponse.json(updatedPatient); // Renvoie le patient mis à jour
  } catch (error) {
    console.error('Erreur mise à jour patient:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// Récupérer un patient par ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;  // Accès direct à params.id

  try {
    // Récupérer le patient de la base de données
    const patient = await prisma.patient.findUnique({
      where: {
        id: id,
      },
    });

    // Vérifier si le patient existe
    if (!patient) {
      return NextResponse.json({ message: "Patient non trouvé" }, { status: 404 });
    }

    return NextResponse.json(patient); // Renvoie les données du patient
  } catch (error) {
    console.error('Erreur récupération patient:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
