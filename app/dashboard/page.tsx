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

  if (loading) return <p>Chargement des statistiques...</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">📊 Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-500 text-white rounded-lg">
          <h2 className="text-lg font-semibold">Total Patients</h2>
          <p className="text-3xl font-bold">{stats?.totalPatients}</p>
        </div>

        <div className="p-4 bg-green-500 text-white rounded-lg">
          <h2 className="text-lg font-semibold">Âge Moyen</h2>
          <p className="text-3xl font-bold">{stats?.averageAge.toFixed(1)}</p>
        </div>

        <div className="p-4 bg-purple-500 text-white rounded-lg">
          <h2 className="text-lg font-semibold">Diagnostics</h2>
          <ul>
            {stats?.diagnoses.map((d) => (
              <li key={d.diagnosis}>
                {d.diagnosis} : <strong>{d._count.diagnosis}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
