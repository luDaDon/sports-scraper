'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

type Player = {
  Player: string
  Team: string
  PTS: number
  AST: number
  TRB: number
  [key: string]: any
}

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await axios.get<Player[]>('http://localhost:5000/api/scrape')

      console.log("res.data:", res.data)
      console.log("typeof:", typeof res.data)
      console.log("isArray?", Array.isArray(res.data))

      let data = res.data;

      if (typeof data === 'string') {
        try {
          data = JSON.parse(data); // 👈 convert string to array
        } catch (e) {
          console.error("Invalid JSON string from backend");
          return;
        }
      }

      setPlayers(res.data)
    } catch (err) {
      console.error("Fetch error:", err)
      setError("Failed to fetch stats")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log("players state updated:", players)
    console.log("isArray(players)?", Array.isArray(players))
  }, [players])

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">🏀 NBA Stats Scraper</h1>

      <button
        onClick={fetchStats}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Scrape Stats
      </button>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      <table className="mt-6 w-full border-collapse border border-gray-400">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Player</th>
            <th className="border px-2 py-1">Team</th>
            <th className="border px-2 py-1">PTS</th>
            <th className="border px-2 py-1">AST</th>
            <th className="border px-2 py-1">REB</th>
          </tr>
        </thead>
        <tbody>
          {players.length > 0 ? (
            players.map((p, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{p.Player}</td>
                <td className="border px-2 py-1">{p.Team}</td>
                <td className="border px-2 py-1">{p.PTS}</td>
                <td className="border px-2 py-1">{p.AST}</td>
                <td className="border px-2 py-1">{p.TRB}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No data loaded yet. Click "Scrape Stats" to begin.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  )
}
