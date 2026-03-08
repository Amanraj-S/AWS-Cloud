export default function ServerCard({ data }) {

  const formattedTime = new Date(data.time).toLocaleString()

  return (

    <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg">

      <h2 className="text-xl font-bold mb-4 text-white">
        Server Response
      </h2>

      <div className="space-y-2 text-gray-300">

        <p>
          <span className="font-semibold text-white">Server:</span> {data.server}
        </p>

        <p>
          <span className="font-semibold text-white">Message:</span> {data.message}
        </p>

        <p>
          <span className="font-semibold text-white">Time:</span> {formattedTime}
        </p>

      </div>

    </div>

  )

}