export default function StatsCard({ total }) {

  return (

    <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg">

      <h2 className="text-lg font-semibold text-gray-300 mb-2">
        Total Requests
      </h2>

      <div className="flex items-center justify-between">

        <p className="text-4xl font-bold text-white">
          {total}
        </p>

        <span className="text-sm text-gray-400">
          Requests
        </span>

      </div>

    </div>

  )

}