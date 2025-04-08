"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-blue-600 text-xl font-bold">AI4CKD</span>
              <Image 
                src="/logo-maladie-renale.svg" 
                alt="Logo" 
                width={52} 
                height={32} 
                className="ml-2"
                priority
              />
            </Link>
          </div>
          
          {/* Menu mobile */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
          
          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            <Link href="/patients" className="px-2 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 transition whitespace-nowrap">
              Patients
            </Link>
            <Link href="/dashboard" className="px-2 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 transition whitespace-nowrap">
              Tableau de bord
            </Link>
            <Link href="/about" className="px-2 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 transition whitespace-nowrap">
              À propos
            </Link>
            <Link 
              href="/login" 
              className="ml-2 px-3 py-2 text-sm lg:text-base bg-red-500 text-white rounded-md hover:bg-blue-700 transition whitespace-nowrap"
            >
              Deconnexion
            </Link>
          </div>
        </div>
      </div>
      
      {/* Menu mobile ouvert */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/patients" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Patients
            </Link>
            <Link 
              href="/dashboard" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Tableau de bord
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <Link 
              href="/login" 
              className="block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Deconnexion
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}