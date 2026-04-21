'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return setError(error.message)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="w-full max-w-sm p-8 rounded-xl bg-zinc-900 flex flex-col gap-4">
        <h1 className="text-xl font-bold text-white">Login</h1>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none"
        />
        <button onClick={handleLogin} className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-medium">
          Login
        </button>
        <p className="text-zinc-400 text-sm text-center">
          Belum punya akun? <a href="/signup" className="text-indigo-400">Signup</a>
        </p>
      </div>
    </div>
  )
}