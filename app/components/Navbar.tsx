"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || pathname === "/login") return null;

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <nav className="bg-white bg-opacity-80 backdrop-blur-md shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        <div className="text-lg font-bold text-blue-700">🩺 Suivi Médical</div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-lg text-black font-medium items-center">
          <a href="/" className="hover:underline">🏠 Accueil</a>
          <a href="/patients" className="hover:underline">🧑‍⚕️ Patients</a>
          <a href="/dashboard" className="hover:underline">📊 Tableau de Bord</a>

          <button
            onClick={handleLogout}
            className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg shadow transition"
          >
            🔒 Déconnexion
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-blue-700">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white bg-opacity-95 backdrop-blur-md px-4 py-6 flex flex-col gap-4 shadow-lg">
          <a href="/" className="text-lg text-black" onClick={() => setMenuOpen(false)}>🏠 Accueil</a>
          <a href="/patients" className="text-lg text-black" onClick={() => setMenuOpen(false)}>🧑‍⚕️ Patients</a>
          <a href="/dashboard" className="text-lg text-black" onClick={() => setMenuOpen(false)}>📊 Tableau de Bord</a>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg shadow transition"
          >
            🔒 Déconnexion
          </button>
        </div>
      )}
    </nav>
  );
}
