import { useEffect, useState } from 'react'

const API = 'http://localhost:3001'

export default function App() {
  const [records, setRecords] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetch(`${API}/records`)
      .then(r => r.json())
      .then(setRecords)
  }, [])

  async function addRecord() {
    if (!name.trim() || !email.trim()) return
    const record = await fetch(`${API}/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    }).then(r => r.json())
    setRecords([record, ...records])
    setName('')
    setEmail('')
  }

  async function deleteRecord(id) {
    await fetch(`${API}/records/${id}`, { method: 'DELETE' })
    setRecords(records.filter(r => r._id !== id))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-2xl">

        <div className="mb-10">
          <h1 className="text-3xl font-bold">Record Keeper</h1>
          <p className="text-gray-600 text-sm mt-1">{records.length} records saved</p>
        </div>

        <div className="flex gap-2 mb-8">
          <input
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25 placeholder:text-gray-600 transition-colors"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25 placeholder:text-gray-600 transition-colors"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addRecord()}
          />
          <button
            onClick={addRecord}
            className="bg-white text-black px-5 py-3 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors shrink-0"
          >
            Add
          </button>
        </div>

        {records.length > 0 && (
          <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 px-5 py-3 border-b border-white/8">
              <span className="text-xs uppercase tracking-widest text-gray-500">Name</span>
              <span className="text-xs uppercase tracking-widest text-gray-500">Email</span>
              <span></span>
            </div>
            {records.map(r => (
              <div key={r._id} className="grid grid-cols-3 px-5 py-4 border-b border-white/5 last:border-0 group hover:bg-white/2 transition-colors">
                <span className="text-sm text-gray-200">{r.name}</span>
                <span className="text-sm text-gray-400">{r.email}</span>
                <div className="flex justify-end">
                  <button
                    onClick={() => deleteRecord(r._id)}
                    className="text-transparent group-hover:text-gray-600 hover:!text-red-400 text-sm transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {records.length === 0 && (
          <p className="text-center text-gray-700 py-10 text-sm">No records yet.</p>
        )}

      </div>
    </div>
  )
}
