import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('')
  return (
    <div className="mb-4">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') onSearch(q) }}
        placeholder="Search for a task"
        className="w-full p-2 border rounded"
      />
      <div className="mt-2 flex gap-2">
        <button onClick={() => onSearch(q)} className="px-3 py-1 bg-gray-200 rounded">Search</button>
        <button onClick={() => { setQ(''); onSearch('') }} className="px-3 py-1 bg-gray-100 rounded">Clear</button>
      </div>
    </div>
  )
}
