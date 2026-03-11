"use client"

import { useState } from "react"
import { getServer } from "../../services/api" // Ensure this path matches your project structure
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [history, setHistory] = useState([])
  const [serverStats, setServerStats] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [progress, setProgress] = useState(0)

  // Professional color palette for the charts
  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899']

  // Core fetch function (accepts a flag to prevent rapid UI flickering during bulk requests)
  const fetchSingleRequest = async (isBulk = false) => {
    if (!isBulk) setIsLoading(true)
    try {
      const res = await getServer()
      const server = res.data.server

      setData(res.data)

      setHistory(prev => [
        { server, time: new Date().toLocaleTimeString() },
        ...prev
      ])

      setServerStats(prev => ({
        ...prev,
        [server]: (prev[server] || 0) + 1
      }))
    } catch (error) {
      console.error("Failed to fetch server data", error)
    } finally {
      if (!isBulk) setIsLoading(false)
    }
  }

  // Bulk simulation logic
  const simulateTraffic = async () => {
    setIsSimulating(true)
    setProgress(0)
    const totalRequests = 50
    
    for (let i = 0; i < totalRequests; i++) {
      await fetchSingleRequest(true)
      setProgress(Math.round(((i + 1) / totalRequests) * 100))
      // Tiny delay to make the animation feel natural and allow React to render
      await new Promise(resolve => setTimeout(resolve, 50)) 
    }
    
    setIsSimulating(false)
    setProgress(0)
  }

  const clearData = () => {
    setData(null)
    setHistory([])
    setServerStats({})
  }

  // Prepare chart data
  const chartData = Object.keys(serverStats).map(server => ({
    server,
    requests: serverStats[server]
  }))

  const totalRequestsCount = history.length

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 tracking-tight mb-2">
              AWS Traffic Monitor
            </h1>
            <p className="text-slate-400">
              Real-time visualization of ALB traffic distribution and EC2 health.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
            <button
              onClick={() => fetchSingleRequest(false)}
              disabled={isLoading || isSimulating}
              className="px-5 py-2.5 rounded-lg font-medium transition-all duration-200 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 disabled:opacity-50"
            >
              +1 Request
            </button>
            <button
              onClick={simulateTraffic}
              disabled={isLoading || isSimulating}
              className="px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-blue-900/20 bg-blue-600 hover:bg-blue-500 text-white disabled:bg-blue-800 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSimulating ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Simulating...
                </>
              ) : (
                "Simulate 50 Requests"
              )}
            </button>
            {totalRequestsCount > 0 && (
              <button
                onClick={clearData}
                disabled={isSimulating}
                className="px-5 py-2.5 rounded-lg font-medium transition-all duration-200 bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-900/50 disabled:opacity-50"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar for Bulk Simulation */}
        {isSimulating && (
          <div className="w-full bg-slate-800 rounded-full h-1.5 mb-8 overflow-hidden">
            <div 
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Empty State / Welcome */}
        {!data && !isSimulating && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-16 text-center text-slate-500 mt-10 shadow-sm flex flex-col items-center">
            <svg className="w-16 h-16 text-slate-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            <h3 className="text-xl font-medium text-slate-300 mb-2">No Traffic Recorded</h3>
            <p className="max-w-md">Click "Simulate 50 Requests" to watch your Application Load Balancer distribute traffic across your EC2 instances.</p>
          </div>
        )}

        {/* Dashboard Content */}
        {(data || isSimulating) && totalRequestsCount > 0 && (
          <div className="space-y-6">
            
            {/* Top Row: Server Info & Active Servers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Total Traffic Card */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center">
                <span className="text-slate-400 text-sm font-medium mb-1">Total Requests Handled</span>
                <span className="text-5xl font-bold text-slate-100">{totalRequestsCount}</span>
              </div>

              {/* Latest Response Card */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
                <h2 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Latest Ping</h2>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Server ID</span>
                    <span className="font-mono text-xs bg-indigo-900/40 text-indigo-300 px-2.5 py-1 rounded-md border border-indigo-800/50">
                      {data?.server || 'Routing...'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-slate-300">Status</span>
                    <span className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      200 OK
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Servers Card */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
                <h2 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Active Instances</h2>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(serverStats).map((server, index) => (
                    <div key={server} className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-md">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="font-mono text-xs text-slate-300" style={{ color: COLORS[index % COLORS.length] }}>
                        {server.split('-')[0]}...{server.slice(-4)} {/* Shorten long IDs */}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Row: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Bar Chart */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
                <h2 className="text-lg font-semibold text-slate-100 mb-6">Traffic Volume by Server</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="server" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dy={10} tickFormatter={(val) => val.slice(-6)} />
                      <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip 
                        cursor={{ fill: '#1e293b' }}
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f1f5f9' }}
                      />
                      <Bar dataKey="requests" radius={[4, 4, 0, 0]} barSize={40}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
                <h2 className="text-lg font-semibold text-slate-100 mb-2">Load Distribution</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="requests"
                        stroke="none"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f1f5f9' }}
                        itemStyle={{ color: '#e2e8f0' }}
                        formatter={(value, name, props) => [`${value} requests`, props.payload.server]}
                      />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" formatter={(value) => <span className="text-slate-400 text-xs font-mono">{value.slice(-6)}</span>} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Bottom Row: Request History */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
              <h2 className="text-lg font-semibold text-slate-100 mb-4">Request Log</h2>
              <div className="overflow-y-auto max-h-[200px] pr-2 custom-scrollbar space-y-2">
                {history.map((h, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-3 rounded-lg bg-slate-800/40 border border-slate-800/80 hover:bg-slate-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-600 font-mono text-xs w-8">#{totalRequestsCount - i}</span>
                      <span className="text-slate-300">Routed to instance</span>
                      <span className="text-indigo-400 font-mono text-xs bg-indigo-900/20 px-2 py-0.5 rounded">{h.server}</span>
                    </div>
                    <span className="text-slate-500 text-xs font-mono">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}