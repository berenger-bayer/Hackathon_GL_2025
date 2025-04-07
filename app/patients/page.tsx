"use client";  // Ajoutez cette ligne en haut du fichier

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaPrint, FaEye, FaExclamationTriangle } from "react-icons/fa";
import Notification from "../components/Notification";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [filterKey, setFilterKey] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [notification, setNotification] = useState("");
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

        const alertes = data.filter(p => p.diagnosis?.toLowerCase().includes("critique"));
        const maintenant = new Date();
        const dansTroisJours = new Date();
        dansTroisJours.setDate(maintenant.getDate() + 3);
        const rappels = data.filter(p => {
          const rdv = new Date(p.rendezvous);
          return rdv >= maintenant && rdv <= dansTroisJours;
        });

        if (alertes.length > 0) {
          setNotification(`⚠️ ${alertes.length} patient(s) en état critique`);
        } else if (rappels.length > 0) {
          setNotification(`🔔 ${rappels.length} rendez-vous à venir dans 3 jours`);
        }
      })
      .catch((err) => {
        console.error("Erreur chargement patients:", err);
        setPatients([]);
      });
  }, []);

  const filteredPatients = [...patients]
    .filter((patient) => {
      const value = patient[filterKey];
      if (filterKey === "id") {
        return String(value).includes(search);
      }
      return String(value).toLowerCase().includes(search.toLowerCase());
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

  const highlightMatch = (text: string, search: string) => {
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, `<mark class="bg-yellow-300">$1</mark>`);
  };

  const getHighlighted = (key: string, value: any): JSX.Element | string => {
    const text = String(value);
    if (filterKey === key && search) {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: highlightMatch(text, search),
          }}
        />
      );
    }
    return text;
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
            <option value="nom">Nom</option>
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

        <div className="grid gap-4 md:overflow-x-auto md:bg-white md:shadow-lg md:rounded-lg">
          <table className="hidden md:table w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-indigo-100">
                <th className="border p-4 text-left text-indigo-600">Patient n°</th>
                <th className="border p-4 text-left text-indigo-600">Nom</th>
                <th className="border p-4 text-left text-indigo-600">Âge</th>
                <th className="border p-4 text-left text-indigo-600">Diagnostic</th>
                <th className="border p-4 text-left text-indigo-600 no-print">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={patient.id} className="hover:bg-gray-100">
                  <td className="border p-4 text-black">
                    {getHighlighted("id", index + 1)}
                  </td>
                  <td className="border p-4 text-black">
                    {getHighlighted("name", patient.name)}
                  </td>
                  <td className="border p-4 text-black">
                    {getHighlighted("age", patient.age)}
                  </td>
                  <td className="border p-4 text-black">
                    {getHighlighted("diagnosis", patient.diagnosis)}
                    {/* Afficher l'icône de signalement pour un état critique */}
                    {patient.diagnosis?.toLowerCase().includes("critique") && (
                      <FaExclamationTriangle className="text-red-600 ml-2" title="État Critique" />
                    )}
                  </td>
                  <td className="border p-4 flex space-x-2 justify-center text-indigo-600 no-print">
                    <button
                      onClick={() => router.push(`/patients/dossier/${patient.id}`)}
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      <FaEye size={18} />
                    </button>
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
              ))}
            </tbody>
          </table>

          <div className="md:hidden grid gap-4">
            {filteredPatients.map((patient, index) => (
              <div key={patient.id} className="bg-white shadow rounded-lg p-4 text-sm">
                <div className="font-bold text-indigo-600 mb-2">
                  Patient n°{getHighlighted("id", index + 1)}
                </div>
                <p><strong>Nom :</strong> {getHighlighted("name", patient.name)}</p>
                <p><strong>Âge :</strong> {getHighlighted("age", patient.age)}</p>
                <p><strong>Diagnostic :</strong> {getHighlighted("diagnosis", patient.diagnosis)}</p>
                {/* Affichage de l'icône critique sur mobile */}
                {patient.diagnosis?.toLowerCase().includes("critique") && (
                  <FaExclamationTriangle className="text-red-600 ml-2" title="État Critique" />
                )}
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => router.push(`/patients/dossier/${patient.id}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => router.push(`/patients/modifier/${patient.id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(patient.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {notification && (
          <Notification message={notification} onClose={() => setNotification("")} />
        )}
      </div>
    </div>
  );
}
