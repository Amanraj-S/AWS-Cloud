import axios from "axios"

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

export const getServer = async () => {
  try {
    // ?t=${Date.now()} tricks the browser into thinking every loop is a totally different website page
    const response = await API.get(`/api?t=${Date.now()}`, {
      headers: {
        "Connection": "close",
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache"
      }
    })

    return response

  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}