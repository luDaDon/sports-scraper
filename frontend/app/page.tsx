'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

type Player = {
  Player: string
  Team: string
  PTS: number
  AST: number
  TRB: number
}

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    fetchStats()
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true)
      const res = await axios.get<Player[]>('https://sports-scraper-tt9m.onrender.com/api/scrape')
      console.log(res.data)
      console.log("Is array?", Array.isArray(res.data))
      console.log("Type of res.data:", typeof res.data)
      let data = res.data

      if (typeof data === 'string') {
        try {
          data = JSON.parse(data) // 🔧 convert string to object/array
        } catch (err) {
            console.error("Invalid JSON string from backend:", err)
            return
        }
      }

      setPlayers(data)
    } catch (err) {
        setError('Failed to fetch player stats')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">🏀 NBA Player Stats</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="mr-2 font-medium text-blue-700">Search Player:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="e.g. Joel, Luka"
          className="border border-blue-400 px-2 py-1 rounded w-64"
        />
      </div>

      {loading ? (
        <p className="text-blue-600">Loading player stats...</p>
      ) : (
        <table className="mt-6 w-full border-collapse border border-blue-400">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="border border-blue-400 px-2 py-1">Player</th>
              <th className="border border-blue-400 px-2 py-1">Team</th>
              <th className="border border-blue-400 px-2 py-1">PTS</th>
              <th className="border border-blue-400 px-2 py-1">AST</th>
              <th className="border border-blue-400 px-2 py-1">REB</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p, index) => (
              <tr key={`${p.Player}-${index}`} className="hover:bg-blue-50">
                <td className="border border-blue-400 px-2 py-1 text-blue-600">{p.Player}</td>
                <td className="border border-blue-400 px-2 py-1 text-blue-600">{p.Team}</td>
                <td className="border border-blue-400 px-2 py-1 text-blue-600">{p.PTS}</td>
                <td className="border border-blue-400 px-2 py-1 text-blue-600">{p.AST}</td>
                <td className="border border-blue-400 px-2 py-1 text-blue-600">{p.TRB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}
