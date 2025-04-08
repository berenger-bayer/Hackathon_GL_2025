"use client";

import React, { JSX } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaPrint, FaEye, FaExclamationTriangle, FaSearch, FaSort, FaFilter, FaWeight, FaRulerVertical, FaIdCard, FaUserMd, FaPills } from "react-icons/fa";
import Notification from "../components/Notification";

type Patient = {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  poids: number | null;
  taille: number | null;
  traitement: string | null;
  numSecu: string | null;
  medecin: string | null;
  rendezvous?: string;
  createdAt?: string;
};

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [filterKey, setFilterKey] = useState<keyof Patient>("name");
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

  const getHighlighted = (key: keyof Patient, value: string | number): JSX.Element | string => {
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

  const displayId = (id: string): string => {
    const numericId = parseInt(id.replace(/-/g, "").substring(0, 8), 16) % 1000000;
    return numericId.toString().padStart(6, '0');
  };
  
  function PrintView({ patients }: { patients: Patient[] }) {
    const currentDate = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  
    return (
      <div className="fixed inset-0 bg-white z-[9999] hidden print:block p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Hôpital AI4CKD - Liste des Patients</h1>
          <h2 className="text-xl mb-4">Service de Néphrologie</h2>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Imprimé le: {currentDate}</span>
            <span>Total patients: {patients.length}</span>
          </div>
        </div>
  
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">Nom</th>
              <th className="border p-2 text-left">Âge</th>
              <th className="border p-2 text-left">Diagnostic</th>
              <th className="border p-2 text-left">Poids/Taille</th>
              <th className="border p-2 text-left">Médecin</th>
              <th className="border p-2 text-left">N° Sécurité Sociale</th>
              <th className="border p-2 text-left">Traitement</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b">
                <td className="border p-2">{displayId(patient.id)}</td>
                <td className="border p-2">{patient.name}</td>
                <td className="border p-2">{patient.age}</td>
                <td className={`border p-2 ${
                  patient.diagnosis?.toLowerCase().includes("critique") 
                    ? "text-red-600 font-bold" 
                    : ""
                }`}>
                  {patient.diagnosis}
                  {patient.diagnosis?.toLowerCase().includes("critique") && " (CRITIQUE)"}
                </td>
                <td className="border p-2">
                  {patient.poids ? `${patient.poids} kg` : '-'} / {patient.taille ? `${patient.taille} m` : '-'}
                </td>
                <td className="border p-2">{patient.medecin || "-"}</td>
                <td className="border p-2">{patient.numSecu || "-"}</td>
                <td className="border p-2">{patient.traitement || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <div className="mt-8 pt-4 border-t text-center text-sm text-gray-500">
          Document confidentiel - Hôpital AI4CKD © {new Date().getFullYear()}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">Gestion des Patients</h1>
            <p className="text-gray-500 mt-1 text-lg">
              {filteredPatients.length} patient(s) trouvé(s)
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <button
              onClick={() => router.push("/patients/ajouter")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition text-lg"
            >
              <FaPlus /> Nouveau patient
            </button>
            <button
              onClick={() => {
                document.title = `Liste_Patients_${new Date().toLocaleDateString('fr-FR')}`;
                window.print();
              }}
              className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition text-lg"
            >
              <FaPrint /> Imprimer
            </button>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-sm p-4 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={`Rechercher...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg text-black"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                value={filterKey}
                onChange={(e) => setFilterKey(e.target.value as keyof Patient)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg text-black"
              >
                <option value="id">ID</option>
                <option value="name">Nom</option>
                <option value="age">Âge</option>
                <option value="diagnosis">Diagnostic</option>
                <option value="medecin">Médecin</option>
                <option value="numSecu">N° Sécurité Sociale</option>
                <option value="traitement">Traitement</option>
              </select>
            </div>
            
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="flex items-center justify-center gap-2 w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-lg text-black"
            >
              <FaSort />
              {sortAsc ? "Croissant" : "Décroissant"}
            </button>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-medium text-indigo-600 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-indigo-600 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-indigo-600 uppercase tracking-wider">Âge</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-indigo-600 uppercase tracking-wider">Diagnostic</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-indigo-600 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaWeight className="mr-1" /> / <FaRulerVertical className="ml-1" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-indigo-600 uppercase tracking-wider">
                    <FaUserMd />
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-indigo-600 uppercase tracking-wider">
                    <FaIdCard />
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-indigo-600 uppercase tracking-wider">
                    <FaPills />
                  </th>
                  <th className="px-6 py-4 text-right text-lg font-medium text-indigo-600 uppercase tracking-wider no-print">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">
                      {displayId(patient.id)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                      {getHighlighted("name", patient.name)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                      {getHighlighted("age", patient.age)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                      <div className="flex items-center">
                        {getHighlighted("diagnosis", patient.diagnosis)}
                        {patient.diagnosis?.toLowerCase().includes("critique") && (
                          <FaExclamationTriangle className="ml-2 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                      {patient.poids ? `${patient.poids} kg` : '-'} / {patient.taille ? `${patient.taille} m` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                      {getHighlighted("medecin", patient.medecin || '-')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                      {getHighlighted("numSecu", patient.numSecu || '-')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                      {getHighlighted("traitement", patient.traitement || '-')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-medium no-print">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => router.push(`/patients/dossier/${patient.id}`)}
                          className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition"
                          title="Voir"
                        >
                          <FaEye size={18} />
                        </button>
                        <button
                          onClick={() => router.push(`/patients/modifier/${patient.id}`)}
                          className="text-yellow-600 hover:text-yellow-900 p-2 rounded-full hover:bg-yellow-50 transition"
                          title="Modifier"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(patient.id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition"
                          title="Supprimer"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          className="md:hidden grid gap-4 mt-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-indigo-700 text-lg">
                    {getHighlighted("name", patient.name)}
                  </h3>
                  <p className="text-gray-500 mt-1 text-base">
                    ID: {displayId(patient.id)} | Âge: {patient.age}
                  </p>
                  <p className="text-base mt-1">
                    <FaWeight className="inline mr-1" /> {patient.poids || '-'} kg / 
                    <FaRulerVertical className="inline mx-1" /> {patient.taille || '-'} m
                  </p>
                  <p className="text-base mt-1">
                    <FaUserMd className="inline mr-1" /> {patient.medecin || '-'}
                  </p>
                  <p className="text-base mt-1">
                    <FaIdCard className="inline mr-1" /> {patient.numSecu || '-'}
                  </p>
                  <p className="text-base mt-1">
                    <FaPills className="inline mr-1" /> {patient.traitement || '-'}
                  </p>
                </div>
                {patient.diagnosis?.toLowerCase().includes("critique") && (
                  <FaExclamationTriangle className="text-red-500 text-xl" />
                )}
              </div>
              
              <p className="mt-2 text-base">
                <span className="font-medium">Diagnostic:</span> {getHighlighted("diagnosis", patient.diagnosis)}
              </p>
              
              <div className="flex justify-end space-x-3 mt-3">
                <button
                  onClick={() => router.push(`/patients/dossier/${patient.id}`)}
                  className="text-indigo-600 hover:text-indigo-800 p-2"
                  title="Voir"
                >
                  <FaEye size={18} />
                </button>
                <button
                  onClick={() => router.push(`/patients/modifier/${patient.id}`)}
                  className="text-yellow-600 hover:text-yellow-800 p-2"
                  title="Modifier"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="text-red-600 hover:text-red-800 p-2"
                  title="Supprimer"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {notification && (
          <Notification message={notification} onClose={() => setNotification("")} />
        )}
      </div>
      <PrintView patients={filteredPatients} />
    </div>
  );
}