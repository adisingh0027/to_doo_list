import React from 'react'

export default function Onboarding({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="h-64" style={{background:'#4b6cff'}}>
          {/* decorative shapes could go here */}
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">Manage What To Do</h2>
          <p className="text-sm text-gray-500 mb-6">The best way to manage what you have to do, don't forget your plans</p>
          <button onClick={onStart} className="w-full py-3 bg-blue-600 text-white rounded">Get Started</button>
        </div>
      </div>
    </div>
  )
}
