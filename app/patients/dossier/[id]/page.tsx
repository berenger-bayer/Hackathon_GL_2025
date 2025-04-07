"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

export default function DossierPatient() {
  const { id } = useParams();
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/patients/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
        const data = await res.json();
        setPatient(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement dossier patient:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-gray-700">
        Chargement...
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 text-xl">
        Patient introuvable.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center text-indigo-600 hover:underline"
        >
          <FaArrowLeft className="mr-2" />
          Retour
        </button>

        <motion.h1
          className="text-3xl font-bold mb-4 text-indigo-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dossier médical du patient
        </motion.h1>

        <div className="space-y-4 text-lg">
          <p><strong>ID :</strong> {patient.id}</p>
          <p><strong>Nom :</strong> {patient.name}</p>
          <p><strong>Âge :</strong> {patient.age} ans</p>
          <p><strong>Diagnostic :</strong> {patient.diagnosis}</p>
          <p><strong>Antécédents médicaux :</strong> {patient.antecedents || "Non renseignés"}</p>
          <p><strong>Médecin associé :</strong> {patient.medecin || "Non renseigné"}</p>
          <p><strong>Adresse :</strong> {patient.adresse || "Non renseignée"}</p>
          <p><strong>Téléphone :</strong> {patient.telephone || "Non renseigné"}</p>
          <p><strong>Date d enregistrement :</strong> {new Date(patient.createdAt).toLocaleDateString() || "Non précisée"}</p>
        </div>
      </div>
    </div>
  );
}
