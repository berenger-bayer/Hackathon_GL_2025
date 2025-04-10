"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaSave, FaTimes, FaUser, FaNotesMedical, FaWeight, FaRulerVertical, FaIdCard, FaUserMd,FaCheckCircle } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

export default function EditPatientPage() {
  const router = useRouter();
  const { id } = useParams();
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    sexe: "",
    diagnosis: "",
    poids: "",
    taille: "",
    traitement: "",
    numSecu: "",
    medecin: "",
    allergies: "",
    groupeSanguin: "",
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await fetch(`/api/patients/${id}`);
        if (!res.ok) throw new Error("Erreur lors de la récupération des données");
        
        const data = await res.json();
        setPatient({
          name: data.name || "",
          age: data.age || "",
          sexe: data.sexe || "",
          diagnosis: data.diagnosis || "",
          poids: data.poids ?? "",
          taille: data.taille ?? "",
          traitement: data.traitement ?? "",
          numSecu: data.numSecu ?? "",
          medecin: data.medecin ?? "",
          allergies: data.allergies ?? "",
          groupeSanguin: data.groupeSanguin ?? "",
        });
      } catch (err) {
        console.error("Erreur chargement patient:", err);
        alert(err.message);
        router.push(`/patients/${id}`);
      }
    };

    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`/api/patients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...patient,
          age: parseInt(patient.age),
          poids: patient.poids ? parseFloat(patient.poids) : null,
          taille: patient.taille ? parseFloat(patient.taille) : null
        }),
      });

      if (!res.ok) throw new Error("Échec de la mise à jour");
      
      toast.success("Modifications enregistrées avec succès!", {
        duration: 4000,
        position: "top-center",
        // eslint-disable-next-line react/jsx-no-undef
        icon: <FaCheckCircle className="text-green-500" />,
      });
      
      router.push(`/patients/?updated=true`);
    } catch (err) {
      console.error("Erreur mise à jour:", err);
      alert(err.message);
    }
  };

  const handleCancel = () => {
    router.push('/patients');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-black">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-700 p-6 text-white">
          <h1 className="text-2xl font-bold">Modification du dossier patient</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Section 1: Informations personnelles */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-blue-50 p-4 border-b flex items-center">
              <FaUser className="text-blue-700 mr-2" />
              <h2 className="text-xl font-semibold text-blue-800">Informations personnelles</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet*</label>
                <input
                  type="text"
                  name="name"
                  value={patient.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Âge*</label>
                <input
                  type="number"
                  name="age"
                  value={patient.age}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sexe</label>
                <select
                  name="sexe"
                  value={patient.sexe}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Sélectionner</option>
                  <option value="Masculin">Masculin</option>
                  <option value="Féminin">Féminin</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">N° Sécurité Sociale</label>
                <div className="relative">
                  <FaIdCard className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="numSecu"
                    value={patient.numSecu}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Groupe sanguin</label>
                <select
                  name="groupeSanguin"
                  value={patient.groupeSanguin}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Inconnu</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              
            </div>
          </div>

          {/* Section 2: Informations médicales */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-blue-50 p-4 border-b flex items-center">
              <FaNotesMedical className="text-blue-700 mr-2" />
              <h2 className="text-xl font-semibold text-blue-800">Informations médicales</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Taille (m)</label>
                <div className="relative">
                  <FaRulerVertical className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="number"
                    name="taille"
                    value={patient.taille}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poids (kg)</label>
                <div className="relative">
                  <FaWeight className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="number"
                    name="poids"
                    value={patient.poids}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Médecin traitant</label>
                <div className="relative">
                  <FaUserMd className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="medecin"
                    value={patient.medecin}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergies connues</label>
                <textarea
                  name="allergies"
                  value={patient.allergies}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnostic principal*</label>
                <textarea
                  name="diagnosis"
                  value={patient.diagnosis}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Traitement prescrit</label>
                <textarea
                  name="traitement"
                  value={patient.traitement}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center"
            >
              <FaTimes className="mr-2" />
              Annuler
            </button>
            
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              <FaSave className="mr-2" />
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}