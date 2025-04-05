"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <motion.h1 
        className="text-3xl font-bold text-blue-600 mb-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        À propos de AI4CKD
      </motion.h1>
      <p className="text-lg text-gray-700 text-center max-w-3xl mb-6">
        AI4CKD est une plateforme innovante dédiée à la gestion des patients atteints de maladies rénales chroniques.
        Notre objectif est de faciliter le suivi médical grâce à des outils numériques intelligents et intuitifs.
      </p>
      
      <ul className="list-disc text-gray-600 mb-6 text-lg max-w-2xl">
        <li>Suivi des patients et gestion de leurs dossiers médicaux</li>
        <li>Accès rapide aux informations médicales essentielles</li>
        <li>Interface moderne et intuitive pour les professionnels de santé</li>
      </ul>
      
      <Link href="/" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
        Retour à l accueil
      </Link>
    </div>
  );
}
