'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSignup() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) return setError(error.message)
    router.push('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '44px', height: '44px', background: '#6366f1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <span style={{ color: 'white', fontSize: '20px', fontWeight: '600' }}>S</span>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#111', margin: '0 0 6px' }}>Create your account</h1>
          <p style={{ fontSize: '14px', color: '#888', margin: 0 }}>Start building your trading playbook</p>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #ebebeb' }}>
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 14px', marginBottom: '20px', fontSize: '13px', color: '#dc2626' }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#444', marginBottom: '6px' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ width: '100%', padding: '11px 14px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#fafafa', color: '#111' }}
              onFocus={e => e.target.style.borderColor = '#6366f1'}
              onBlur={e => e.target.style.borderColor = '#e5e5e5'}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#444', marginBottom: '6px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '11px 14px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '15px', outline: 'none', background: '#fafafa', color: '#111' }}
              onFocus={e => e.target.style.borderColor = '#6366f1'}
              onBlur={e => e.target.style.borderColor = '#e5e5e5'}
              onKeyDown={e => e.key === 'Enter' && handleSignup()}
            />
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            style={{ width: '100%', padding: '12px', background: loading ? '#a5b4fc' : '#6366f1', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#888', marginTop: '20px', marginBottom: 0 }}>
            Already have an account?{' '}
            <a href="/login" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '500' }}>Sign in</a>
          </p>
        </div>

      </div>
    </div>
  )
}