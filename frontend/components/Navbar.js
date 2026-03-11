"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  // We use this to determine which page is active
  const pathname = usePathname()

  return (
    <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo / Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg shadow-md shadow-blue-900/20 group-hover:shadow-blue-900/40 transition-all duration-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
            </svg>
          </div>
          <span className="text-xl font-bold text-slate-100 tracking-tight group-hover:text-white transition-colors">
            AWS Cloud Dashboard
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 text-sm font-medium">
          <Link
            href="/"
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              pathname === '/' 
                ? 'bg-slate-800/80 text-blue-400 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              pathname === '/dashboard' 
                ? 'bg-slate-800/80 text-blue-400 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Dashboard
          </Link>
        </div>

      </div>
    </nav>
  )
}