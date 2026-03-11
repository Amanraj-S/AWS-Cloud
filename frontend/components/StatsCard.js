export default function StatsCard({ total }) {
  // Fallback to 0 if total is undefined/null
  const displayTotal = total || 0;

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm hover:border-slate-700 transition-colors duration-200 flex flex-col justify-between">
      
      {/* Header Row with Icon */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
          Total Traffic
        </h2>
        <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
          </svg>
        </div>
      </div>

      {/* Data Row */}
      <div className="flex items-baseline gap-3">
        <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
          {displayTotal}
        </p>
        <span className="text-sm font-medium text-slate-500">
          Requests Handled
        </span>
      </div>

    </div>
  )
}