"use client"

import { useState } from "react"
import { getServer } from "../../services/api"

import Navbar from "../../components/Navbar"
import ServerCard from "../../components/ServerCard"
import StatsCard from "../../components/StatsCard"

export default function Dashboard() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {

    try {

      setLoading(true)
      setError(null)

      const res = await getServer()

      setData(res.data)

    } catch (err) {

      console.error(err)
      setError("Failed to fetch server response")

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="min-h-screen bg-gray-900 text-white">

      <Navbar />

      <div className="p-10 flex flex-col items-start gap-6">

        <button
          onClick={fetchData}
          className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-lg font-semibold"
        >
          Send Request
        </button>

        {loading && (
          <p className="text-yellow-400">Fetching server response...</p>
        )}

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {data && (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

            <ServerCard data={data} />

            <StatsCard total={data.totalRequests} />

          </div>

        )}

      </div>

    </div>
  )
}