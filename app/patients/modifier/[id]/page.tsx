"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";

export default function CompleterPatientPage() {
  const router = useRouter();
  const { id } = useParams();
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    diagnosis: "",
    poids: "",
    taille: "",
    traitement: "",
    numSecu: "",
    medecin: "",
  });

  useEffect(() => {
    // Récupération du patient existant
    fetch(`/api/patients/${id}`)
      .then((res) => {
        if (!res.ok) {
          return res.text().then((errorText) => {
            throw new Error(`Erreur lors de la récupération des données: ${errorText}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        // Vérification de la validité des données
        if (!data || Object.keys(data).length === 0) {
          throw new Error("Données invalides ou vides reçues");
        }
        
        // Convertir les valeurs null en chaînes vides pour le formulaire
        const formattedData = {
          ...data,
          poids: data.poids ?? "",
          taille: data.taille ?? "",
          traitement: data.traitement ?? "",
          numSecu: data.numSecu ?? "",
          medecin: data.medecin ?? ""
        };
        
        setPatient(formattedData);
      })
      .catch((err) => {
        console.error("Erreur chargement patient:", err);
        alert(`Erreur lors du chargement des données: ${err.message}`);
        router.push(`/patients/${id}`);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convertir les champs numériques
    const formattedPatient = {
      ...patient,
      age: parseInt(patient.age),
      poids: patient.poids ? parseFloat(patient.poids) : null,
      taille: patient.taille ? parseFloat(patient.taille) : null
    };
    
    try {
      const res = await fetch(`/api/patients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedPatient),
      });

      if (!res.ok) {
        const errorText = await res.text();
        if (errorText) {
          throw new Error(`Échec de la mise à jour: ${errorText}`);
        } else {
          throw new Error("Échec de la mise à jour, réponse vide du serveur.");
        }
      }

      const updatedPatient = await res.json();
      if (updatedPatient) {
        // Rediriger vers la fiche médicale avec un paramètre indiquant la mise à jour
        router.push(`/patients/dossier/${id}?updated=true`);
      } else {
        throw new Error("La réponse du serveur est vide.");
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour du patient:", err);
      alert(`Erreur lors de la mise à jour du patient: ${err.message}`);
    }
  };

  const handleCancel = () => {
    router.push(`/patients/${id}`); // Retour à la fiche médicale du patient
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleCancel}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition"
          >
            <FaArrowLeft className="mr-2" />
            Retour à la fiche
          </button>
          
          <h2 className="text-2xl font-semibold text-center text-indigo-600">
            Compléter la fiche médicale
          </h2>
          
          <div className="w-24"></div> {/* Div vide pour centrer le titre */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section informations personnelles */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-indigo-700 mb-4 border-b pb-2">
              Informations personnelles
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={patient.name}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Âge</label>
                <input
                  type="number"
                  name="age"
                  value={patient.age}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-gray-700 font-medium">N° Sécurité Sociale</label>
                <input
                  type="text"
                  name="numSecu"
                  value={patient.numSecu}
                  onChange={handleChange}
                  placeholder="Numéro de sécurité sociale"
                  className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Médecin traitant</label>
                <input
                  type="text"
                  name="medecin"
                  value={patient.medecin}
                  onChange={handleChange}
                  placeholder="Nom du médecin"
                  className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
          
          {/* Section informations médicales */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-indigo-700 mb-4 border-b pb-2">
              Informations médicales
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Taille (m)</label>
                <input
                  type="number"
                  name="taille"
                  value={patient.taille}
                  onChange={handleChange}
                  step="0.01"
                  placeholder="Ex: 1.75"
                  className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Poids (kg)</label>
                <input
                  type="number"
                  name="poids"
                  value={patient.poids}
                  onChange={handleChange}
                  step="0.1"
                  placeholder="Ex: 70.5"
                  className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block mb-1 text-gray-700 font-medium">Diagnostic</label>
                <textarea
                  name="diagnosis"
                  value={patient.diagnosis}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label className="block mb-1 text-gray-700 font-medium">Traitement prescrit</label>
                <textarea
                  name="traitement"
                  value={patient.traitement}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Détails du traitement"
                  className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition flex items-center"
            >
              <FaTimes className="mr-2" />
              Annuler
            </button>
            
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center"
            >
              <FaSave className="mr-2" />
              Enregistrer et imprimer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}