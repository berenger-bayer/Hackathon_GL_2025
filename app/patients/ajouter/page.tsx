"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserPlus, FaUser, FaBirthdayCake, FaNotesMedical, FaCheckCircle, FaWeight, FaRulerVertical, FaIdCard, FaUserMd, FaPills } from "react-icons/fa";

export default function AjouterPatientPage() {
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    diagnosis: "",
    poids: "",
    taille: "",
    traitement: "",
    numSecu: "",
    medecin: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleAddPatient = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (parseInt(newPatient.age) < 0 || parseInt(newPatient.age) > 120) {
      alert("L'âge doit être compris entre 0 et 120 ans.");
      setIsSubmitting(false);
      return;
    }

    if (newPatient.name.trim().length < 2) {
      alert("Le nom doit contenir au moins 2 caractères.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newPatient,
          name: newPatient.name.trim(),
          age: parseInt(newPatient.age),
          diagnosis: newPatient.diagnosis.trim(),
          poids: newPatient.poids ? parseFloat(newPatient.poids) : null,
          taille: newPatient.taille ? parseFloat(newPatient.taille) : null
        }),
      });

      if (res.ok) {
        setShowSuccess(true);
        setNewPatient({
          name: "",
          age: "",
          diagnosis: "",
          poids: "",
          taille: "",
          traitement: "",
          numSecu: "",
          medecin: ""
        });
        
        setTimeout(() => {
          setShowSuccess(false);
          router.push("/patients");
        }, 3000);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Erreur lors de l'ajout du patient.");
      }
    } catch (error) {
      console.error("Erreur serveur:", error);
      alert("Erreur de connexion au serveur. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const commonDiagnoses = [
    "Hypertension artérielle",
    "Diabète de type 2",
    "Glomérulonéphrite chronique",
    "Polykystose rénale",
    "Insuffisance rénale aiguë",
    "Insuffisance rénale chronique",
    "Lupus érythémateux systémique",
    "Néphropathie diabétique",
    "Syndrome néphrotique",
    "Infection urinaire"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4 relative">
      {/* Notification de succès */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
              <FaCheckCircle className="text-xl" />
              <span>Patient ajouté avec succès ! Redirection en cours...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carte principale avec animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* En-tête coloré */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <div className="flex items-center justify-center space-x-3">
              <FaUserPlus className="text-2xl" />
              <motion.h1 
                className="text-2xl font-bold"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Nouveau Patient
              </motion.h1>
            </div>
            <motion.p 
              className="mt-2 opacity-90 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Renseignez les informations du patient
            </motion.p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleAddPatient} className="p-6 space-y-6">
            {/* Section Informations personnelles */}
            <div className="space-y-4 border-b pb-6">
              <h3 className="text-lg font-semibold text-blue-600 flex items-center">
                <FaUser className="mr-2" />
                Informations personnelles
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Champ Nom */}
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700">
                    <FaUser className="mr-2 text-blue-500" />
                    Nom complet
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Jean Dupont"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                    required
                    minLength={2}
                  />
                </div>

                {/* Champ Âge */}
                <div className="space-y-2">
                  <label htmlFor="age" className="flex items-center text-sm font-medium text-gray-700">
                    <FaBirthdayCake className="mr-2 text-blue-500" />
                    Âge
                  </label>
                  <input
                    id="age"
                    type="number"
                    placeholder="45"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                    required
                    min="0"
                    max="120"
                  />
                </div>

                {/* Champ Numéro de sécurité sociale */}
                <div className="space-y-2">
                  <label htmlFor="numSecu" className="flex items-center text-sm font-medium text-gray-700">
                    <FaIdCard className="mr-2 text-blue-500" />
                    N° Sécurité Sociale
                  </label>
                  <input
                    id="numSecu"
                    type="text"
                    placeholder="1 85 06 75 115 036 94"
                    value={newPatient.numSecu}
                    onChange={(e) => setNewPatient({ ...newPatient, numSecu: e.target.value })}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                  />
                </div>

                {/* Champ Médecin traitant */}
                <div className="space-y-2">
                  <label htmlFor="medecin" className="flex items-center text-sm font-medium text-gray-700">
                    <FaUserMd className="mr-2 text-blue-500" />
                    Médecin traitant
                  </label>
                  <input
                    id="medecin"
                    type="text"
                    placeholder="Dr. Martin Dupont"
                    value={newPatient.medecin}
                    onChange={(e) => setNewPatient({ ...newPatient, medecin: e.target.value })}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Section Informations médicales */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-600 flex items-center">
                <FaNotesMedical className="mr-2" />
                Informations médicales
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Champ Taille */}
                <div className="space-y-2">
                  <label htmlFor="taille" className="flex items-center text-sm font-medium text-gray-700">
                    <FaRulerVertical className="mr-2 text-blue-500" />
                    Taille (m)
                  </label>
                  <input
                    id="taille"
                    type="number"
                    step="0.01"
                    placeholder="1.75"
                    value={newPatient.taille}
                    onChange={(e) => setNewPatient({ ...newPatient, taille: e.target.value })}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                    min="0.5"
                    max="2.5"
                  />
                </div>

                {/* Champ Poids */}
                <div className="space-y-2">
                  <label htmlFor="poids" className="flex items-center text-sm font-medium text-gray-700">
                    <FaWeight className="mr-2 text-blue-500" />
                    Poids (kg)
                  </label>
                  <input
                    id="poids"
                    type="number"
                    step="0.1"
                    placeholder="70.5"
                    value={newPatient.poids}
                    onChange={(e) => setNewPatient({ ...newPatient, poids: e.target.value })}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                    min="2"
                    max="300"
                  />
                </div>

                {/* Champ Diagnostic */}
                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="diagnosis" className="flex items-center text-sm font-medium text-gray-700">
                    <FaNotesMedical className="mr-2 text-blue-500" />
                    Diagnostic principal
                  </label>
                  <div className="relative">
                    <input
                      list="diagnosis-options"
                      id="diagnosis"
                      type="text"
                      placeholder="Sélectionnez ou saisissez..."
                      value={newPatient.diagnosis}
                      onChange={(e) => setNewPatient({ ...newPatient, diagnosis: e.target.value })}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                      required
                    />
                    <datalist id="diagnosis-options">
                      {commonDiagnoses.map((diagnosis, index) => (
                        <option key={index} value={diagnosis} />
                      ))}
                    </datalist>
                  </div>
                </div>

                {/* Champ Traitement */}
                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="traitement" className="flex items-center text-sm font-medium text-gray-700">
                    <FaPills className="mr-2 text-blue-500" />
                    Traitement prescrit
                  </label>
                  <textarea
                    id="traitement"
                    placeholder="Détails du traitement..."
                    value={newPatient.traitement}
                    onChange={(e) => setNewPatient({ ...newPatient, traitement: e.target.value })}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Bouton de soumission */}
            <div className="pt-4">
              <motion.button
                type="submit"
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    En cours...
                  </>
                ) : (
                  "Ajouter le patient"
                )}
              </motion.button>
            </div>
          </form>
        </div>

        {/* Lien de retour */}
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition"
          >
            ← Retour à la liste des patients
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}