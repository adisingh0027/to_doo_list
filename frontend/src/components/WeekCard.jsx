import React from 'react'
import { format, startOfWeek, addDays } from 'date-fns'
import TaskList from './TaskList'

function groupByWeek(tasks) {
  const groups = {}
  tasks.forEach(t => {
    const dt = t.datetime ? new Date(t.datetime) : new Date()
    const monday = startOfWeek(dt, { weekStartsOn: 1 })
    const key = monday.toISOString().slice(0,10)
    if (!groups[key]) groups[key] = []
    groups[key].push(t)
  })
  return groups
}

export default function WeekCard({ tasks, onEdit, onDelete, onToggle }) {
  const groups = groupByWeek(tasks)
  const keys = Object.keys(groups).sort().reverse()

  if (keys.length === 0) return <div className="p-4 bg-white rounded shadow">No tasks yet</div>

  return (
    <div className="space-y-4">
      {keys.map(key => {
        const weekTasks = groups[key]
        const completed = weekTasks.filter(t => t.status === 'completed').length
        const open = weekTasks.length - completed
        const monday = new Date(key)
        const sunday = addDays(monday, 6)
        const percent = weekTasks.length === 0 ? 0 : Math.round((completed / weekTasks.length) * 100)
        return (
          <div key={key} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-500">{format(monday, 'MMM d')} - {format(sunday, 'MMM d')}</div>
                <div className="text-lg font-medium">Week</div>
              </div>
              <div className="w-36 text-right">
                <div className="text-sm text-gray-500">Open</div>
                <div className="font-semibold">{open}</div>
                <div className="text-sm text-gray-500 mt-2">Completed</div>
                <div className="font-semibold">{completed}</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-3 week-progress"><div className="bar" style={{width:`${percent}%`}} /></div>
              <TaskList tasks={weekTasks} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
