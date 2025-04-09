"use client";

import React, { JSX } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaPrint, FaEye, FaExclamationTriangle, FaSearch, FaSort, FaFilter, 
  FaWeight, FaRulerVertical, FaIdCard, FaUserMd, FaPills, FaCalendarAlt, FaHeartbeat, FaAllergies, FaNotesMedical } from "react-icons/fa";
import Notification from "../components/Notification";
import Navbar from "../components/Navbar";

type Patient = {
  id: string;
  name: string;
  age: number;
  sexe: string;
  diagnosis: string;
  poids: number | null;
  taille: number | null;
  traitement: string | null;
  numSecu: string | null;
  medecin: string | null;
  rendezvous: string | null;
  createdAt: string;
  notes: string | null;
  groupeSanguin: string | null;
  allergies: string | null;
};

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [filterKey, setFilterKey] = useState<keyof Patient>("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [notification, setNotification] = useState("");
  const [printMode, setPrintMode] = useState(false);
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

        const alertes = data.filter((p) =>
          p.diagnosis?.toLowerCase().includes("critique")
        );
        const maintenant = new Date();
        const dansTroisJours = new Date();
        dansTroisJours.setDate(maintenant.getDate() + 3);
        const rappels = data.filter((p) => {
          if (!p.rendezvous) return false;
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

  const handlePrint = () => {
    setPrintMode(true);
    setTimeout(() => {
      window.print();
      setPrintMode(false);
    }, 100);
  };

  const highlightMatch = (text: string, search: string) => {
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, `<mark class="bg-yellow-300">$1</mark>`);
  };

  const getHighlighted = (key: keyof Patient, value: string | number | null): JSX.Element | string => {
    if (value === null) return "-";
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
    return numericId.toString().padStart(6, "0");
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculer l'IMC pour chaque patient
  const calculateIMC = (poids: number | null, taille: number | null): { value: string | null, status: string, color: string } => {
    if (!poids || !taille) return { value: null, status: "", color: "" };
    
    const imc = (poids / Math.pow(taille, 2)).toFixed(1);
    let status = "";
    let color = "";
    
    if (parseFloat(imc) < 18.5) {
      status = "Insuffisance pondérale";
      color = "text-blue-500";
    } else if (parseFloat(imc) < 25) {
      status = "Poids normal";
      color = "text-green-500";
    } else if (parseFloat(imc) < 30) {
      status = "Surpoids";
      color = "text-yellow-500";
    } else {
      status = "Obésité";
      color = "text-red-500";
    }
    
    return { value: imc, status, color };
  };

  return (
    <div className={`min-h-screen ${printMode ? "bg-white" : "bg-gradient-to-br from-blue-50 to-indigo-50"}`}>
      {!printMode && <Navbar />}

      <div className="container mx-auto px-4 py-8 print:px-0 print:py-0">
        {!printMode && (
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-3xl font-bold text-indigo-700 print:text-black">
                Gestion des Patients
              </h1>
              <p className="text-gray-500 mt-1 text-lg print:text-black">
                {filteredPatients.length} patient(s) trouvé(s)
              </p>
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <button
                onClick={() => router.push("/patients/ajouter")}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-4 py-2 rounded-lg transition text-lg print:hidden shadow-md"
              >
                <FaPlus /> Nouveau patient
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition text-lg print:hidden shadow-md"
              >
                <FaPrint /> Imprimer
              </button>
            </div>
          </motion.div>
        )}

        {printMode && (
          <div className="print-header p-4 border-b mb-4">
            <h1 className="text-2xl font-bold text-center">Liste des Patients</h1>
            <p className="text-center text-gray-600">
              Généré le {new Date().toLocaleDateString("fr-FR")}
            </p>
          </div>
        )}

        {!printMode && (
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 mb-6 print:hidden"
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
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg text-black shadow-sm"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  value={filterKey}
                  onChange={(e) => setFilterKey(e.target.value as keyof Patient)}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg text-black shadow-sm"
                >
                  <option value="id">ID</option>
                  <option value="name">Nom</option>
                  <option value="age">Âge</option>
                  <option value="sexe">Sexe</option>
                  <option value="diagnosis">Diagnostic</option>
                  <option value="medecin">Médecin</option>
                  <option value="numSecu">N° Sécurité Sociale</option>
                  <option value="traitement">Traitement</option>
                  <option value="groupeSanguin">Groupe sanguin</option>
                  <option value="allergies">Allergies</option>
                  <option value="rendezvous">Prochain RDV</option>
                </select>
              </div>

              <button
                onClick={() => setSortAsc(!sortAsc)}
                className="flex items-center justify-center gap-2 w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-lg text-black shadow-sm"
              >
                <FaSort />
                {sortAsc ? "Croissant" : "Décroissant"}
              </button>
            </div>
          </motion.div>
        )}

        <motion.div
          className={`${printMode ? "" : "bg-white rounded-xl shadow-lg"} overflow-hidden`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="overflow-x-auto print:overflow-visible">
            <table className="min-w-full divide-y divide-gray-200 print:w-full">
              <thead className={`${printMode ? "" : "bg-gradient-to-r from-blue-50 to-indigo-50"}`}>
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-medium text-blue-700 uppercase tracking-wider print:text-black print:border-b">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-blue-700 uppercase tracking-wider print:text-black print:border-b">
                    Nom
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-blue-700 uppercase tracking-wider print:text-black print:border-b">
                    Âge/Sexe
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-blue-700 uppercase tracking-wider print:text-black print:border-b">
                    Diagnostic
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-blue-700 uppercase tracking-wider print:text-black print:border-b">
                    <div className="flex items-center">
                      <FaWeight className="mr-1" /> / <FaRulerVertical className="ml-1" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-blue-700 uppercase tracking-wider print:text-black print:border-b">
                    IMC
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-blue-700 uppercase tracking-wider print:text-black print:border-b">
                    <div className="flex items-center">
                      <FaUserMd className="mr-1" title="Médecin traitant" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-blue-700 uppercase tracking-wider print:text-black print:border-b">
                    <div className="flex items-center">
                      <FaIdCard className="mr-1" title="N° Sécurité Sociale" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-blue-700 uppercase tracking-wider print:text-black print:border-b">
                    <div className="flex items-center">
                      <FaPills className="mr-1" title="Traitement" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-blue-700 uppercase tracking-wider print:text-black print:border-b">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1" title="Prochain RDV" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-blue-700 uppercase tracking-wider print:text-black print:border-b">
                    <div className="flex items-center">
                      <FaHeartbeat className="mr-1" title="Groupe sanguin" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-blue-700 uppercase tracking-wider print:text-black print:border-b">
                    <div className="flex items-center">
                      <FaAllergies className="mr-1" title="Allergies" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-blue-700 uppercase tracking-wider print:text-black print:border-b">
                    <div className="flex items-center">
                      <FaNotesMedical className="mr-1" title="Notes" />
                    </div>
                  </th>
                  {!printMode && (
                    <th className="px-6 py-4 text-right text-lg font-medium text-blue-700 uppercase tracking-wider print:text-black print:border-b no-print">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => {
                  const imc = calculateIMC(patient.poids, patient.taille);
                  return (
                    <tr key={patient.id} className="hover:bg-gray-50 transition print:border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900 print:border-b">
                        {displayId(patient.id)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500 print:border-b">
                        {getHighlighted("name", patient.name)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500 print:border-b">
                        {getHighlighted("age", patient.age)} / {getHighlighted("sexe", patient.sexe || "-")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500 print:border-b">
                        <div className="flex items-center">
                          {getHighlighted("diagnosis", patient.diagnosis)}
                          {patient.diagnosis?.toLowerCase().includes("critique") && (
                            <FaExclamationTriangle className="ml-2 text-red-500 print:text-black" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500 print:border-b">
                        {patient.poids ? `${patient.poids} kg` : "-"} /{" "}
                        {patient.taille ? `${patient.taille} m` : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg print:border-b">
                        {imc.value ? (
                          <span className={`font-medium ${imc.color}`}>
                            {imc.value} <span className="text-xs font-normal">({imc.status})</span>
                          </span>
                        ) : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500 print:border-b">
                        {getHighlighted("medecin", patient.medecin || "-")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500 print:border-b">
                        {getHighlighted("numSecu", patient.numSecu || "-")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500 print:border-b">
                        {patient.traitement
                          ? patient.traitement.length > 20
                            ? `${patient.traitement.substring(0, 20)}...`
                            : patient.traitement
                          : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500 print:border-b">
                        {formatDate(patient.rendezvous)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500 print:border-b">
                        {getHighlighted("groupeSanguin", patient.groupeSanguin || "-")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500 print:border-b">
                        {getHighlighted("allergies", patient.allergies || "-")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500 print:border-b">
                        {patient.notes 
                          ? patient.notes.length > 20 
                            ? `${patient.notes.substring(0, 20)}...` 
                            : patient.notes 
                          : "-"}
                      </td>
                      {!printMode && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-medium no-print">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => router.push(`/patients/dossier/${patient.id}`)}
                              className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition"
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
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {filteredPatients.length === 0 && (
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8 text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500 text-lg">
              Aucun patient trouvé. Essayez de modifier vos critères de recherche.
            </p>
          </motion.div>
        )}

        {notification && !printMode && (
          <Notification message={notification} onClose={() => setNotification("")} />
        )}

        {/* Styles d'impression */}
        <style jsx global>{`
          @media print {
            body {
              background: white;
              font-size: 12pt;
            }
            .no-print {
              display: none !important;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 8px 12px;
              border: 1px solid #ddd;
            }
            th {
              background-color: #f5f5f5;
              text-align: left;
            }
            .print-header {
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 2px solid #000;
            }
          }
        `}</style>
      </div>
    </div>
  );
}