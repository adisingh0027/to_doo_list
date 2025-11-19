import React from 'react'
import { format } from 'date-fns'

export default function TaskItem({ task, onEdit, onDelete, onToggle }) {
  const dateStr = task.datetime ? format(new Date(task.datetime), 'MMM d, p') : ''
  const priorityColor = task.priority === 'High' ? '#ef4444' : task.priority === 'Medium' ? '#f59e0b' : '#34d399'
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-3">
        <button onClick={() => onToggle(task)} className={`w-5 h-5 rounded-sm flex items-center justify-center border ${task.status === 'completed' ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
          {task.status === 'completed' ? '✓' : ''}
        </button>
        <div>
          <div className={`${task.status === 'completed' ? 'line-through text-gray-400' : ''} font-medium`}>{task.title}</div>
          <div className="text-xs text-gray-500">{dateStr} • <span style={{display:'inline-block', verticalAlign:'middle'}}><span className="task-priority" style={{background:priorityColor}}/></span> {task.priority}</div>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => onEdit(task)} className="text-sm text-blue-600">Edit</button>
        <button onClick={() => onDelete(task.id)} className="text-sm text-red-500">Delete</button>
      </div>
    </div>
  )
}
