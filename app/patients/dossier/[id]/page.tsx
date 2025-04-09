"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft, FaPrint, FaEdit, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

type Patient = {
  id: string;
  name: string;
  age: number;
  sexe: string | null;
  diagnosis: string;
  poids: number | null;
  taille: number | null;
  traitement: string | null;
  numSecu: string | null;
  medecin: string | null;
  createdAt: string;
};

export default function FicheMedicalePatient() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromUpdate = searchParams.get('updated');
  
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/patients/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
        const data = await res.json();
        setPatient(data);
        setLoading(false);
        
        if (fromUpdate === 'true') {
          setShowUpdateSuccess(true);
          setTimeout(() => {
            window.print();
          }, 1000);
          setTimeout(() => {
            setShowUpdateSuccess(false);
          }, 5000);
        }
      })
      .catch((err) => {
        console.error("Erreur chargement fiche médicale:", err);
        setError("Impossible de charger les informations du patient");
        setLoading(false);
      });
  }, [id, fromUpdate]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-gray-700">
        Chargement de la fiche médicale...
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 text-xl">
        {error || "Patient introuvable."}
      </div>
    );
  }

  const isEtatCritique = patient.diagnosis?.toLowerCase().includes("critique");
  const dateCreation = new Date(patient.createdAt).toLocaleDateString('fr-FR');
  const imc = patient.poids && patient.taille 
    ? (patient.poids / (patient.taille * patient.taille)).toFixed(1)
    : null;

  return (
    <div className="bg-gray-100 min-h-screen p-6 text-black">
      {showUpdateSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md flex items-center space-x-2 no-print z-50">
          <FaCheckCircle />
          <span>Fiche médicale mise à jour avec succès ! Préparation de l impression...</span>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6 no-print">
          <button
            onClick={() => router.back()}
            className="flex items-center text-indigo-600 hover:underline"
          >
            <FaArrowLeft className="mr-2" />
            Retour à la liste
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={() => router.push(`/patients/${id}/completer`)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition flex items-center"
            >
              <FaEdit className="mr-2" />
              Compléter la fiche
            </button>
            
            <button
              onClick={() => window.print()}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center"
            >
              <FaPrint className="mr-2" />
              Imprimer
            </button>
          </div>
        </div>

        <div className="flex justify-between mb-4 text-sm">
          <div>
            <p className="font-bold">Dr {patient.medecin || "Ratheil"}</p>
            <p>Médecin généraliste</p>
          </div>
          <div className="text-right">
            <p>UAC-IFRI-GL-2025</p>
            <p>00229 Ab-Calavi</p>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-1">FICHE MÉDICALE</h1>
          <p className="text-center">
            __________________________<strong>CONFIDENTIEL</strong>__________________________
          </p>
        </div>

        {isEtatCritique && (
          <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 rounded flex items-center">
            <FaExclamationTriangle className="text-red-600 mr-2 text-xl" />
            <span className="font-bold text-red-700">ATTENTION : État critique</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-indigo-700 mb-3 border-b pb-2">
              Informations personnelles
            </h2>
            
            <div className="space-y-2 text-[16px]">
              <div className="grid grid-cols-[120px_1fr]">
                <span className="font-semibold">Nom complet:</span>
                <span>{patient.name}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr]">
                <span className="font-semibold">Âge:</span>
                <span>{patient.age} ans</span>
              </div>
              {patient.sexe && (
                <div className="grid grid-cols-[120px_1fr]">
                  <span className="font-semibold">Sexe:</span>
                  <span>{patient.sexe}</span>
                </div>
              )}
              <div className="grid grid-cols-[120px_1fr]">
                <span className="font-semibold">N° Sécu:</span>
                <span>{patient.numSecu || "Non renseigné"}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr]">
                <span className="font-semibold">Date création:</span>
                <span>{dateCreation}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-indigo-700 mb-3 border-b pb-2">
              Informations médicales
            </h2>
            
            <div className="space-y-2 text-[16px]">
              <div className="grid grid-cols-[120px_1fr]">
                <span className="font-semibold">Taille:</span>
                <span>{patient.taille ? `${patient.taille} m` : "Non renseigné"}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr]">
                <span className="font-semibold">Poids:</span>
                <span>{patient.poids ? `${patient.poids} kg` : "Non renseigné"}</span>
              </div>
              {imc && (
                <div className="grid grid-cols-[120px_1fr]">
                  <span className="font-semibold">IMC:</span>
                  <span>{imc} kg/m²</span>
                </div>
              )}
              <div className="grid grid-cols-[120px_1fr] items-start">
                <span className="font-semibold">Diagnostic:</span>
                <div>
                  {isEtatCritique ? (
                    <span className="text-red-600 font-medium flex items-center">
                      {patient.diagnosis}
                      <FaExclamationTriangle className="ml-2" />
                    </span>
                  ) : (
                    patient.diagnosis
                  )}
                </div>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-start">
                <span className="font-semibold">Traitement:</span>
                <span>{patient.traitement || "Non renseigné"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-indigo-700 mb-3 border-b pb-2">
            Recommandations
          </h2>
          
          <div className="text-gray-700 py-2">
            {patient.traitement ? (
              <div>
                <p>Suivre scrupuleusement le traitement prescrit.</p>
                <p>En cas d effets secondaires, contactez votre médecin immédiatement.</p>
                {isEtatCritique && (
                  <p className="font-bold text-red-600 mt-2">
                    Surveillance médicale stricte requise.
                  </p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center py-3 no-print">
                <p className="italic text-gray-500">Aucune recommandation spécifique.</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t pt-4 flex justify-between text-sm text-gray-600">
          <div>
            <p>ID Patient: {patient.id}</p>
            <p>Date édition: {new Date().toLocaleDateString('fr-FR')}</p>
          </div>
          <div>
            <p className="text-right">Document confidentiel - Propriété médicale</p>
          </div>
        </div>
      </div>
    </div>
  );
}