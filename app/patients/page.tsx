"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const router = useRouter(); // Hook pour la navigation

  // Charger les patients
  useEffect(() => {
    fetch("/api/patients")
      .then(async (res) => {
        if (!res.ok) throw new Error(`Erreur API: ${res.status}`); // Vérifie si la réponse est OK
        const text = await res.text(); // Lire la réponse brute
        return text ? JSON.parse(text) : []; // Si la réponse est vide, retourne un tableau vide
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setPatients(data); // Mettre à jour l'état avec un tableau de patients valide
        } else {
          setPatients([]); // Si la donnée n'est pas un tableau, vider la liste
          console.error("Données patients invalides :", data);
        }
      })
      .catch((err) => {
        console.error("Erreur chargement patients:", err);
        setPatients([]); // Si une erreur survient, vider la liste
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6 text-center text-indigo-600">Liste des Patients</h1>

        {/* Bouton pour ajouter un nouveau patient */}
        <div className="text-right mb-4">
          <button
            onClick={() => router.push("/patients/ajouter")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Ajouter un patient
          </button>
        </div>

        {/* Tableau des patients */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 text-left">ID</th>
                <th className="border p-3 text-left">Nom</th>
                <th className="border p-3 text-left">Âge</th>
                <th className="border p-3 text-left">Diagnostic</th>
                <th className="border p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-100">
                    <td className="border p-3">{patient.id}</td>
                    <td className="border p-3">{patient.name}</td>
                    <td className="border p-3">{patient.age}</td>
                    <td className="border p-3">{patient.diagnosis}</td>
                    <td className="border p-3 flex space-x-2">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Modifier
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Aucun patient trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
