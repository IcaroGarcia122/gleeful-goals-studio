import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Circle, Plus, Trash2, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

export const Route = createFileRoute('/admin/tasks')({
  component: TasksManagement,
})

function TasksManagement() {
  const queryClient = useQueryClient()
  const [newTask, setNewTask] = useState('')

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['admin-tasks'],
    queryFn: async () => {
      const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return data
    }
  })

  const addTaskMutation = useMutation({
    mutationFn: async (title: string) => {
      const { error } = await supabase.from('tasks').insert([{ title, completed: false }])
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tasks'] })
      setNewTask('')
      toast.success('Tarefa adicionada!')
    }
  })

  const toggleTaskMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string, completed: boolean }) => {
      const { error } = await supabase.from('tasks').update({ completed }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-tasks'] })
  })

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('tasks').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tasks'] })
      toast.success('Tarefa removida.')
    }
  })

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return
    addTaskMutation.mutate(newTask)
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
          <Button type="submit" disabled={addTaskMutation.isPending} className="bg-[#24170F] text-white hover:bg-[#17130F]">
            {addTaskMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />} 
            Adicionar
          </Button>
        </form>

        <div className="space-y-3">
          {isLoading ? <Loader2 className="animate-spin text-gold mx-auto" /> : 
           tasks?.length === 0 ? <p className="text-center italic text-muted-foreground py-8">Nenhuma tarefa pendente.</p> :
           tasks?.map((task) => (
            <div 
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                task.completed ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-[#F7F3EA]/30 border-[#DCC9A5]/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <button onClick={() => toggleTaskMutation.mutate({ id: task.id, completed: !task.completed })}>
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
              <Button variant="ghost" size="icon" onClick={() => deleteTaskMutation.mutate(task.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
