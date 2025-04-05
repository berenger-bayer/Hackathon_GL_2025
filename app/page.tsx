"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <motion.h1 
        className="text-4xl font-bold text-blue-600 mb-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Bienvenue sur AI4CKD
      </motion.h1>
      <p className="text-lg text-gray-700 text-center mb-6 max-w-2xl">
        Une plateforme intelligente pour la gestion des patients atteints de maladies rénales chroniques.
        Suivez, analysez et optimisez le suivi médical facilement.
      </p>
      
      <motion.div 
        className="flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Link href="/patients" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          Accéder aux Patients
        </Link>
        <Link href="/about" className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-500 hover:text-white transition">
          En savoir plus
        </Link>
      </motion.div>
    </div>
  );
}
