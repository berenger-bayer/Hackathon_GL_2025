"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUserPlus, 
  FaUser, 
  FaBirthdayCake, 
  FaNotesMedical, 
  FaCheckCircle, 
  FaWeight, 
  FaRulerVertical, 
  FaIdCard, 
  FaUserMd, 
  FaPills,
  FaArrowLeft,
  FaExclamationTriangle
} from "react-icons/fa";

export default function AjouterPatientPage() {
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    sexe: "",
    diagnosis: "",
    poids: "",
    taille: "",
    traitement: "",
    numSecu: "",
    medecin: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (newPatient.name.trim().length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères";
    }

    if (!newPatient.age) {
      newErrors.age = "L'âge est requis";
    } else if (parseInt(newPatient.age) < 0 || parseInt(newPatient.age) > 120) {
      newErrors.age = "L'âge doit être compris entre 0 et 120 ans";
    }

    if (!newPatient.diagnosis.trim()) {
      newErrors.diagnosis = "Le diagnostic est requis";
    }

    if (newPatient.poids && (parseFloat(newPatient.poids) < 2 || parseFloat(newPatient.poids) > 300)) {
      newErrors.poids = "Le poids doit être compris entre 2 et 300 kg";
    }

    if (newPatient.taille && (parseFloat(newPatient.taille) < 0.5 || parseFloat(newPatient.taille) > 2.5)) {
      newErrors.taille = "La taille doit être comprise entre 0.5 et 2.5 m";
    }

    if (newPatient.numSecu && !/^\d{1}( \d{2}){5}( \d{2})?$/.test(newPatient.numSecu)) {
      newErrors.numSecu = "Format invalide (ex: 1 85 06 75 115 036 94)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddPatient = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

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
          sexe: newPatient.sexe || null,
          diagnosis: newPatient.diagnosis.trim(),
          poids: newPatient.poids ? parseFloat(newPatient.poids) : null,
          taille: newPatient.taille ? parseFloat(newPatient.taille) : null
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setShowSuccess(true);
        setNewPatient({
          name: "",
          age: "",
          sexe: "",
          diagnosis: "",
          poids: "",
          taille: "",
          traitement: "",
          numSecu: "",
          medecin: ""
        });
        
        setTimeout(() => {
          setShowSuccess(false);
          // Redirection vers la fiche du nouveau patient
          router.push(`/patients/${data.id}`);
        }, 2500);
      } else {
        const errorData = await res.json();
        setErrors({ ...errors, submit: errorData.message || "Erreur lors de l'ajout du patient" });
      }
    } catch (error) {
      console.error("Erreur serveur:", error);
      setErrors({ ...errors, submit: "Erreur de connexion au serveur. Veuillez réessayer." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setNewPatient({ ...newPatient, [id]: value });
    
    if (errors[id]) {
      const newErrors = { ...errors };
      delete newErrors[id];
      setErrors(newErrors);
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

  const imc = newPatient.poids && newPatient.taille 
    ? (parseFloat(newPatient.poids) / Math.pow(parseFloat(newPatient.taille), 2)).toFixed(1)
    : null;

  let imcStatus = "";
  let imcColor = "";
  
  if (imc) {
    if (imc < 18.5) {
      imcStatus = "Insuffisance pondérale";
      imcColor = "text-blue-500";
    } else if (imc < 25) {
      imcStatus = "Poids normal";
      imcColor = "text-green-500";
    } else if (imc < 30) {
      imcStatus = "Surpoids";
      imcColor = "text-yellow-500";
    } else {
      imcStatus = "Obésité";
      imcColor = "text-red-500";
    }
  }

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => router.back()}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition"
        >
          <FaArrowLeft className="mr-2" />
          <span>Retour à la liste des patients</span>
        </motion.button>
      </div>

      {/* Success notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center space-x-3">
              <FaCheckCircle className="text-2xl" />
              <span className="font-medium">Patient ajouté avec succès ! Redirection vers la fiche médicale...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error notification */}
      <AnimatePresence>
        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center space-x-3">
              <FaExclamationTriangle className="text-2xl" />
              <span className="font-medium">{errors.submit}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main container */}
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
            <motion.div 
              className="flex flex-col md:flex-row md:items-center md:justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-white/20 p-3 rounded-lg mr-4">
                  <FaUserPlus className="text-2xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Nouveau Patient</h1>
                  <p className="mt-1 opacity-90">Saisissez les informations pour créer un dossier patient</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="text-sm bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="opacity-80">Aujourdhui:</span> {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <form onSubmit={handleAddPatient} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-black">
              {/* Left column - Personal Information */}
              <div className="md:col-span-1 space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                    <FaUser className="mr-2" />
                    Informations personnelles
                  </h2>
                  
                  {/* Name field */}
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <div className={`relative ${errors.name ? 'animate-shake' : ''}`}>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        placeholder="Jean Dupont"
                        value={newPatient.name}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 border ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                        required
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                  
                  {/* Age field */}
                  <div className="mb-4">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                      Âge <span className="text-red-500">*</span>
                    </label>
                    <div className={`relative ${errors.age ? 'animate-shake' : ''}`}>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaBirthdayCake className="text-gray-400" />
                      </div>
                      <input
                        id="age"
                        type="number"
                        placeholder="45"
                        value={newPatient.age}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 border ${errors.age ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                        required
                        min="0"
                        max="120"
                      />
                    </div>
                    {errors.age && (
                      <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                    )}
                  </div>
                  
                  {/* Sexe field */}
                  <div className="mb-4">
                    <label htmlFor="sexe" className="block text-sm font-medium text-gray-700 mb-1">
                      Sexe
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <select
                        id="sexe"
                        value={newPatient.sexe}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Social Security Number */}
                  <div className="mb-4">
                    <label htmlFor="numSecu" className="block text-sm font-medium text-gray-700 mb-1">
                      N° Sécurité Sociale
                    </label>
                    <div className={`relative ${errors.numSecu ? 'animate-shake' : ''}`}>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaIdCard className="text-gray-400" />
                      </div>
                      <input
                        id="numSecu"
                        type="text"
                        placeholder="1 85 06 75 115 036 94"
                        value={newPatient.numSecu}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 border ${errors.numSecu ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                      />
                    </div>
                    {errors.numSecu && (
                      <p className="mt-1 text-sm text-red-600">{errors.numSecu}</p>
                    )}
                  </div>
                  
                  {/* Doctor field */}
                  <div className="mb-0">
                    <label htmlFor="medecin" className="block text-sm font-medium text-gray-700 mb-1">
                      Médecin traitant
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUserMd className="text-gray-400" />
                      </div>
                      <input
                        id="medecin"
                        type="text"
                        placeholder="Dr. Martin Dupont"
                        value={newPatient.medecin}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Medical Information */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                  <h2 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center">
                    <FaNotesMedical className="mr-2" />
                    Informations médicales
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Height field */}
                    <div>
                      <label htmlFor="taille" className="block text-sm font-medium text-gray-700 mb-1">
                        Taille (m)
                      </label>
                      <div className={`relative ${errors.taille ? 'animate-shake' : ''}`}>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaRulerVertical className="text-gray-400" />
                        </div>
                        <input
                          id="taille"
                          type="number"
                          step="0.01"
                          placeholder="1.75"
                          value={newPatient.taille}
                          onChange={handleInputChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.taille ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                        />
                      </div>
                      {errors.taille && (
                        <p className="mt-1 text-sm text-red-600">{errors.taille}</p>
                      )}
                    </div>
                    
                    {/* Weight field */}
                    <div>
                      <label htmlFor="poids" className="block text-sm font-medium text-gray-700 mb-1">
                        Poids (kg)
                      </label>
                      <div className={`relative ${errors.poids ? 'animate-shake' : ''}`}>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaWeight className="text-gray-400" />
                        </div>
                        <input
                          id="poids"
                          type="number"
                          step="0.1"
                          placeholder="70.5"
                          value={newPatient.poids}
                          onChange={handleInputChange}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.poids ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                        />
                      </div>
                      {errors.poids && (
                        <p className="mt-1 text-sm text-red-600">{errors.poids}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* IMC calculation card */}
                  {(newPatient.poids && newPatient.taille) && (
                    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gray-500 text-sm">Indice de masse corporelle (IMC)</span>
                          <div className="flex items-baseline mt-1">
                            <span className={`text-xl font-bold ${imcColor}`}>{imc}</span>
                            <span className="ml-2 text-sm text-gray-500">kg/m²</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${imcColor} bg-opacity-10`}>
                          {imcStatus}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Diagnosis field */}
                  <div className="mb-4">
                    <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-1">
                      Diagnostic principal <span className="text-red-500">*</span>
                    </label>
                    <div className={`relative ${errors.diagnosis ? 'animate-shake' : ''}`}>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaNotesMedical className="text-gray-400" />
                      </div>
                      <input
                        list="diagnosis-options"
                        id="diagnosis"
                        type="text"
                        placeholder="Sélectionnez ou saisissez..."
                        value={newPatient.diagnosis}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 border ${errors.diagnosis ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                        required
                      />
                      <datalist id="diagnosis-options">
                        {commonDiagnoses.map((diagnosis, index) => (
                          <option key={index} value={diagnosis} />
                        ))}
                      </datalist>
                    </div>
                    {errors.diagnosis && (
                      <p className="mt-1 text-sm text-red-600">{errors.diagnosis}</p>
                    )}
                  </div>
                  
                  {/* Treatment field */}
                  <div>
                    <label htmlFor="traitement" className="block text-sm font-medium text-gray-700 mb-1">
                      Traitement prescrit
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                        <FaPills className="text-gray-400" />
                      </div>
                      <textarea
                        id="traitement"
                        placeholder="Détails du traitement..."
                        value={newPatient.traitement}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Submit button */}
                <motion.button
                  type="submit"
                  className={`w-full flex justify-center items-center py-4 px-6 rounded-xl shadow-lg text-white font-medium text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'}`}
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enregistrement en cours...
                    </>
                  ) : (
                    <>
                      <FaUserPlus className="mr-2" />
                      Ajouter le patient
                    </>
                  )}
                </motion.button>
                
                {/* Required fields note */}
                <p className="text-center text-sm text-gray-500">
                  <span className="text-red-500">*</span> Champs obligatoires
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}