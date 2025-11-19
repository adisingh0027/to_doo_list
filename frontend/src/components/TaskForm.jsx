import React, { useState, useEffect } from 'react'

export default function TaskForm({ task, onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [datetime, setDatetime] = useState('')
  const [priority, setPriority] = useState('Low')

  useEffect(() => {
    if (task) {
      setTitle(task.title || '')
      setDescription(task.description || '')
      setDatetime(task.datetime ? task.datetime.slice(0,16) : '')
      setPriority(task.priority || 'Low')
    }
  }, [task])

  function submit(e) {
    e.preventDefault()
    if (!title || !datetime) return alert('Title and Date & Time required')
    const payload = {
      id: task?.id,
      title,
      description,
      datetime: new Date(datetime).toISOString(),
      priority,
    }
    onSave(payload)
  }

  return (
    <div className="fixed inset-0 bg-black/30">
      <div className="sheet">
        <div className="form-inner">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">{task ? 'Edit Task' : 'Add New Task'}</h3>
            <button type="button" onClick={onClose} className="text-gray-600">✕</button>
          </div>

          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="block text-sm">Title</label>
              <input className="w-full p-2 border rounded" value={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm">Date & Time</label>
              <input type="datetime-local" className="w-full p-2 border rounded" value={datetime} onChange={e => setDatetime(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm">Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} className="w-full p-2 border rounded">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm">Description</label>
              <textarea className="w-full p-2 border rounded" value={description} onChange={e => setDescription(e.target.value)} />
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
              <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
