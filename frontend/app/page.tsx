import Link from "next/link";

export default function Home() {
  return (
    // Updated: Changed min-h-screen to min-h-[calc(100vh-80px)] to account for the Navbar height
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center relative overflow-hidden">
      
      {/* Subtle Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="text-center max-w-3xl px-6 relative z-10 flex flex-col items-center">
        
        {/* Project Status Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800/50 text-blue-300 text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Live Infrastructure
        </div>

        {/* Upgraded Gradient Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 tracking-tight mb-6 pb-2">
          AWS MERN Cloud Dashboard
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl">
          This project demonstrates a highly available, scalable cloud application using 
          Next.js, Node.js, MongoDB, and enterprise-grade AWS infrastructure.
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['Next.js', 'Node.js', 'MongoDB', 'AWS EC2', 'Application Load Balancer', 'Auto Scaling'].map((tech) => (
            <span key={tech} className="px-4 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-sm font-medium shadow-sm cursor-default">
              {tech}
            </span>
          ))}
        </div>

        {/* Call to Action Button */}
        <Link
          href="/dashboard"
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-200 shadow-xl shadow-blue-900/20 bg-blue-600 hover:bg-blue-500 text-white hover:-translate-y-1"
        >
          Open Dashboard
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </Link>

      </div>
    </div>
  )
}