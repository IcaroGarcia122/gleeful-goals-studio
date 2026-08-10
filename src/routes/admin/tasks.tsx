import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/admin/tasks')({
  component: TasksManagement,
})

interface Task {
  id: string
  title: string
  completed: boolean
}

function TasksManagement() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Limpeza geral do chalé', completed: false },
    { id: '2', title: 'Troca de roupas de cama', completed: true },
    { id: '3', title: 'Conferir frigobar', completed: false },
    { id: '4', title: 'Manutenção do deck', completed: false },
  ])
  const [newTask, setNewTask] = useState('')

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return
    setTasks([...tasks, { id: Math.random().toString(), title: newTask, completed: false }])
    setNewTask('')
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-serif text-[#24170F]">Organização</h2>
        <p className="text-muted-foreground font-sans">Gerencie as tarefas de manutenção e operação</p>
      </div>

      <Card className="p-6 border-none shadow-sm bg-white">
        <form onSubmit={addTask} className="flex gap-4 mb-8">
          <Input 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Nova tarefa..."
            className="flex-1"
          />
          <Button type="submit" className="bg-[#24170F] text-white hover:bg-[#17130F]">
            <Plus className="w-4 h-4 mr-2" /> Adicionar
          </Button>
        </form>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                task.completed ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-[#F7F3EA]/30 border-[#DCC9A5]/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <button onClick={() => toggleTask(task.id)}>
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-[#C59A55]" />
                  )}
                </button>
                <span className={`font-sans ${task.completed ? 'line-through text-gray-400' : 'text-[#24170F]'}`}>
                  {task.title}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}