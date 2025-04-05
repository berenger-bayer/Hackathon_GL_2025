"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      {/* Contenu principal */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
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

        <div className="w-full max-w-3xl mb-8">
          <Image
            src="/med.png" // ✅ Ajoute une image dans public/kidney-care.svg
            alt="Illustration médicale"
            width={600}
            height={400}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>

        <motion.div
          className="flex flex-col md:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Link
            href="/patients"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition text-center"
          >
            Accéder aux Patients
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-500 hover:text-white transition text-center"
          >
            En savoir plus
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 text-center text-sm text-gray-600">
        <div className="max-w-4xl mx-auto px-4">
          <p>
            © {new Date().getFullYear()} AI4CKD - Plateforme de gestion intelligente des patients atteints de maladie rénale chronique.
          </p>
          <p className="mt-1">
            Développé avec ❤️ pour améliorer le suivi médical.
          </p>
        </div>
      </footer>
    </div>
  );
}
