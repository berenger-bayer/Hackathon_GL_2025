"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || pathname === "/login") return null;

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <nav className="p-6 h-20 bg-white bg-opacity-80 backdrop-blur-md text-black fixed w-full top-0 z-50 flex justify-between items-center shadow-md">
      <div className="flex gap-8 px-6 text-lg font-medium">
        <a href="/" className="hover:underline">🏠 Accueil</a>
        <a href="/patients" className="hover:underline">🧑‍⚕️ Patients</a>
        <a href="/dashboard" className="hover:underline">📊 Tableau de Bord</a>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg shadow transition"
      >
        🔒 Déconnexion
      </button>
    </nav>
  );
}
