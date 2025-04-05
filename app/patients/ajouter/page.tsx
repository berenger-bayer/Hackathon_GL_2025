"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AjouterPatientPage() {
  const [newPatient, setNewPatient] = useState({ name: "", age: "", diagnosis: "" });
  const router = useRouter();

  const handleAddPatient = async (patient) => {
    if (patient.age < 0) {
      alert("L'âge ne peut pas être négatif.");
      return;
    }
  
    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });
  
      if (res.ok) {
        alert("Patient ajouté avec succès !");
        router.push("/patients");
      } else {
        const errorText = await res.text(); // Récupérer le message d'erreur brut
        console.error("Erreur ajout patient:", errorText); // Afficher l'erreur
      }
    } catch (error) {
      console.error("Erreur serveur lors de l'ajout:", error);
    }
  };
  

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Ajouter un patient</h1>

      <form onSubmit={handleAddPatient}>
        <input
          type="text"
          placeholder="Nom"
          value={newPatient.name}
          onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
          className="border p-2 mb-2"
        />
        <input
          type="number"
          placeholder="Âge"
          value={newPatient.age}
          onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
          className="border p-2 mb-2"
        />
        <input
          type="text"
          placeholder="Diagnostic"
          value={newPatient.diagnosis}
          onChange={(e) => setNewPatient({ ...newPatient, diagnosis: e.target.value })}
          className="border p-2 mb-2"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Ajouter Patient
        </button>
      </form>
    </div>
  );
}
