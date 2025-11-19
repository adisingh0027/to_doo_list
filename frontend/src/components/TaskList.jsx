import React from 'react'
import TaskItem from './TaskItem'

export default function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  return (
    <ul className="divide-y">
      {tasks.map(t => (
        <li key={t.id} className="py-2">
          <TaskItem task={t} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
        </li>
      ))}
    </ul>
  )
}
