"use client"

import Link from "next/link"

export default function Navbar() {

  return (

    <nav className="bg-gray-950 border-b border-gray-800">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo / Title */}
        <Link
          href="/"
          className="text-xl font-bold text-white"
        >
          AWS Cloud Dashboard
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-gray-300">

          <Link
            href="/"
            className="hover:text-white transition"
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className="hover:text-white transition"
          >
            Dashboard
          </Link>

        </div>

      </div>

    </nav>

  )

}