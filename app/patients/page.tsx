"use client";

import React, { JSX } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  FaPlus, FaEdit, FaTrash, FaPrint, FaEye, FaExclamationTriangle, 
  FaSearch, FaSort, FaFilter, FaWeight, FaIdCard, 
  FaHeartbeat, 
  FaNotesMedical, FaVenus, FaMars, FaTransgender, FaBirthdayCake 
} from "react-icons/fa";
import Notification from "../components/Notification";
import Navbar from "../components/Navbar";

type Patient = {
  id: string;
  name: string;
  age: number;
  sexe: 'M' | 'F' | 'Autre' | string;
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
  const [expandedPatient, setExpandedPatient] = useState<string | null>(null);
  const router = useRouter();

  
    
  const loadPatients = () => {
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
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      loadPatients();
    }
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce patient ?")) {
      try {
        const res = await fetch(`/api/patients/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error(`Erreur suppression patient: ${res.status}`);
        loadPatients();
        setNotification("Patient supprimé avec succès");
      } catch (error) {
        console.error("Erreur suppression patient:", error);
        setNotification("Erreur lors de la suppression");
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const togglePatientExpand = (id: string) => {
    setExpandedPatient(expandedPatient === id ? null : id);
  };

  const filteredPatients = [...patients]
    .filter((patient) => {
      const value = patient[filterKey];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      const valueA = a[filterKey];
      const valueB = b[filterKey];
      
      if (valueA === null && valueB === null) return 0;
      if (valueA === null) return sortAsc ? 1 : -1;
      if (valueB === null) return sortAsc ? -1 : 1;
      
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortAsc
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      
      return sortAsc
        ? (valueA as any) - (valueB as any)
        : (valueB as any) - (valueA as any);
    });

  const calculateIMC = (poids: number | null, taille: number | null) => {
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
  

  const renderSexe = (sexe: string) => {
    switch (sexe?.toUpperCase()) {
      case 'M':
        return <span className="flex items-center text-blue-600"><FaMars className="mr-1 print:hidden" /> Masculin</span>;
      case 'F':
        return <span className="flex items-center text-pink-600"><FaVenus className="mr-1 print:hidden" /> Féminin</span>;
      case 'AUTRE':
        return <span className="flex items-center text-purple-600"><FaTransgender className="mr-1 print:hidden" /> Autre</span>;
      default:
        return <span className="text-gray-500">Non spécifié</span>;
    }
  };

  const getHighlighted = (key: keyof Patient, value: string | number | null): JSX.Element | string => {
    if (value === null) return "-";
    const text = String(value);
    if (filterKey === key && search) {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: text.replace(
              new RegExp(`(${search})`, "gi"),
              `<mark class="bg-yellow-300">$1</mark>`
            ),
          }}
        />
      );
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 text-black">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 print:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">
              Gestion des Patients
            </h1>
            <p className="text-gray-500 mt-1 text-lg">
              {filteredPatients.length} patient(s) trouvé(s)
            </p>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <button
              onClick={() => router.push("/patients/ajouter")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-4 py-2 rounded-lg transition text-lg shadow-md"
            >
              <FaPlus /> Nouveau patient
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition text-lg shadow-md"
            >
              <FaPrint /> Imprimer
            </button>
          </div>
        </motion.div>

        {/* Print-only header */}
        <div className="hidden print:block print-header p-4 border-b mb-4">
          <h1 className="text-2xl font-bold text-center">Liste des Patients</h1>
          <p className="text-center text-gray-600">
            Généré le {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>

        {/* Print-only table */}
        <div className="hidden print:block mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-800">
                <th className="py-2 px-4 text-left">N°</th>
                <th className="py-2 px-4 text-left">Nom</th>
                <th className="py-2 px-4 text-left">Sexe</th>
                <th className="py-2 px-4 text-left">Diagnostic</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={patient.id} className="border-b border-gray-200">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{patient.name}</td>
                  <td className="py-2 px-4">
                    {patient.sexe === 'M' ? 'Masculin' : 
                     patient.sexe === 'F' ? 'Féminin' : 
                     patient.sexe === 'Autre' ? 'Autre' : 'Non spécifié'}
                  </td>
                  <td className="py-2 px-4">{patient.diagnosis || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden print:shadow-none print:rounded-none"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="overflow-x-auto print:hidden">
            {filteredPatients.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Aucun patient trouvé. Essayez de modifier vos critères de recherche.
              </div>
            ) : (
              <div className="space-y-4 p-4">
                {filteredPatients.map((patient) => {
                  const imc = calculateIMC(patient.poids, patient.taille);
                  const isExpanded = expandedPatient === patient.id;
                  const isCritical = patient.diagnosis?.toLowerCase().includes("critique");

                  return (
                    <div 
                      key={patient.id} 
                      className={`border rounded-lg overflow-hidden transition-all duration-300 ${isCritical ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                    >
                      <div 
                        className={`p-4 cursor-pointer flex justify-between items-center ${isCritical ? "bg-red-100" : "bg-gray-50"}`}
                        onClick={() => togglePatientExpand(patient.id)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCritical ? "bg-red-200 text-red-700" : "bg-blue-100 text-blue-700"}`}>
                            {patient.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">
                              {patient.name}
                              {isCritical && <FaExclamationTriangle className="ml-2 inline text-red-600" />}
                            </h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                              <span><FaBirthdayCake className="inline mr-1" /> {patient.age} ans</span>
                              {renderSexe(patient.sexe)}
                              {patient.groupeSanguin && (
                                <span><FaHeartbeat className="inline mr-1" /> {patient.groupeSanguin}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{patient.diagnosis}</div>
                          <div className="text-sm text-gray-500">
                            {patient.rendezvous ? formatDate(patient.rendezvous) : "Pas de RDV"}
                          </div>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-4 border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-blue-700 flex items-center">
                              <FaNotesMedical className="mr-2" /> Informations médicales
                            </h4>
                            <div className="space-y-1 text-sm">
                              <div>
                                <span className="font-medium">Sexe:</span> {renderSexe(patient.sexe)}
                              </div>
                              <div>
                                <span className="font-medium">Diagnostic:</span> {patient.diagnosis || "-"}
                              </div>
                              <div>
                                <span className="font-medium">Traitement:</span> {patient.traitement || "-"}
                              </div>
                              <div>
                                <span className="font-medium">Allergies:</span> {patient.allergies || "Aucune"}
                              </div>
                              <div>
                                <span className="font-medium">Notes:</span> {patient.notes || "-"}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-semibold text-blue-700 flex items-center">
                              <FaWeight className="mr-2" /> Détails physiques
                            </h4>
                            <div className="space-y-1 text-sm">
                              <div>
                                <span className="font-medium">Poids:</span> {patient.poids ? `${patient.poids} kg` : "-"}
                              </div>
                              <div>
                                <span className="font-medium">Taille:</span> {patient.taille ? `${patient.taille} m` : "-"}
                              </div>
                              <div>
                                <span className="font-medium">IMC:</span>{" "}
                                {imc.value ? (
                                  <span className={`font-medium ${imc.color}`}>
                                    {imc.value} <span className="text-xs font-normal">({imc.status})</span>
                                  </span>
                                ) : "-"}
                              </div>
                              <div>
                                <span className="font-medium">Groupe sanguin:</span> {patient.groupeSanguin || "-"}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-semibold text-blue-700 flex items-center">
                              <FaIdCard className="mr-2" /> Informations administratives
                            </h4>
                            <div className="space-y-1 text-sm">
                              <div>
                                <span className="font-medium">ID:</span> {patient.id}
                              </div>
                              <div>
                                <span className="font-medium">N° Sécurité Sociale:</span> {patient.numSecu || "-"}
                              </div>
                              <div>
                                <span className="font-medium">Médecin traitant:</span> {patient.medecin || "-"}
                              </div>
                              <div>
                                <span className="font-medium">Prochain RDV:</span> {formatDate(patient.rendezvous)}
                              </div>
                              <div>
                                <span className="font-medium">Date création:</span> {formatDate(patient.createdAt)}
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-3 flex justify-end space-x-2 pt-4 border-t">
                            <button
                              onClick={() => router.push(`/patients/dossier/${patient.id}`)}
                              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                            >
                              <FaEye /> Voir dossier
                            </button>
                            <button
                              onClick={() => router.push(`/patients/modifier/${patient.id}`)}
                              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
                            >
                              <FaEdit /> Modifier
                            </button>
                            <button
                              onClick={() => handleDelete(patient.id)}
                              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                            >
                              <FaTrash /> Supprimer
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>

        {notification && (
          <Notification message={notification} onClose={() => setNotification("")} />
        )}

        <style jsx global>{`
          @media print {
            body {
              background: white !important;
              font-size: 12pt;
              color: black;
            }
            
            .print\\:hidden {
              display: none !important;
            }
            
            .hidden.print\\:block {
              display: block !important;
            }
            
            .print-header {
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 2px solid #000;
            }
            nav { 
                  display: none !important;
                }
                
            table {
              width: 100%;
              border-collapse: collapse;
            }
            
            th {
              text-align: left;
              font-weight: bold;
              border-bottom: 1px solid #000;
              padding: 8px;
            }
            
            td {
              padding: 8px;
              border-bottom: 1px solid #ddd;
            }
            
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
          }
        `}</style>
      </div>
    </div>
  );
}