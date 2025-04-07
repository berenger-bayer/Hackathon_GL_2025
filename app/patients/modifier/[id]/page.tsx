"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ModifierPatientPage() {
  const router = useRouter();
  const { id } = useParams();
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    diagnosis: "",
    photo: "", // Photo du patient
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
        return res.json(); // Si la réponse est OK, la traiter comme du JSON
      })
      .then((data) => {
        // Vérification de la validité des données
        if (!data || Object.keys(data).length === 0) {
          throw new Error("Données invalides ou vides reçues");
        }
        setPatient(data);
      })
      .catch((err) => {
        console.error("Erreur chargement patient:", err);
        alert(`Erreur lors du chargement des données: ${err.message}`);
        router.push("/patients");
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/patients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
      });

      if (!res.ok) {
        const errorText = await res.text(); // Récupérer le texte brut de la réponse
        if (errorText) {
          throw new Error(`Échec de la mise à jour: ${errorText}`);
        } else {
          throw new Error("Échec de la mise à jour, réponse vide du serveur.");
        }
      }

      const updatedPatient = await res.json(); // Récupérer la réponse JSON
      if (updatedPatient) {
        alert("Patient mis à jour avec succès !");
        router.push("/patients");
      } else {
        throw new Error("La réponse du serveur est vide.");
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour du patient:", err);
      alert(`Erreur lors de la mise à jour du patient: ${err.message}`);
    }
  };

  const handleCancel = () => {
    router.push("/patients"); // Retour à la liste des patients
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* En-tête avec le nom de l'application, de l'hôpital, etc. */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-indigo-600">Modifier Patient</h2>
          <div className="text-gray-600">
            <p className="text-xl">Application Santé</p>
            <p>Hôpital XYZ</p>
            <p>Département de Médecine</p>
          </div>
        </div>

        {/* Fiche patient */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            {/* Photo du patient */}
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden">
                {patient.photo ? (
                  <img src={patient.photo} alt="Photo du patient" className="w-full h-full object-cover" />
                ) : (
                  <p className="text-center text-white py-12">Pas de photo</p>
                )}
              </div>
            </div>
            {/* Bouton pour changer la photo */}
            <input
              type="file"
              onChange={(e) => setPatient({ ...patient, photo: URL.createObjectURL(e.target.files[0]) })}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Nom</label>
              <input
                type="text"
                name="name"
                value={patient.name}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-md"
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
                className="w-full border p-3 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Diagnostic</label>
              <textarea
                name="diagnosis"
                value={patient.diagnosis}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Enregistrer les modifications
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="ml-4 w-full bg-gray-400 text-white py-3 rounded-md hover:bg-gray-500 transition"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
