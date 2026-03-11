"use client"

import { useState } from "react"
import { getServer } from "../../services/api"
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

  const COLORS = ['#3b82f6','#10b981','#8b5cf6','#f59e0b','#ef4444','#ec4899']

  // Helper function to format the server IP for UI display
  const formatIP = (serverString) => {
    if (!serverString) return '';
    return serverString.split('.')[0].replace('ip-', '');
  }

  // -----------------------------
  // Single Request
  // -----------------------------
  const fetchSingleRequest = async () => {
    setIsLoading(true)

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
      console.error("Request failed", error)
    }

    setIsLoading(false)
  }

  // -----------------------------
  // Parallel Traffic Simulation (Animated)
  // -----------------------------
  const simulateTraffic = async () => {
    setIsSimulating(true)
    setProgress(0)

    const totalRequests = 50

    try {
      // 1. FETCH IN PARALLEL: Forces multiple connections so ALB balances the load
      const requests = []
      for (let i = 0; i < totalRequests; i++) {
        requests.push(
          getServer({
            params: {
              rand: Math.random() // avoids connection reuse
            }
          })
        )
      }

      const responses = await Promise.all(requests)

      // 2. ANIMATE SEQUENTIALLY: Loop through responses with a delay
      for (let i = 0; i < responses.length; i++) {
        const server = responses[i].data.server

        setData(responses[i].data)

        setHistory(prev => [
          { server, time: new Date().toLocaleTimeString() },
          ...prev
        ])

        setServerStats(prev => ({
          ...prev,
          [server]: (prev[server] || 0) + 1
        }))

        setProgress(Math.round(((i + 1) / totalRequests) * 100))

        // 100ms delay to animate the UI updates
        await new Promise(resolve => setTimeout(resolve, 100))
      }

    } catch (error) {
      console.error("Simulation failed", error)
    }

    setIsSimulating(false)
    setProgress(0)
  }

  // -----------------------------
  // Reset Dashboard
  // -----------------------------
  const clearData = () => {
    setData(null)
    setHistory([])
    setServerStats({})
  }

  const chartData = Object.keys(serverStats).map(server => ({
    server,
    requests: serverStats[server]
  }))

  const totalRequestsCount = history.length

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-400 mb-2">
              AWS Traffic Monitor
            </h1>
            <p className="text-slate-400">
              Real-time visualization of ALB traffic distribution and EC2 health.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex gap-3">
            <button
              onClick={fetchSingleRequest}
              disabled={isLoading || isSimulating}
              className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700"
            >
              +1 Request
            </button>

            <button
              onClick={simulateTraffic}
              disabled={isSimulating}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
            >
              {isSimulating ? "Simulating..." : "Simulate 50 Requests"}
            </button>

            <button
              onClick={clearData}
              className="px-5 py-2 rounded-lg bg-red-900/40 text-red-400 border border-red-900"
            >
              Reset
            </button>
          </div>
        </div>

        {/* PROGRESS BAR */}
        {isSimulating && (
          <div className="w-full bg-slate-800 rounded-full h-2 mb-6">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* TOP INFO CARDS */}
        {totalRequestsCount > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center">
              <p className="text-slate-400">Total Requests</p>
              <p className="text-4xl font-bold">{totalRequestsCount}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <p className="text-slate-400 mb-2">Latest Server</p>
              <p className="font-mono text-indigo-400 text-sm">
                {data?.server}
              </p>
              <p className="text-green-400 text-sm mt-2">200 OK</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <p className="text-slate-400 mb-3">Active Instances</p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(serverStats).map((server,i)=>(
                  <span
                    key={server}
                    className="text-xs font-mono px-2 py-1 rounded"
                    style={{color:COLORS[i%COLORS.length]}}
                  >
                    {formatIP(server)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CHARTS */}
        {totalRequestsCount > 0 && (
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h2 className="mb-4">Traffic Volume by Server</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
                  {/* Applied the formatIP helper function here */}
                  <XAxis dataKey="server" tickFormatter={formatIP}/>
                  <YAxis allowDecimals={false}/>
                  <Tooltip labelFormatter={formatIP}/>
                  <Bar dataKey="requests">
                    {chartData.map((entry,index)=>(
                      <Cell key={index} fill={COLORS[index%COLORS.length]}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h2 className="mb-4">Load Distribution</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="requests"
                    nameKey="server"
                    innerRadius={60}
                    outerRadius={90}
                  >
                    {chartData.map((entry,index)=>(
                      <Cell key={index} fill={COLORS[index%COLORS.length]}/>
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value, formatIP(name)]} />
                  <Legend formatter={formatIP}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* REQUEST LOG */}
        {history.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h2 className="mb-4">Request Log</h2>
            <div className="max-h-52 overflow-y-auto space-y-2">
              {history.map((h,i)=>(
                <div key={i} className="flex justify-between text-sm bg-slate-800 p-2 rounded">
                  <span>
                    Routed to <span className="text-indigo-400 font-mono">{h.server}</span>
                  </span>
                  <span className="text-slate-400">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}