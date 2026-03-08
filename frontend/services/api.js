import axios from "axios"

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

export const getServer = async () => {
  try {

    const response = await API.get("/api")

    return response

  } catch (error) {

    console.error("API Error:", error)

    throw error

  }
}