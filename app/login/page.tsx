"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "medecin123";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Vérifier si l'utilisateur vient d'être déconnecté
    const logoutFlag = sessionStorage.getItem("justLoggedOut");
    
    if (logoutFlag === "true") {
      // Supprimer le flag de déconnexion
      sessionStorage.removeItem("justLoggedOut");
      setIsLoading(false);
      return; // Ne pas rediriger, forcer la connexion
    }
    
    // Vérifier si l'utilisateur est connecté
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.push("/"); // Redirection si déjà connecté
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/");
    } else {
      alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
  };

  // Afficher un état de chargement pendant la vérification
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
        <div className="text-center">
          <div className="spinner-border text-blue-600" role="status">
            <span className="sr-only">Chargement...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-2 text-center text-blue-600">
          Connexion Administrateur
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Bienvenue sur le projet de gestion des patients réalisé par notre groupe. <br />
          <span className="font-medium text-gray-800">
            Utilisateur : <code className="bg-gray-200 px-1 rounded">{DEFAULT_USERNAME}</code><br />
            Mot de passe : <code className="bg-gray-200 px-1 rounded">{DEFAULT_PASSWORD}</code>
          </span>
        </p>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-6"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}