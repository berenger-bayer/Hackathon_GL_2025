"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Stats = {
  totalPatients: number;
  averageAge: number;
  diagnoses: { diagnosis: string; _count: { diagnosis: number } }[];
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur de récupération des statistiques :", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Chargement des statistiques...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10">
        📊 Tableau de bord – Statistiques Globales
      </h1>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center">
          <h2 className="text-sm text-gray-500 mb-2">Total Patients</h2>
          <p className="text-4xl font-bold text-blue-600">{stats?.totalPatients}</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center">
          <h2 className="text-sm text-gray-500 mb-2">Âge Moyen</h2>
          <p className="text-4xl font-bold text-green-600">
            {Number.isFinite(stats?.averageAge) ? stats.averageAge.toFixed(1) : "N/A"}
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center">
          <h2 className="text-sm text-gray-500 mb-2">Types de diagnostics</h2>
          <p className="text-4xl font-bold text-purple-600">
            {stats?.diagnoses?.length || 0}
          </p>
        </div>
      </div>

                {/* Tableau des diagnostics */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              📋 Répartition des diagnostics
            </h2>

            {stats?.diagnoses && stats.diagnoses.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-left text-sm sm:text-base">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 border-b whitespace-nowrap">Diagnostic</th>
                      <th className="px-4 py-3 border-b whitespace-nowrap">Nombre de cas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.diagnoses.map((d) => (
                      <tr key={d.diagnosis} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 border-b text-gray-700">{d.diagnosis}</td>
                        <td className="px-4 py-3 border-b font-semibold text-blue-600">
                          {d._count.diagnosis}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">Aucun diagnostic trouvé.</p>
            )}
          </div>

    </motion.div>
  );
}
