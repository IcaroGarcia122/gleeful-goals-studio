import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'

export const Route = createFileRoute('/auth')({
  component: AuthPage,
})

function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      window.location.href = '/admin'
    } catch (error: any) {
      setMessage(error.message || 'Erro ao entrar')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'admin',
          },
        },
      })
      if (error) throw error
      setMessage('Conta criada com sucesso! Você já pode entrar.')
    } catch (error: any) {
      setMessage(error.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-[#DCC9A5]/20"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#24170F] rounded-full flex items-center justify-center mb-4">
            <LogIn className="text-[#C59A55] w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif text-[#24170F]">Área Administrativa</h1>
          <p className="text-sm text-[#24170F]/60 mt-2 text-center">
            Entre com suas credenciais para gerenciar o chalé.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#24170F]/50 mb-1">E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#DCC9A5]/30 focus:border-[#C59A55] focus:ring-1 focus:ring-[#C59A55] outline-none transition-all"
              placeholder="exemplo@email.com"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#24170F]/50 mb-1">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#DCC9A5]/30 focus:border-[#C59A55] focus:ring-1 focus:ring-[#C59A55] outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          
          {message && (
            <p className={`text-xs text-center ${message.includes('sucesso') ? 'text-green-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full bg-[#24170F] text-white py-3 rounded-lg font-bold tracking-widest text-xs hover:bg-[#17130F] transition-all disabled:opacity-50"
            >
              ENTRAR
            </button>
            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full border border-[#24170F] text-[#24170F] py-3 rounded-lg font-bold tracking-widest text-xs hover:bg-[#24170F]/5 transition-all disabled:opacity-50"
            >
              CADASTRAR
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
