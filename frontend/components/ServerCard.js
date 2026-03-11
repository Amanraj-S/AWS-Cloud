export default function ServerCard({ data }) {
  // Return early if no data is provided to prevent crashes
  if (!data) return null;

  const formattedTime = new Date(data.time).toLocaleString()

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm hover:border-slate-700 transition-colors duration-200">
      
      {/* Header with Icon */}
      <h2 className="text-lg font-semibold text-slate-100 mb-5 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
        </svg>
        Server Response
      </h2>

      {/* Data Rows */}
      <div className="space-y-3">
        
        {/* Server ID Row */}
        <div className="flex justify-between items-center py-2 border-b border-slate-800/80">
          <span className="text-slate-400 text-sm">Instance ID</span>
          <span className="font-mono text-xs bg-indigo-900/40 text-indigo-300 px-2.5 py-1 rounded-md border border-indigo-800/50">
            {data.server}
          </span>
        </div>

        {/* Message / Status Row */}
        <div className="flex justify-between items-center py-2 border-b border-slate-800/80">
          <span className="text-slate-400 text-sm">Status</span>
          <span className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {data.message}
          </span>
        </div>

        {/* Timestamp Row */}
        <div className="flex justify-between items-center py-2">
          <span className="text-slate-400 text-sm">Timestamp</span>
          <span className="text-slate-300 text-sm font-mono">{formattedTime}</span>
        </div>

      </div>
    </div>
  )
}