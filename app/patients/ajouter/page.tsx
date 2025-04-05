"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AjouterPatientPage() {
  const [newPatient, setNewPatient] = useState({ name: "", age: "", diagnosis: "" });
  const router = useRouter();

  const handleAddPatient = async (event: React.FormEvent) => {
    event.preventDefault(); // Empêcher le rafraîchissement de la page au submit

    // Vérification de l'âge
    if (parseInt(newPatient.age) < 0) {
      alert("L'âge ne peut pas être négatif.");
      return;
    }

    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newPatient.name,
          age: parseInt(newPatient.age),
          diagnosis: newPatient.diagnosis,
        }),
      });

      if (res.ok) {
        alert("Patient ajouté avec succès !");
        router.push("/patients"); // Rediriger vers la liste des patients après ajout
      } else {
        const errorText = await res.text();
        console.error("Erreur ajout patient:", errorText);
        alert("Erreur lors de l'ajout du patient.");
      }
    } catch (error) {
      console.error("Erreur serveur lors de l'ajout:", error);
      alert("Une erreur est survenue lors de l'ajout.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Titre avec animation */}
      <motion.h1
        className="text-3xl font-semibold text-blue-600 mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Ajouter un Patient
      </motion.h1>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <form onSubmit={handleAddPatient} className="space-y-6">
          {/* Champ Nom */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nom du Patient
            </label>
            <input
              id="name"
              type="text"
              placeholder="Nom"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Champ Âge */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Âge
            </label>
            <input
              id="age"
              type="number"
              placeholder="Âge"
              value={newPatient.age}
              onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Champ Diagnostic */}
          <div>
            <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">
              Diagnostic
            </label>
            <input
              list="diagnosis-options"
              id="diagnosis"
              type="text"
              placeholder="Commencez à taper..."
              value={newPatient.diagnosis}
              onChange={(e) => setNewPatient({ ...newPatient, diagnosis: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <datalist id="diagnosis-options">
              <option value="Hypertension artérielle" />
              <option value="Diabète de type 2" />
              <option value="Glomérulonéphrite chronique" />
              <option value="Polykystose rénale" />
              <option value="Insuffisance rénale aiguë" />
              <option value="Insuffisance rénale chronique" />
              <option value="Lupus érythémateux systémique" />
              <option value="Néphropathie diabétique" />
              <option value="Syndrome néphrotique" />
              <option value="Infection urinaire" />
            </datalist>
          </div>

          {/* Bouton d'ajout */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
              Ajouter Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
