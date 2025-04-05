"use client";  // Ajoutez cette ligne en haut du fichier

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaPrint } from "react-icons/fa";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [filterKey, setFilterKey] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    fetch("/api/patients")
      .then(async (res) => {
        if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
        const data = await res.json();
        setPatients(data);
      })
      .catch((err) => {
        console.error("Erreur chargement patients:", err);
        setPatients([]);
      });
  }, []);

  const filteredPatients = [...patients]
    .filter((patient) => {
      const val = String(patient[filterKey]).toLowerCase();
      return val.includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (a[filterKey] < b[filterKey]) return sortAsc ? -1 : 1;
      if (a[filterKey] > b[filterKey]) return sortAsc ? 1 : -1;
      return 0;
    });

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce patient ?");
    if (confirmDelete) {
      try {
        const res = await fetch(`/api/patients/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error(`Erreur suppression patient: ${res.status}`);
        setPatients(patients.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Erreur suppression patient:", error);
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <motion.h1
          className="text-4xl font-semibold mb-6 text-center text-indigo-700"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Liste des Patients
        </motion.h1>

        {/* Recherche, filtre, ajouter, imprimer */}
        <div className="bg-white p-6 mb-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-5 gap-4 no-print">
          <input
            type="text"
            placeholder={`Rechercher par ${filterKey}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-indigo-600 text-lg"
          />

          <select
            value={filterKey}
            onChange={(e) => setFilterKey(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-indigo-600 text-lg"
          >
            <option value="id">ID</option>
            <option value="name">Nom</option>
            <option value="age">Âge</option>
            <option value="diagnosis">Diagnostic</option>
          </select>

          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition text-lg"
          >
            {sortAsc ? "↑ Croissant" : "↓ Décroissant"}
          </button>

          <button
            onClick={() => router.push("/patients/ajouter")}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition flex items-center justify-center space-x-2 text-lg"
          >
            <FaPlus />
            <span className="hidden md:inline">Ajouter</span>
          </button>

          <button
            onClick={() => window.print()}
            className="w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition flex items-center justify-center space-x-2 text-lg"
          >
            <FaPrint />
            <span className="hidden md:inline">Imprimer</span>
          </button>
        </div>

        {/* Tableau */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg printable">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-indigo-100">
                <th className="border p-4 text-left text-indigo-600">Patient n°</th> {/* Colonne # pour les numéros incrémentés */}
                <th className="border p-4 text-left text-indigo-600">Nom</th>
                <th className="border p-4 text-left text-indigo-600">Âge</th>
                <th className="border p-4 text-left text-indigo-600">Diagnostic</th>
                <th className="border p-4 text-left text-indigo-600 no-print">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, index) => (
                  <tr key={patient.id} className="hover:bg-gray-100">
                    <td className="border p-4 text-black">{index + 1}</td> {/* Affichage du numéro incrémenté */}
                    <td className="border p-4 text-black">{patient.name}</td>
                    <td className="border p-4 text-black">{patient.age}</td>
                    <td className="border p-4 text-black">{patient.diagnosis}</td>
                    <td className="border p-4 flex space-x-4 justify-center text-indigo-600 no-print">
                      <button
                        onClick={() => router.push(`/patients/modifier/${patient.id}`)}
                        className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(patient.id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
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
