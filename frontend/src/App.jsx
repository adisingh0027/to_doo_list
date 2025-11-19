import React, { useEffect, useState } from 'react'
import WeekCard from './components/WeekCard'
import TaskForm from './components/TaskForm'
import SearchBar from './components/SearchBar'
import Onboarding from './components/Onboarding'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

function App() {
  const [tasks, setTasks] = useState([])
  const [serverError, setServerError] = useState(null)
  const [query, setQuery] = useState('')
  // Show onboarding first by default
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editTask, setEditTask] = useState(null)

  useEffect(() => {
    // Fetch tasks only after onboarding is dismissed
    if (!showOnboarding) fetchTasks()
  }, [showOnboarding])

  useEffect(() => {
    if (!showOnboarding) return
    // nothing else
  }, [showOnboarding])

  function handleStart() {
    setShowOnboarding(false)
  }

  function showOnboardingAgain() {
    setShowOnboarding(true)
  }

  async function fetchTasks(q) {
    const url = q ? `${API}/tasks?q=${encodeURIComponent(q)}` : `${API}/tasks`
    try {
      const res = await fetch(url)
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }))
        console.error('Fetch failed', err)
        setServerError(err.message || res.statusText)
        setTasks([])
        return
      }
      const data = await res.json()
      setTasks(data)
      setServerError(null)
    } catch (err) {
      console.error('Fetch tasks error', err)
      setServerError('Unable to connect to backend: ' + (err.message || 'Network error'))
      setTasks([])
    }
  }

  function handleSearch(q) {
    setQuery(q)
    fetchTasks(q)
  }

  function openForm(task = null) {
    setEditTask(task)
    setShowForm(true)
  }

  function closeForm() {
    setEditTask(null)
    setShowForm(false)
  }

  async function saveTask(task) {
    try {
      console.log('Saving task', task)
      let res
      if (task.id) {
        res = await fetch(`${API}/tasks/${task.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        })
      } else {
        res = await fetch(`${API}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        })
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }))
        console.error('Save failed', err)
        alert('Failed to save task: ' + (err.message || res.statusText))
        return
      }
      closeForm()
      await fetchTasks(query)
    } catch (err) {
      console.error('Save error', err)
      alert('Error saving task: ' + err.message)
    }
  }

  async function deleteTask(id) {
    try {
      const res = await fetch(`${API}/tasks/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }))
        alert('Failed to delete: ' + (err.message || res.statusText))
        return
      }
      await fetchTasks(query)
    } catch (err) {
      console.error('Delete error', err)
      alert('Error deleting task: ' + err.message)
    }
  }

  async function toggleStatus(task) {
    try {
      const next = task.status === 'completed' ? 'open' : 'completed'
      const res = await fetch(`${API}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }))
        alert('Failed to update status: ' + (err.message || res.statusText))
        return
      }
      await fetchTasks(query)
    } catch (err) {
      console.error('Toggle error', err)
      alert('Error updating task: ' + err.message)
    }
  }

  const total = tasks.length
  const completed = tasks.filter(t => t.status === 'completed').length
  const progress = total === 0 ? 0 : Math.round((completed/total)*100)

  if (showOnboarding) return <Onboarding onStart={handleStart} />

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pb-24">
      <div className="w-full max-w-md">
        <div className="hero-card">
          <div className="hero-top" />
          <div className="hero-body">
            <h2 className="text-lg font-semibold text-gray-900">Manage What To Do</h2>
            <p className="text-sm text-gray-500">The best way to manage what you have to do, don't forget your plans</p>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Weekly Progress</div>
                  <div className="mt-2 week-progress"><div className="bar" style={{width: `${progress}%`}} /></div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Completed</div>
                  <div className="font-semibold">{completed}/{total}</div>
                </div>
              </div>
              <div className="summary-row">
                <div className="summary-card pending">
                  <div>
                    <div className="label">Task Pending</div>
                    <div className="value">{Math.max(0, total - completed)}</div>
                  </div>
                  <div className="text-sm text-red-500">⚠</div>
                </div>
                <div className="summary-card complete">
                  <div>
                    <div className="label">Task Complete</div>
                    <div className="value">{completed}</div>
                  </div>
                  <div className="text-sm text-green-500">✓</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <button onClick={showOnboardingAgain} className="text-sm text-blue-600">Show Get Started</button>
        </div>

        {serverError && (
          <div className="mb-3 p-3 rounded bg-red-50 border border-red-200 text-red-700">
            <div className="flex items-center justify-between">
              <div>{serverError}</div>
              <div>
                <button onClick={() => fetchTasks(query)} className="px-2 py-1 bg-red-600 text-white rounded text-sm">Retry</button>
              </div>
            </div>
          </div>
        )}

        <SearchBar onSearch={handleSearch} />

        <WeekCard tasks={tasks} onEdit={openForm} onDelete={deleteTask} onToggle={toggleStatus} />
      </div>

      <button aria-label="Add Task" title="Add Task" className="floating-add" onClick={() => openForm()}>
        +
      </button>

      {showForm && <TaskForm task={editTask} onClose={closeForm} onSave={saveTask} />}
    </div>
  )
}

export default App
