"use client";

import { useEffect, useState } from "react";

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

  if (loading) return <p className="text-center mt-10">Chargement des statistiques...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        📊 Tableau de bord – Statistiques Globales
      </h1>

      {/* Bloc statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-white rounded-2xl shadow flex flex-col items-center justify-center">
          <h2 className="text-sm font-semibold text-gray-500">Total Patients</h2>
          <p className="text-4xl font-bold text-blue-600">{stats?.totalPatients}</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow flex flex-col items-center justify-center">
          <h2 className="text-sm font-semibold text-gray-500">Âge Moyen</h2>
          <p className="text-4xl font-bold text-green-600">
            {Number.isFinite(stats?.averageAge) ? stats.averageAge.toFixed(1) : "N/A"}
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow flex flex-col items-center justify-center">
          <h2 className="text-sm font-semibold text-gray-500">Types de diagnostics</h2>
          <p className="text-4xl font-bold text-purple-600">
            {stats?.diagnoses?.length || 0}
          </p>
        </div>
      </div>

      {/* Tableau des diagnostics */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Répartition des diagnostics</h2>
        {stats?.diagnoses && stats.diagnoses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border-b">Diagnostic</th>
                  <th className="px-4 py-2 border-b">Nombre de cas</th>
                </tr>
              </thead>
              <tbody>
                {stats.diagnoses.map((d) => (
                  <tr key={d.diagnosis} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{d.diagnosis}</td>
                    <td className="px-4 py-2 border-b font-semibold text-blue-600">{d._count.diagnosis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">Aucun diagnostic trouvé.</p>
        )}
      </div>
    </div>
  );
}
