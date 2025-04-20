"use client"

import { useState, useEffect } from "react"
import QRCode from "react-qr-code"
import { useAuth0 } from "@auth0/auth0-react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Skeleton } from "../components/ui/skeleton"
import { Clock, ShoppingBag } from "lucide-react"

// Define types for our data
interface Item {
  name: string
  imageUrl: string
  // other properties...
}

interface HistoryItem {
  item: Item
  num: number
  time: string
}

const HistoryPage = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showQRCode, setShowQRCode] = useState(false)
  const [token, setToken] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const accessToken = await getAccessTokenSilently()
        setToken(accessToken)

        const response = await fetch("/api/itemHistory/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch history data")
        }

        const result = await response.json()
        setHistory(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [getAccessTokenSilently])

  const toggleQRCode = () => {
    setShowQRCode(!showQRCode)
  }

  const formatDate = (dateString: string) => {
    try {
        const date = new Date(dateString)
        return date.toLocaleString()
    } catch (e) {
        console.error("Error parsing date:", e)
        return dateString;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Your History</h1>
        <Button onClick={toggleQRCode} className="mb-4 md:mb-0">
          {showQRCode ? "Hide QR Code" : "Show QR Code"}
        </Button>
      </div>

      {showQRCode && token && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex justify-center" id="Container">
          <QRCode value={token} />
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">Error: {error}</div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : history.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-48 w-full">
                  <img
                    src={item.item.imageUrl || "/placeholder.svg"}
                    alt={item.item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.item.name}</h3>
                  <div className="flex items-center text-gray-500 mb-1">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    <span>Quantity: {item.num}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{formatDate(item.time)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No history found</h3>
          <p className="text-gray-500">You haven't made any purchases yet.</p>
        </div>
      )}
    </div>
  )
}

export default HistoryPage;
