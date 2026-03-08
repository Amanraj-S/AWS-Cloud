import Link from "next/link";

export default function Home() {

  return (

    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">

      <div className="text-center max-w-2xl px-6">

        <h1 className="text-4xl font-bold mb-6">
          AWS MERN Cloud Dashboard
        </h1>

        <p className="text-gray-400 mb-8">
          This project demonstrates a scalable cloud application using
          Next.js, Node.js, MongoDB, and AWS infrastructure including
          EC2, Application Load Balancer, and Auto Scaling.
        </p>

        <Link
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold transition"
        >
          Open Dashboard
        </Link>

      </div>

    </div>

  )

}